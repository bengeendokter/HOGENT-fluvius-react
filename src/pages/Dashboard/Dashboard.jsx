import {useContext, useEffect, useState} from 'react';
import AccordionCategory from '../../components/AccordionCategory';
import {useSession} from "../../contexts/AuthProvider";
import {useCategories} from "../../contexts/CategorieProvider";
import {DoelstellingContext} from '../../contexts/DoelstellingProvider';
import {SdgContext} from '../../contexts/SdgProvider';
import {TemplateContext} from '../../contexts/TemplatesProvider';
import styles from './Dashboard.module.css';

export default function Dashboard()
{
  const {error, categories} = useCategories();
  const {getSdgsVoorCategories, categoriesMetSdgs, setCategories: setCategoriesSdgs} = useContext(SdgContext);
  const {getDoelstellingenVoorCategories, setCategories: setCategoriesDoelstellingen, categoriesMetDoelstellingen} = useContext(DoelstellingContext);
  const {roles} = useSession();
  const {getAllTemplatesByRol, setRolNaam, templatesRol, getTemplatesMetCategorie, templatesMetCategorie} = useContext(TemplateContext);
  const [nieuwe, setNieuwe] = useState([]);

  useEffect(() =>
  {
    async function fetchData()
    {
      setRolNaam(roles);
      await getAllTemplatesByRol();
    }
    fetchData();
  }, [setRolNaam, roles, getAllTemplatesByRol]);


  useEffect(() =>
  {
    if(templatesRol.length !== 0)
    {
      getTemplatesMetCategorie(templatesRol);
    }
  }
    , [templatesRol, getTemplatesMetCategorie]);

  useEffect(() =>
  {
    setCategoriesSdgs(categories);
    getSdgsVoorCategories();
  }, [categories, setCategoriesSdgs, getSdgsVoorCategories]);

  useEffect(() =>
  {
    setCategoriesDoelstellingen(categoriesMetSdgs);
    getDoelstellingenVoorCategories();
  }, [categoriesMetSdgs, setCategoriesDoelstellingen, getDoelstellingenVoorCategories]);

  useEffect(() =>
  {
    if(categoriesMetDoelstellingen.length !== 0)
    {
      const templatesMetCategorieVisiblesSorted = templatesMetCategorie.filter(el => el.is_visible === 1).sort(({order: f1}, {order: f2}) =>
      {
        return f1 < f2 ? -1 : f1 > f2 ? 1 : 0;
      });
      const newar = [];
      for(let m = 0; m < categoriesMetDoelstellingen.length; m++)
      {
        for(let k = 0; k < templatesMetCategorieVisiblesSorted.length; k++)
        {
          if(templatesMetCategorieVisiblesSorted[k].category_id === categoriesMetDoelstellingen[m].naam)
          {
            newar.push({id: categoriesMetDoelstellingen[m].id, naam: categoriesMetDoelstellingen[m].naam, sdgs: categoriesMetDoelstellingen[m].sdgs, doelstellingen: categoriesMetDoelstellingen[m].doelstellingen, order: templatesMetCategorieVisiblesSorted[k].order});
          }
        }
      }
      setNieuwe(newar.sort(({order: f1}, {order: f2}) =>
      {
        return f1 < f2 ? -1 : f1 > f2 ? 1 : 0;
      }));
    }
  }, [categoriesMetDoelstellingen, templatesMetCategorie]);


  return (
    <>
      <h2>{error && <pre className="text-red-600">{error.message}</pre>}</h2>
      <div className={styles.categorie_container}>
        {nieuwe.map((c) => <AccordionCategory key={c.id} {...c}></AccordionCategory>)}
      </div>
    </>
  );
};
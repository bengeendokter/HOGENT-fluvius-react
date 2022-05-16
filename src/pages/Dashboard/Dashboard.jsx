import styles from './Dashboard.module.css';
import AccordionCategory from '../../components/AccordionCategory';
import {useCategories} from "../../contexts/CategorieProvider";
import {useSession} from "../../contexts/AuthProvider";
import
  {
  useContext, useEffect, useState
  } from 'react';
import {SdgContext} from '../../contexts/SdgProvider';
import {DoelstellingContext} from '../../contexts/DoelstellingProvider';
import {TemplateContext} from '../../contexts/TemplatesProvider';

export default function Dashboard()
{
  const {error, categories} = useCategories();
  const {getSdgsVoorCategories, categoriesMetSdgs, setCategories: setCategoriesSdgs} = useContext(SdgContext);
  const {getDoelstellingenVoorCategories, setCategories: setCategoriesDoelstellingen, categoriesMetDoelstellingen} = useContext(DoelstellingContext);
  
  const {roles} = useSession();
  const {getAllTemplatesByRol, setRolNaam} = useContext(TemplateContext);
  const [templates, setTemplates] = useState([]);
  const [idToIsVisableMap, setidToIsVisableMap] = useState(new Map());
  const [ordersOfCat, setOrdersOfCat] = useState(new Map());


  useEffect(() =>
  {async function fetchData()
  {
    setRolNaam(roles);
    const newTemplate = await getAllTemplatesByRol();
    setTemplates(newTemplate);
  }
  fetchData();
}, [setRolNaam, setTemplates, roles, getAllTemplatesByRol]);

  useEffect(() =>
  {
    const map = new Map();
    const mapOrders = new Map();
    if(templates && templates.length > 0)
    {
      templates.forEach(t => {
        map.set(t.category_id, t.is_visible, t.order);
        mapOrders.set(t.category_id, t.order);
      });
      setidToIsVisableMap(map);
      setOrdersOfCat(mapOrders);
    }
  }, [templates, setidToIsVisableMap]);

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



  return (
    <>
      <h2>{error && <pre className="text-red-600">{error.message}</pre>}</h2>
      <div className={styles.categorie_container}>
        {categoriesMetDoelstellingen
        //.sort(({naam: a}, {naam: b}) => a.localeCompare(b))
        .sort(({id : a}, {id : b}) => ordersOfCat.get(a) > ordersOfCat.get(b))
        .filter(({id}) => idToIsVisableMap.get(id) === 1)
        .map((c) => <AccordionCategory key={c.id} {...c}></AccordionCategory>)}
      </div>
    </>
  );
};
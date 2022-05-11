import styles from './Dashboard.module.css';
import AccordionCategory from '../../components/AccordionCategory';
import Categorie from '../../components/Categorie';
import {useCategories} from "../../contexts/CategorieProvider";
import
  {
  useContext, useEffect
  } from 'react';
import {SdgContext} from '../../contexts/SdgProvider';
import {DoelstellingContext} from '../../contexts/DoelstellingProvider';

export default function Dashboard()
{
  const {error, categories} = useCategories();
  const {getSdgsVoorCategories, categoriesMetSdgs, setCategories: setCategoriesSdgs} = useContext(SdgContext);
  const {getDoelstellingenVoorCategories, setCategories: setCategoriesDoelstellingen, categoriesMetDoelstellingen} = useContext(DoelstellingContext);
  
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
      <h1 data-cy="dashboard-label" className={styles.title}>Dashboard</h1>
      <h2>{error && <pre className="text-red-600">{error.message}</pre>}</h2>
      <div className={styles.categorie_container}>
        {categoriesMetDoelstellingen.sort(({naam: a}, {naam: b}) => a.localeCompare(b)).map((c) =>
        <AccordionCategory key={c.id} {...c}></AccordionCategory>)}
        {/* <Categorie key={c.id} {...c}></Categorie>)} */}
      </div>
    </>
  );
};
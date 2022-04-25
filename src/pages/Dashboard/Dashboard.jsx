import styles from './Dashboard.module.css';

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
  const {categories} = useCategories();
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
      <h1 className={styles.title}>Dashboard</h1>
      <div className={styles.categorie_container}>
        {categoriesMetDoelstellingen.map((c) =>
        <Categorie key={c.id} {...c}></Categorie>)}
      </div>
    </>
  );
};
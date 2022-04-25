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
  const {getSdgsVoorCategories, categoriesMetSdgs, setCategories} = useContext(SdgContext);
  const {} = useContext(DoelstellingContext);
  
  useEffect(() =>
  {
    setCategories(categories);
    getSdgsVoorCategories();
  }, [categories, setCategories, getSdgsVoorCategories]);



  return (
    <>
      <h1 className={styles.title}>Dashboard</h1>
      <div className={styles.categorie_container}>
        {categoriesMetSdgs.map((c) =>
        <Categorie key={c.id} {...c}></Categorie>)}
      </div>
    </>
  );
};
import styles from './Dashboard.module.css';

import Categorie from '../../components/Categorie';
import CategorieDashboard from '../../pages/CategorieDashboard';
//import categories from '../../mock-data/categories.json';
import {useCategories} from "../../contexts/CategorieProvider";
import
  {
    useCallback, useContext, useEffect, useMemo
  } from 'react';
import {SdgContext} from '../../contexts/SdgProvider';
import {DoelstellingContext} from '../../contexts/DoelstellingProvider';

export default function Dashboard()
{
  const {categories} = useCategories();
  const {getSdgsVoorCategories, categoriesMetSdgs, setCategories} = useContext(SdgContext);
  const {doelstellingenCat, getDoelstellingByCategorieID, setCatId} = useContext(DoelstellingContext);


  // TOEGEVOEGD
  //   useEffect(() =>
  // {
  //   setCatId(currentCategorie.CATEGORIEID);
  //   getDoelstellingByCategorieID();
  //   setCatId1(currentCategorie.CATEGORIEID);
  //   getSdgsByCategorieId();
  // }, [currentCategorie, setCatId, getDoelstellingByCategorieID, setCatId1, getSdgsByCategorieId]);
  // let categorieProps = [];
  
  
  useEffect(() =>
  {
    setCategories(categories);
    getSdgsVoorCategories();
  }, [categories, setCategories, getSdgsVoorCategories]);



  return (
    <>
      <h1 className={styles.title}>Dashboard</h1>
      <div className={styles.categorie_container}>
        {categoriesMetSdgs.map((c, index, array) =>
        {
          // setCurrent(c)
          // console.log(`naam: ${currentCategorie.NAAM}, index: ${index}, array: ${array.map(c => c.NAAM)}`);
          console.log(c);
          console.log(c.naam);
          console.log(c.sdgs);
          console.log(c.doelstellingen);


          return <Categorie key={c.id} {...c}></Categorie>;
        })}

      </div>
    </>
  );
};
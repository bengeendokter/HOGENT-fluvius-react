import styles from './Dashboard.module.css';

import Categorie from '../../components/Categorie';
//import categories from '../../mock-data/categories.json';
import { useCategories } from "../../contexts/CategorieProvider";

export default function Dashboard()
{

  const {currentCategorie, setCurrent, categories} = useCategories();
  return (
    <>
      <h1 className={styles.title}>Dashboard</h1>
      <div className={styles.categorie_container}>
      {categories.map(c => <Categorie key={c.id} {...c}></Categorie>)}
      </div>
    </>
  );
};
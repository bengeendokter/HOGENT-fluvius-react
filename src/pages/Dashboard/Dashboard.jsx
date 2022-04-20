import styles from './Dashboard.module.css';

import Categorie from '../../components/Categorie';
import categories from '../../mock-data/categories.json';

export default function Dashboard()
{
  return (
    <>
      <h1 className={styles.title}>Dashboard</h1>
      <div className={styles.categorie_container}>
      {categories.data.map(c => <Categorie key={c.id} {...c}></Categorie>)}
      </div>
    </>
  );
};
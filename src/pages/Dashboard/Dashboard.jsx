import styles from './Dashboard.module.css';
import sdg1 from "../../images/sdg1.jpg";
import sdg2 from "../../images/sdg2.jpg";

export default function Dashboard()
{
  return (
    <>
      <h1 className={styles.title}>Dashboard</h1>
      <div className={styles.categorie}>
        <div className={styles.categorie_heading}>
          <h2 className={styles.title_categorie}>
            Economie
          </h2>
          <div className={styles.sdg_container}>
            <img className={styles.sdg} src={sdg1} alt="sdg1"/>
            <img className={styles.sdg} src={sdg2} alt="sdg2"/>
          </div>
          <button className={styles.hide_button}>^</button>
        </div>

        <div className={styles.doelstellingen_container}>
          <div className={styles.doelstelling}>
            <h3 className={styles.title_doelstelling}>
              Doelstelling 1
            </h3>
          </div>

          <div className={styles.doelstelling}>
            <h3 className={styles.title_doelstelling}>
              Doelstelling 2
            </h3>
          </div>
        </div>
      </div>
    </>
  );
};
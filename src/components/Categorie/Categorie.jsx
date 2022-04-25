import styles from './Categorie.module.css';
import { NavLink} from 'react-router-dom';

export default function Categorie({id, naam, sdgs})
{
    return (
        <div className={styles.categorie}>
            <div className={styles.categorie_heading}>
                <h2 className={styles.title_categorie}>
                    {naam}
                </h2>

                <NavLink key={id} to={`/categorieDashboard/${id}`}>
                {/* <button className={styles.title_categorie} onClick={handleClick}>{c.NAAM}</button> */}
                </NavLink>
                <div className={styles.sdg_container}>
                {sdgs.map(sdg => sdg.AFBEELDINGNAAM).filter((sdgNaam, index, array) => array.indexOf(sdgNaam) === index).map(sdgNaam => <img src={`/assets/images/${sdgNaam}.jpg`} alt={`sdg ${sdgNaam}`} className="w-12 inline-block p-1"/>)}
                </div>
                <button className={styles.hide_button}>^</button>
            </div>
            <div className={styles.doelstellingen_container}>
                {/* {doelstellingenCat.map(d => <Doelstelling key={d.id} { ...d } ></Doelstelling>)} */}
            </div>
        </div>);
};
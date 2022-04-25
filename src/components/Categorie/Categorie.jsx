
import styles from './Categorie.module.css';
import Doelstelling from '../../components/Doelstelling';
import {NavLink} from 'react-router-dom';
import {useCategories} from '../../contexts/CategorieProvider';

export default function Categorie({id, naam, sdgs, doelstellingen})
{
    const {setCurrent} = useCategories();
    const handleClick = () => {
        setCurrent({CATEGORIEID: id, NAAM: naam, sdgs, doelstellingen});
    };

    return (
        <div className={styles.categorie}>
            <div className={styles.categorie_heading}>
                <NavLink key={id} to={`/categorieDashboard/${id}`}>
                <h2 className={styles.title_categorie} onClick={handleClick}>{naam}</h2>
                </NavLink>
                <div className={styles.sdg_container}>
                {sdgs.map(sdg => sdg.AFBEELDINGNAAM).filter((sdgNaam, index, array) => array.indexOf(sdgNaam) === index).map(sdgNaam => <img key={sdgNaam} src={`/assets/images/${sdgNaam}.jpg`} alt={`sdg ${sdgNaam}`} className="w-12 inline-block p-1"/>)}
                </div>
                <button className={styles.hide_button}>^</button>
            </div>
            <div className={styles.doelstellingen_container}>
                {doelstellingen.map(d => <Doelstelling key={d.id} { ...d } ></Doelstelling>)}
            </div>
        </div>);
};
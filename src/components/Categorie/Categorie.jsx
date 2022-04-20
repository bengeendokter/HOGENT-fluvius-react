import styles from './Categorie.module.css';

import Doelstelling from '../../components/Doelstelling';
// import {useDoelstellingen} from '../../contexts/DoelstellingProvider';

import doelstellingen from '../../mock-data/doelstellingen.json';
import sdgs from '../../mock-data/sdgs.json';

export default function Categorie(c)
{
    // const {doelstellingen} = useDoelstellingen();
    return (


        <div className={styles.categorie}>
            <div className={styles.categorie_heading}>
                <h2 className={styles.title_categorie}>
                    {c.NAAM}
                </h2>
                <div className={styles.sdg_container}>
                    {sdgs.data.filter(s => [1, 2].includes(s.idSDG)).map(s => <img key={s.idSDG} className={styles.sdg} src={`/assets/images/sdg${s.idSDG}.jpg`} alt={`sdg${s.idSDG}`}/>)}
                </div>
                <button className={styles.hide_button}>^</button>
            </div>
            <div className={styles.doelstellingen_container}>
                {doelstellingen.data.map(d => <Doelstelling key={d.id} { ...d }  ></Doelstelling>)}
            </div>
        </div>);
};
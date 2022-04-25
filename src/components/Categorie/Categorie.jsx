import styles from './Categorie.module.css';
import {DoelstellingContext} from '../../contexts/DoelstellingProvider';
import Doelstelling from '../../components/Doelstelling';
import { NavLink, Link } from 'react-router-dom';
// import {useDoelstellingen} from '../../contexts/DoelstellingProvider';
import {useCategories} from '../../contexts/CategorieProvider';
import {SdgContext} from '../../contexts/SdgProvider';

//import doelstellingen from '../../mock-data/doelstellingen.json';
//import sdgs from '../../mock-data/sdgs.json';
import {
    useEffect, useContext
  } from 'react';

export default function Categorie(c)
{

  // TOEGEVOEGD
//   const {currentCategorie, setCurrent} = useCategories();
//   const handleClick = () => {
//       setCurrent(c);
//       console.log(currentCategorie);
//   };


//   let arrayIcons = [];
//  sdgsCat.forEach(s => {

//    let iconString = s.ICON;
//    iconString = iconString.substring(8);
//    if(!arrayIcons.includes(iconString)){
//      arrayIcons.push(iconString);
//    }
//  });

//  console.log("c", c.CATEGORIEID, "icon", arrayIcons);

    return (


        <div className={styles.categorie}>
            <div className={styles.categorie_heading}>
                {/* <h2 className={styles.title_categorie}>
                    {c.NAAM}
                </h2> */}

                <NavLink key={c.CATEGORIEID}to={`/categorieDashboard/${c.CATEGORIEID}`}>
                {/* <button className={styles.title_categorie} onClick={handleClick}>{c.NAAM}</button> */}
                </NavLink>


                <div className={styles.sdg_container}>
                {/* {arrayIcons.map(s => <img   src={`/assets${s}`} alt={`${s}`} className="w-12 inline-block p-1"/>)} */}
                    {/* {sdgs.data.filter(s => [1, 2].includes(s.idSDG)).map(s => <img key={s.idSDG} className={styles.sdg} src={`/assets/images/sdg${s.idSDG}.jpg`} alt={`sdg${s.idSDG}`}/>)} */}
                </div>
                <button className={styles.hide_button}>^</button>
            </div>
            <div className={styles.doelstellingen_container}>
                {/* {doelstellingenCat.map(d => <Doelstelling key={d.id} { ...d } ></Doelstelling>)} */}
            </div>
        </div>);
};
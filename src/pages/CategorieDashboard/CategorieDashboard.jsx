import Doelstelling from '../../components/Doelstelling';
import {DoelstellingContext} from '../../contexts/DoelstellingProvider';
import {SdgContext} from '../../contexts/SdgProvider';
import {useParams} from "react-router-dom";
import {NavLink, Link} from 'react-router-dom';
import {useCategories} from "../../contexts/CategorieProvider";
import {useMemo} from "react";
import styles from './CategorieDashboard.module.css';

import
  {
    useEffect, useContext
  } from 'react';
import DoelstellingPreview from '../../components/DoelstellingPreview';

export default function CategorieDashboard(c)
{
  const {doelstellingenCat, getDoelstellingByCategorieID, setCatId, doelstellingen} = useContext(DoelstellingContext);
  const {sdgsCat, getSdgsByCategorieId, setCatId1} = useContext(SdgContext);
  const {currentCategorie, setCurrent, categories} = useCategories();
  const {id} = useParams();


  useEffect(() =>
  {
    setCatId(id);
    getDoelstellingByCategorieID();
    setCatId1(id);
    getSdgsByCategorieId();
  }, [setCatId, setCatId1, getDoelstellingByCategorieID, getSdgsByCategorieId, id]);


  let arrayIcons = [];
  sdgsCat.forEach(s =>
  {

    let iconString = s.ICON;
    iconString = iconString.substring(8);
    if(!arrayIcons.includes(iconString))
    {
      arrayIcons.push(iconString);
    }
  });

  return (

    <>
      <div className="m-2 border-2 border-[#004C69]">
        <div className="border-2 border-[#004C69] bg-[#004C69] text-white text-left p-1 grid grid-cols-2">
          <div>
            <NavLink
              to="/dashboard"
              className="underline"

            >
              Dashboard
            </NavLink>
            <p data-cy="naamCurrentCategorie" className="inline-block">&nbsp;- {currentCategorie.NAAM}</p>

          </div>
          <div className="justify-self-end mr-2">
            {arrayIcons.map(s => <img src={`/assets${s}`} key={s} alt={`${s}`} className="w-12 inline-block p-1" />)}

          </div>
        </div>
        <div className={styles["doelstellingen"]}>
          {doelstellingenCat.map(d => <DoelstellingPreview key={d.id} {...d}/>)}
        </div>



      </div>
    </>
  );
}
import styles from './CategorieDashboard.module.css';
import {DoelstellingContext} from '../../contexts/DoelstellingProvider';
import {useParams} from "react-router-dom";
import {useContext, useEffect, useMemo} from 'react';
import {NavLink} from "react-router-dom";
import {SdgContext} from '../../contexts/SdgProvider';
import DoelstellingPreview from "../../components/DoelstellingPreview/DoelstellingPreview";
import {useCategories} from "../../contexts/CategorieProvider";

export default function CategorieDashboard()
{
  const {doelstellingenCat, getDoelstellingByCategorieID, setCatId} = useContext(DoelstellingContext);
  const {sdgsCat, getSdgsByCategorieId, setCatId1} = useContext(SdgContext);
  const {currentCategorie} = useCategories();
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
      <div className={styles["detail-container"]}>
        <div className={styles["detail-header"]}>
          <div className={styles["detail-breadcrumb"]}>
            <NavLink to="/dashboard" className={styles["breadcrumb-link"]}>
              Dashboard
            </NavLink>
            &nbsp;  /  &nbsp;
            <NavLink to={`/categorieDashboard/${(currentCategorie === undefined || currentCategorie.CATEGORIEID === null) ? 2 : currentCategorie.CATEGORIEID}`} className={styles["breadcrumb-link"]}>
              {
                (currentCategorie === undefined || currentCategorie.NAAM === null) ?
                  "Ecologie"
                  :
                  currentCategorie.NAAM
              }
            </NavLink>

          </div>
          <div className={styles["sdgs"]}>
            {arrayIcons?.map(s => {
              return <>
                <a href={`https://sdgs.un.org/goals/goal${s.substring(8).split("").reverse().join("").substring(4).split("").reverse().join("")}`} target="_blank">
                  <img className={styles["sdg"]} src={`/assets${s}`} key={s} alt={`${s}`} />
                </a>
              </>
            })}
          </div>
        </div>
        <div className={styles["detail-bottom"]}>
          <div className={styles["subdoelstellingen-titel"]}>
            {(doelstellingenCat && doelstellingenCat.length > 0) ?
              "Doelstellingen" : "Geen doelstellingen"
            }
          </div>
          {doelstellingenCat &&
            <div className={styles["subdoelstellingen"]}>
              {
                doelstellingenCat.map(sub =>
                {
                  return <DoelstellingPreview {...sub} key={`${sub.id}${sub.naam}`}></DoelstellingPreview>
                })
              }
            </div>
          }
        </div>
      </div>
    </>
  );
}
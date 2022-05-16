import styles from './DoelstellingDashboard.module.css';
import { DoelstellingContext } from '../../contexts/DoelstellingProvider';
import { useData } from '../../contexts/DataProvider';
import { useParams } from "react-router-dom";
import { useCallback, useContext, useEffect, useMemo } from 'react';
import { NavLink } from "react-router-dom";
import BarChart from '../../components/BarChart';
import { SdgContext } from '../../contexts/SdgProvider';
import DoelstellingPreview from "../../components/DoelstellingPreview/DoelstellingPreview";

export default function DoelstellingDashboard() {
  const { doelstellingen, setCurrentDoelstelling, currentDoel, pad } = useContext(DoelstellingContext);
  const { sdgs } = useContext(SdgContext);
  const { data } = useData();
  const { id } = useParams();
  useEffect(() => {
    //laden
    if (doelstellingen.length >= 1) {
      setCurrentDoelstelling(id);
    }

  }, [doelstellingen, id, setCurrentDoelstelling]);

  const vindDataDoelstelling = useMemo(() => {
    if (currentDoel) {
      const wow = data.filter(d => d.naam === currentDoel.naam)[0];
      return wow
    }
    return null;
  }, [currentDoel, data])

  const vindActueleWaardeData = useMemo(() => {
    if (vindDataDoelstelling) {
      return Object.values(vindDataDoelstelling?.data.sort((a, b) => Object.keys(a)[0] < Object.keys(b)[0])[0])[0];
    }
    return null
  }, [vindDataDoelstelling])

  const berekenPercentage = useMemo(() => {
    const huidigeWaarde = vindActueleWaardeData;
    const doelwaarde = currentDoel["doelwaarde"];
    let percentage;

    percentage = (huidigeWaarde - doelwaarde) / (doelwaarde !== 0 ? doelwaarde : 0.01) * 100;

    return {
      // isMax ? huidigFetch <= doelwaarde : huidigFetch >= doelwaarde
      isOnder: currentDoel.isMax ? huidigeWaarde <= doelwaarde : huidigeWaarde >= doelwaarde,
      percentage
    }
  }, [currentDoel, vindActueleWaardeData])

  const vindSdgs = useMemo(() => {
    let validSDGs = [];
    let categorie;

    if (currentDoel && currentDoel.categorie) {
      if (currentDoel.parent_doelstelling && currentDoel.categorie.id === null) {
        categorie = doelstellingen.find(d => d.id === currentDoel.parent_doelstelling.id).categorie;
      } else {
        categorie = currentDoel.categorie;
      }
      const allSDGs = sdgs.filter(s => s.CATID === categorie.id);

      allSDGs.forEach((sdg, index) => {
        const subArray = allSDGs.slice(0, index);
        if (!subArray.some(s => s.AFBEELDINGNAAM === sdg.AFBEELDINGNAAM)) {
          validSDGs.push(sdg);
        }
      });
    }
    return validSDGs.sort((a, b) => Number(a.AFBEELDINGNAAM) > Number(b.AFBEELDINGNAAM));
  }, [sdgs, currentDoel, doelstellingen])

  const handleReport = useCallback(() => {
    console.log("Reported doelstelling: '", currentDoel.naam, "'")
  }, [currentDoel])

  return (

    <>
      <div className={styles["detail-container"]}>
        <div className={styles["detail-header"]}>
          <div className={styles["detail-breadcrumb"]}>
            <NavLink to="/dashboard" className={styles["breadcrumb-link"]}>
              Dashboard
            </NavLink>
            &nbsp;  /  &nbsp;
            <NavLink to={`/categorieDashboard/${(currentDoel.categorie === undefined || currentDoel.categorie.id === null) ? 2 : currentDoel.categorie.id}`} className={styles["breadcrumb-link"]}>
              {
                (currentDoel.categorie === undefined || currentDoel.categorie.naam === null) ?
                  "Ecologie"
                  :
                  currentDoel.categorie.naam
              }
            </NavLink>

            {
              pad.map(p => {
                return <p key={`${p.naam}${currentDoel.naam}`}>
                  &nbsp; /  &nbsp;
                {(p.naam !== currentDoel.naam) ?
                    <NavLink to={`/doelstellingDashboard/${p.id}`} className={styles["breadcrumb-link"]}>
                      {p.naam}
                    </NavLink>
                    :
                    p.naam
                  }
                </p>
              })
            }
          </div>
          <div className={styles["sdgs"]}>
            {vindSdgs?.map(s => {
              return <>
                <a href={`https://sdgs.un.org/goals/goal${s.AFBEELDINGNAAM}`} target="_blank">
                  <img className={styles["sdg"]} src={`/assets/images/${s.AFBEELDINGNAAM}.jpg`} key={`${s.idSDG}${s.AFBEELDINGNAAM}${s.CATID}`} alt={s.NAAM} />
                </a>
              </>
            })}
          </div>
        </div>
        <div className={styles["detail-top"]}>
          {currentDoel.naam && currentDoel.id && <BarChart naam={currentDoel.naam} id={currentDoel.id} />}
          <div className={styles["detail-right-panel"]}>
            <div className={styles["detail-right-panel-iconInfo"]}>
              <img className={styles["detail-info-icons"]} src="/assets/images/graph_icon.PNG" alt="graph icon" />
              <div className={styles["detail-right-panel-iconInfo-text"]}>
                <div>Huidige waarde:</div>
                <div>{vindActueleWaardeData} {vindDataDoelstelling?.eenheid}</div>
              </div>
            </div>

            <div className={styles["detail-right-panel-iconInfo"]}>
              <img className={styles["detail-info-icons"]} src="/assets/images/target_icon.PNG" alt="graph icon" />
              <div className={styles["detail-right-panel-iconInfo-text"]}>
                <div>{currentDoel.isMax ? "Drempelwaarde:" : "Doelwaarde:"}</div>
                <div>{currentDoel.doelwaarde} {vindDataDoelstelling?.eenheid}</div>
              </div>
            </div>

            <div className={styles["detail-right-panel-iconInfo"]}>
              <img className={styles["detail-info-icons"]} src="/assets/images/question_icon.PNG" alt="graph icon" />
              <div className={styles["detail-right-panel-iconInfo-text"]}>
                <div>{currentDoel.isMax ? "Drempel" : "Doel"} {(currentDoel.isMax && (vindActueleWaardeData <= currentDoel.doelwaarde)) && "niet"} bereikt:</div>
                <div className={!berekenPercentage.isOnder ? styles["percentage-onder"] : styles["percentage-boven"]}>{Math.abs(Math.round(berekenPercentage.percentage))}% {vindActueleWaardeData >= currentDoel.doelwaarde ? "boven" : "onder"} {currentDoel.isMax ? "drempel" : "doel"}</div>
              </div>
            </div>
            <div className={styles["detail-fout-melden-div"]}>
              <div className={styles["detail-fout-melden"]}>
                <p>Fout melden</p>
                <img onClick={handleReport} src="/assets/images/exlamation_icon.png" alt="meld icon" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles["detail-bottom"]}>
          <div className={styles["subdoelstellingen-titel"]}>
            {(currentDoel.subdoelstellingen && currentDoel.subdoelstellingen.length > 0) ?
              "Subdoelstellingen" : "Geen subdoelstellingen"
            }
          </div>
          {currentDoel.subdoelstellingen &&
            <div className={styles["subdoelstellingen"]}>
              {
                currentDoel.subdoelstellingen.map(sub => {
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
import React, {useCallback, useContext, useEffect, useMemo, useRef, useState} from 'react';
import {NavLink, useParams} from "react-router-dom";
import BarChart from '../../components/BarChart';
import DoelstellingPreview from "../../components/DoelstellingPreview/DoelstellingPreview";
import {useSession} from "../../contexts/AuthProvider";
import {useData} from '../../contexts/DataProvider';
import {DoelstellingContext} from '../../contexts/DoelstellingProvider';
import {SdgContext} from '../../contexts/SdgProvider';
import styles from './DoelstellingDashboard.module.css';

export default function DoelstellingDashboard()
{
  const {doelstellingen, setCurrentDoelstelling, currentDoel, pad} = useContext(DoelstellingContext);
  const {sdgs} = useContext(SdgContext);
  const {data} = useData();
  const {id} = useParams();
  const {roles} = useSession();
  const [isGemeld, setGemeld] = useState(false);
  const ref_dialog = useRef(null);
  useEffect(() =>
  {
    if(doelstellingen.length >= 1)
    {
      setCurrentDoelstelling(id);
    }

  }, [doelstellingen, id, setCurrentDoelstelling]);

  const vindDataDoelstelling = useMemo(() =>
  {
    if(currentDoel)
    {
      const wow = data.filter(d => d.naam === currentDoel.naam)[0];
      return wow
    }
    return null;
  }, [currentDoel, data])

  const vindActueleWaardeData = useMemo(() =>
  {
    if(vindDataDoelstelling)
    {
      let x = vindDataDoelstelling.data;
      let maxIndex;
      let jaren = [];
      let waarde;
      x.forEach(d => jaren.push(Number(Object.keys(d)[0])));
      maxIndex = jaren.indexOf(Math.max(...jaren));
      waarde = x[maxIndex][`${Math.max(...jaren)}`][0];
      return waarde;
    }
    return null
  }, [vindDataDoelstelling])

  const berekenPercentage = useMemo(() =>
  {
    const huidigeWaarde = vindActueleWaardeData;
    const doelwaarde = currentDoel["doelwaarde"];
    let percentage;

    percentage = (huidigeWaarde - doelwaarde) / (doelwaarde !== 0 ? doelwaarde : 0.01) * 100;

    return {
      isOnder: currentDoel.isMax ? huidigeWaarde <= doelwaarde : huidigeWaarde >= doelwaarde,
      percentage
    }
  }, [currentDoel, vindActueleWaardeData])

  const vindSdgs = useMemo(() =>
  {
    let validSDGs = [];

    if(currentDoel && currentDoel.categorie)
    {
      const allSDGs = sdgs.filter(s => s.idSDG === currentDoel.sdg_goal.id);

      allSDGs.forEach((sdg, index) =>
      {
        const subArray = allSDGs.slice(0, index);
        if(!subArray.some(s => s.AFBEELDINGNAAM === sdg.AFBEELDINGNAAM))
        {
          validSDGs.push(sdg);
        }
      });
    }
    return validSDGs.sort((a, b) => Number(a.AFBEELDINGNAAM) > Number(b.AFBEELDINGNAAM));
  }, [sdgs, currentDoel])

  // report datasource
  const handleReport = useCallback(() =>
  {
    setGemeld(false);
    ref_dialog.current.showModal();
  }, [ref_dialog]);

  const closeModal = useCallback((e) =>
  {
    ref_dialog.current.close();
    setGemeld(false);
  }, [ref_dialog]);

  const submitModal = useCallback((e) =>
  {
    ref_dialog.current.close();
    setGemeld(true);
  }, [ref_dialog]);



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
              pad.map(p =>
              {
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
            {vindSdgs?.map(s =>
            {
              return <>
                <a href={`https://sdgs.un.org/goals/goal${s.AFBEELDINGNAAM}`} target="_blank" rel="noreferrer">
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
            {roles && roles === "Manager" &&
              <div className={styles["detail-fout-melden-div"]}>
                <div className={styles["detail-fout-melden"]}>
                  {isGemeld ? <p className={styles[`${isGemeld ? "fout" : "juist"}`]}>Bedankt, uw fout is gemeld</p> : <p>Foutieve data melden</p>}
                  <img onClick={handleReport} src="/assets/images/exlamation_icon.png" alt="meld icon" />

                </div>
              </div>
            }
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
                currentDoel.subdoelstellingen.map(sub =>
                {
                  return <DoelstellingPreview {...sub} key={`${sub.id}${sub.naam}`}></DoelstellingPreview>
                })
              }
            </div>
          }
        </div>
      </div>

      <dialog ref={ref_dialog} className={styles.modal}>
        <form id='form_datasource' className={styles.form_datasource} onSubmit={(e) => e.preventDefault()}>
          <h2 className={styles.form_title}>Foutieve data melden</h2>
          <label className={styles.form_label} htmlFor="comment">Beschrijving van de fout</label>
          <textarea className={styles.form_input} name="comment" id="comment" cols="50" rows="7"></textarea>
          <div className={styles.form_buttons_container}>
            <button onClick={(e) => closeModal(e)} className={[styles.form_annuleer, styles.form_button].join(" ")} >Annuleer</button>
            <button onClick={(e) => submitModal(e)} form='form_datasource' className={[styles.form_verstuur, styles.form_button].join(" ")} >Verstuur melding</button>
          </div>
        </form>
      </dialog>

    </>
  );
}
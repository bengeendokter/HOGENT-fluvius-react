import styles from './DoelstellingDashboard.module.css';
import Accordion from '../../components/Accordion';
import { DoelstellingContext} from '../../contexts/DoelstellingProvider';
import { useData } from '../../contexts/DataProvider';
import { useParams } from "react-router-dom";
import { useContext, useEffect, useMemo } from 'react';
import { NavLink } from "react-router-dom";
import BarChart from '../../components/BarChart';
import { SdgContext } from '../../contexts/SdgProvider';

export default function DoelstellingDashboard() {
  const {doelstellingen, setCurrentDoelstelling, currentDoel,pad} = useContext(DoelstellingContext);
  const {sdgs} = useContext(SdgContext);
  const {data} = useData();
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
      return Object.values(vindDataDoelstelling?.data.sort((a,b) => Object.keys(a)[0] < Object.keys(b)[0])[0])[0];
    }
    return null
  }, [vindDataDoelstelling])

  const berekenPercentage = useMemo(() => {
    const huidigeWaarde = vindActueleWaardeData;
    const doelwaarde = currentDoel["doelwaarde"];
    let percentage;

    percentage = (huidigeWaarde - doelwaarde) / (doelwaarde !== 0 ? doelwaarde : 0.01) * 100;

    return {
      isOnder: huidigeWaarde < doelwaarde,
      percentage
    }
  }, [currentDoel, vindActueleWaardeData])
  
  const vindSdgs = useMemo(() => {
    let validSDGs = [];
    
    if (currentDoel && currentDoel.categorie) {
      const allSDGs = sdgs.filter(s => s.CATID === currentDoel.categorie.id);

      allSDGs.forEach((sdg, index) => {
        const subArray = allSDGs.slice(0, index);
        if (!subArray.some(s => s.AFBEELDINGNAAM === sdg.AFBEELDINGNAAM)) {
          validSDGs.push(sdg);
        }
      });
    }
    return validSDGs.sort((a, b) => a.AFBEELDINGNAAM > b.AFBEELDINGNAAM);
  }, [sdgs, currentDoel])

  return (

    <>
      <div className={styles["detail-container"]}>
        <div className={styles["detail-header"]}>
      <div className={styles["detail-breadcrumb"]}>
        <NavLink to="/dashboard" className={styles["breadcrumb-link"]}>
			    Dashboard 
		    </NavLink>
        &nbsp;  /  &nbsp;
        <NavLink to={`/categorieDashboard/${(currentDoel.categorie === undefined || currentDoel.categorie.id === null) ? 2: currentDoel.categorie.id}`} className={styles["breadcrumb-link"]}>
			    {
          (currentDoel.categorie === undefined || currentDoel.categorie.naam === null)? 
            "Ecologie"
            : 
            currentDoel.categorie.naam
          }
		    </NavLink>

        {
          pad.map(p=>  { 
            return <> 
            &nbsp; /  &nbsp;
            { (p.naam !== currentDoel.naam)?
              <NavLink to={`/doelstellingDashboard/${p.id}`} className={styles["breadcrumb-link"]}>
                {p.naam}
              </NavLink>
              :
              p.naam
            }
          </>
          })
        }
      </div>
      <div className={styles["sdgs"]}>
      {vindSdgs?.map(s => {
        return <img className={styles["sdg"]} src={`/assets/images/${s.AFBEELDINGNAAM}.jpg`} alt={s.NAAM} />
        })}
      </div>
      </div>
      <div className={styles["detail-top"]}>
        {currentDoel.naam && currentDoel.id && <BarChart naam={currentDoel.naam} id={currentDoel.id}/>}
        <div className={styles["detail-right-panel"]}>
          <div className={styles["detail-right-panel-iconInfo"]}>
            <img className={styles["detail-info-icons"]} src="/assets/images/graph_icon.PNG" alt="graph icon"/>
            <div className={styles["detail-right-panel-iconInfo-text"]}>
              <div>Huidige waarde:</div>
              <div>{vindActueleWaardeData} {vindDataDoelstelling?.eenheid}</div>
            </div>
          </div>

          <div className={styles["detail-right-panel-iconInfo"]}>
            <img className={styles["detail-info-icons"]} src="/assets/images/target_icon.PNG" alt="graph icon"/>
            <div className={styles["detail-right-panel-iconInfo-text"]}>
              <div>{currentDoel.isMax? "Doelwaarde:":"Drempelwaarde:"}</div>
              <div>{currentDoel.doelwaarde} {vindDataDoelstelling?.eenheid}</div>
            </div>
          </div>

          <div className={styles["detail-right-panel-iconInfo"]}>
            <img className={styles["detail-info-icons"]} src="/assets/images/question_icon.PNG" alt="graph icon"/>
            <div className={styles["detail-right-panel-iconInfo-text"]}>
              <div>Doel {berekenPercentage.isOnder? "niet":""} behaald:</div>
              <div className={berekenPercentage.isOnder? styles["percentage-onder"]:styles["percentage-boven"]}>{!berekenPercentage.isOnder && "+"}{berekenPercentage.percentage}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {currentDoel && pad &&
      <>
       <div className="m-2 border-2 border-[#004C69]">
        <div className="border-2 border-[#004C69] bg-[#004C69] text-white text-left p-1 grid grid-cols-2">
          

    <div className="justify-self-end mr-2">Sdgs</div>
    </div>

 {<div className="accordion min-w-full px-4">
          {currentDoel.subdoelstellingen && currentDoel.subdoelstellingen.map(d => <Accordion {...d}></Accordion>)}
        </div>}
    </div>
    </>
  }
    </>
  );
}
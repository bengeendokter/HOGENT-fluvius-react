import {useEffect, useState} from 'react';
import {NavLink} from "react-router-dom";
import {useData} from "../../contexts/DataProvider";
import styles from './DoelstellingPreview.module.css';

export default function DoelstellingPreview({id, doelwaarde: doelwaardeProp, isMax: isMaxProp, naam})
{
    const [doelId] = useState(id);
    const [doelwaarde] = useState(doelwaardeProp);
    const [isMax] = useState(isMaxProp);
    const [huidieWaarde, setHuidieWaarde] = useState(0);
    const [eenheid, setEenheid] = useState("...");
    const {data} = useData();

    const [isDoelBehaald, setDoelBehaald] = useState(false);
    const [percentage, setPercentage] = useState(0);
    const [kleur, setKleur] = useState('');

    // haal huidigeWaarde en eenheid op via API
    useEffect(() =>
    {
        const huidigDoel = data.find(doel => doel.id === doelId);
        setEenheid(huidigDoel?.eenheid);

        // haal huidige waarde van laatste jaar op
        const huidigFetch = Object.values(Object.values(huidigDoel.data).sort((obj1, obj2) => Object.keys(obj2)[0] - Object.keys(obj1)[0])[0])[0][0];

        setHuidieWaarde(huidigFetch);
        setDoelBehaald(isMax ? huidigFetch <= doelwaarde : huidigFetch >= doelwaarde);
        setPercentage(Math.round((huidigFetch - doelwaarde) / (doelwaarde !== 0 ? doelwaarde : 0.01) * 100));

        // DREMPELWAARDE
        if(isMax)
        {
            if(percentage < -10)
            {
                setKleur('doelbehaaldGoed');
            }
            else if(percentage < 0)
            {
                setKleur('doelbehaaldBijnaGoed');
            }
            else if(percentage < 40)
            {
                setKleur('doelbehaaldSlecht');
            }
            else
            {
                setKleur('doelbehaaldHeelSlecht');
            }
        }
        // DOELWAARDE 
        else
        {
            if(percentage >= 10)
            {
                setKleur('doelbehaaldGoed');
            }
            else if(percentage >= 0)
            {
                setKleur('doelbehaaldBijnaGoed');
            }
            else if(percentage >= - 40)
            {
                setKleur('doelbehaaldSlecht');
            }
            else
            {
                setKleur('doelbehaaldHeelSlecht');
            }
        }

    }, [doelId, isMax, doelwaarde, data, setEenheid, setHuidieWaarde, setDoelBehaald, isDoelBehaald, percentage]);



    return (
        <>
            {
                <NavLink to={`/doelstellingDashboard/${doelId}`} className={
                    [styles.doelstelling, styles[`${kleur}`],
                    ].join(" ")}>
                    <h3 data-cy="doelstellingNaam" className={styles.naam}>{naam}</h3>
                    <div className={styles["huidigeWaarde-div"]}>
                        <p className={styles.label}>Huidige waarde:</p>
                        <p className={styles.huidieWaarde}>{huidieWaarde} {eenheid}</p>
                    </div>
                    <div className={styles["doelwaarde-div"]}>
                        <p className={styles.label}>{isMax ? "Drempelwaarde:" : "Doelwaarde:"}</p>
                        <p className={styles.doelWaarde}>{doelwaarde} {eenheid}</p>
                    </div>
                    <p className={styles.percentage}><strong className={[styles.percentage_getal, huidieWaarde >= doelwaarde && styles.doel_boven].join(" ")}>{Math.abs(percentage)}%</strong> {huidieWaarde >= doelwaarde ? "boven" : "onder"} {isMax ? "drempel" : "doel"}</p>
                </NavLink>}</>)
};
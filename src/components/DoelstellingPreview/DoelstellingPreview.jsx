import styles from './DoelstellingPreview.module.css';
import { NavLink } from "react-router-dom";
import {useData} from "../../contexts/DataProvider";
import {useState, useEffect} from 'react';

export default function DoelstellingPreview({id, doelwaarde: doelwaardeProp, isMax: isMaxProp, naam})
{
    const [doelId] = useState(id);
    const [doelwaarde] = useState(doelwaardeProp);
    const [isMax] = useState(isMaxProp);
    const [huidieWaarde, setHuidieWaarde] = useState(0);
    const [eenheid, setEenheid] = useState("...");
    const {data, error} = useData();
    // TODO hoe geef ik error boodschap door aan parent (Dashboard.jsx) ?
    const [isDoelBehaald, setDoelBehaald] = useState(false);
    const [percentage, setPercentage] = useState(0);

    // haal huidigeWaarde en eenheid op via API
    useEffect(() =>
    {
        const huidigDoel = data.find(doel => doel.id === doelId);
        setEenheid(huidigDoel?.eenheid);
        // TODO jaartal niet hardcoden
        const huidigFetch = huidigDoel?.data[0][2022][0]
        setHuidieWaarde(huidigFetch);
        setDoelBehaald(isMax ? huidigFetch <= doelwaarde : huidigFetch >= doelwaarde);
        setPercentage((huidigFetch - doelwaarde) / (doelwaarde !== 0 ? doelwaarde : 0.01) * 100);
    }, [doelId, isMax, doelwaarde, data, setEenheid, setHuidieWaarde, setDoelBehaald]);
    return (
        <>
        { 
        <NavLink to={`/doelstellingDashboard/${doelId}`} className={[styles.doelstelling, isDoelBehaald && styles.doelbehaald].join(" ")}>
            <h3 data-cy="doelstellingNaam" className={styles.naam}>{naam}</h3>
            <div className={styles["huidigeWaarde-div"]}>
                <p className={styles.label}>Huidige waarde:</p>
                <p className={styles.huidieWaarde}>{huidieWaarde} {eenheid}</p>
            </div>
            <div className={styles["doelwaarde-div"]}>
                <p className={styles.label}>{isMax ? "Drempelwaarde:" : "Doelwaarde:"}</p>
                <p className={styles.doelWaarde}>{doelwaarde} {eenheid}</p>
            </div>
            <p className={styles.percentage}><strong>{huidieWaarde >= doelwaarde ? "+" : ""}{percentage}%</strong> t.o.v. doel</p>
        </NavLink>}</>)
};
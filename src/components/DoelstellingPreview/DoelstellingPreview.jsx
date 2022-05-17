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
    const [kleur, setKleur] = useState('');

    // haal huidigeWaarde en eenheid op via API
    useEffect(() =>
    {
        const huidigDoel = data.find(doel => doel.id === doelId);
        setEenheid(huidigDoel?.eenheid);
        // TODO jaartal niet hardcoden
        let huidigFetch;
        for(let i = 0; i < huidigDoel?.data.length; i++)
        {
            if(huidigDoel?.data[i][2022] !== undefined) huidigFetch = huidigDoel?.data[i][2022][0];
        }
        //const huidigFetch = huidigDoel?.data[0][2022][0]
        setHuidieWaarde(huidigFetch);
        setDoelBehaald(isMax ? huidigFetch <= doelwaarde : huidigFetch >= doelwaarde);
        setPercentage(Math.round((huidigFetch - doelwaarde) / (doelwaarde !== 0 ? doelwaarde : 0.01) * 100));
        
        // DREMPELWAARDE BEHAALD
        if(isDoelBehaald && isMax && (Math.abs(percentage) < 20) ){
            setKleur('doelbehaaldHeelSlecht');
        }
        if(isDoelBehaald && isMax && (Math.abs(percentage) >= 40) && (Math.abs(percentage) < 60)){
            setKleur('doelbehaaldSlecht');
        }
        if(isDoelBehaald && isMax && (Math.abs(percentage) >= 60) && (Math.abs(percentage) < 80)){
            setKleur('doelbehaaldBijnaGoed');
        }
        if(isDoelBehaald && isMax && (Math.abs(percentage) >=80) ){
            setKleur('doelbehaaldGoed');
        }

        // DREMPELWAARDE NIET BEHAALD
        if(!isDoelBehaald && isMax && (Math.abs(percentage) < 20) ){
            setKleur('doelbehaaldGoed');
        }
        if(!isDoelBehaald && isMax && (Math.abs(percentage) >= 40) && (Math.abs(percentage) < 60)){
            setKleur('doelbehaaldBijnaGoed');
        }
        if(!isDoelBehaald && isMax && (Math.abs(percentage) >= 60) && (Math.abs(percentage) < 80)){
            setKleur('doelbehaaldSlecht');
        }
        if(!isDoelBehaald && isMax && (Math.abs(percentage) >=80) ){
            setKleur('doelbehaaldHeelSlecht');
        }

        // DOELWAARDE BEHAALD
        if(isDoelBehaald && !isMax && (Math.abs(percentage) >= 60) ){
            setKleur('doelbehaaldHeelSlecht');
        }
        if(isDoelBehaald && !isMax && (Math.abs(percentage) >= 40) && (Math.abs(percentage) < 60)){
            setKleur('doelbehaaldSlecht');
        }
        if(isDoelBehaald && !isMax && (Math.abs(percentage) >= 20) && (Math.abs(percentage) < 40)){
            setKleur('doelbehaaldBijnaGoed');
        }
        if(isDoelBehaald && !isMax && (Math.abs(percentage) < 20) ){
            setKleur('doelbehaaldGoed');
        }

        // DOELWAARDE NIET BEHAALD
        if(!isDoelBehaald && !isMax && (Math.abs(percentage) >= 60) ){
            setKleur('doelbehaaldHeelSlecht');
        }
        if(!isDoelBehaald && !isMax && (Math.abs(percentage) >= 40) && (Math.abs(percentage) < 60)){
            setKleur('doelbehaaldSlecht');
        }
        if(!isDoelBehaald && !isMax && (Math.abs(percentage) >= 20) && (Math.abs(percentage) < 40)){
            setKleur('doelbehaaldBijnaGoed');
        }
        if(!isDoelBehaald && !isMax && (Math.abs(percentage) < 20) ){
            setKleur('doelbehaaldGoed');
        }
    }, [doelId, isMax, doelwaarde, data, setEenheid, setHuidieWaarde, setDoelBehaald, isDoelBehaald, percentage]);

    

    return (
        <>
        { 
        <NavLink to={`/doelstellingDashboard/${doelId}`} className={
            [styles.doelstelling, kleur ==="doelbehaaldHeelSlecht" && styles.doelbehaaldHeelSlecht,
            kleur ==="doelbehaaldSlecht" && styles.doelbehaaldSlecht,
            kleur ==="doelbehaaldBijnaGoed" && styles.doelbehaaldBijnaGoed,
            kleur ==="doelbehaaldGoed" && styles.doelbehaaldGoed,
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
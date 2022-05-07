
import styles from './DoelstellingPreview.module.css';
import {useData} from "../../contexts/DataProvider";
import
    {
        useState,
        useEffect
    } from 'react';

export default function DoelstellingPreview({id, doelwaarde, isMax, naam})
{
    const [doelId, setdoelId] = useState(id);
    const [huidieWaarde, setHuidieWaarde] = useState("...");
    const [eenheid, setEenheid] = useState("...");
    const {data, error} = useData();

    // haal huidegeWaarde en eenheid op via API
    useEffect(() =>
    {
        const huidigDoel = data.find(doel => doel.id === id);
        setEenheid(huidigDoel.eenheid);
        setHuidieWaarde(huidigDoel.data[0][2020][0]);
        
    }, [id, data, setEenheid]);

    return (
        <div className={styles.doelstelling}>
            <p>{naam}</p>
            <p>{doelwaarde}</p>
            <p>{huidieWaarde}</p>
            <p>{eenheid}</p>
            <p>{isMax ? "Max" : "Min"}</p>
        </div>);
};
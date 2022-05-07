
import Accordion from '../components/Accordion';
import { DoelstellingContext} from '../contexts/DoelstellingProvider';
import {useParams, useLocation } from "react-router-dom";
import {
  useContext, useEffect
} from 'react';
import { NavLink } from "react-router-dom";
import { useCategories } from "../contexts/CategorieProvider";


export default function DoelstellingDashboard() {
  const {doelstellingen, setCurrentDoelstelling, currentDoel, getSubWithID, pad} = useContext(DoelstellingContext);
  const { id } = useParams();
  //const {currentCategorie, setCurrent, categories} = useCategories();
  //let doelstelling = doelstellingen.filter(e => e.id === Number(id))[0];

  
  useEffect(() => {
    //laden
    if (doelstellingen.length >= 1) {
      setCurrentDoelstelling(id);
    }
    
    
  }, [doelstellingen, id, setCurrentDoelstelling]);
  
  return (<>
   

        {currentDoel && pad && console.log(pad)}

  
    </>
  );
}
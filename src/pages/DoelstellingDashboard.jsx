
import Accordion from '../components/Accordion';
import { DoelstellingContext} from '../contexts/DoelstellingProvider';
import {useParams } from "react-router-dom";
import {
  useContext, useEffect
} from 'react';
import { NavLink } from "react-router-dom";
export default function DoelstellingDashboard() {
  const {doelstellingen, setCurrentDoelstelling, currentDoel,pad} = useContext(DoelstellingContext);
  const { id } = useParams();
  useEffect(() => {
    //laden
    if (doelstellingen.length >= 1) {
      setCurrentDoelstelling(id);
    }
    
  }, [doelstellingen, id, setCurrentDoelstelling]);
  
  return (

    <>
    {currentDoel && pad &&
      <>
       <div className="m-2 border-2 border-[#004C69]">
        <div className="border-2 border-[#004C69] bg-[#004C69] text-white text-left p-1 grid grid-cols-2">
          <div className="ml-2">
    <NavLink
			to="/dashboard"
      className="underline"
			>
			Dashboard 
		</NavLink>
    &nbsp;  -  &nbsp;
    <NavLink
			to={`/categorieDashboard/${(currentDoel.categorie === undefined || currentDoel.categorie.id === null) ? 2: currentDoel.categorie.id}`}
      className="underline"
			>
			 {(currentDoel.categorie === undefined || currentDoel.categorie.naam === null) ? "Ecologie": currentDoel.categorie.naam}
		</NavLink>

    {
      pad.map(p=>  { 
        return <> &nbsp; -  &nbsp;
      { (p.naam !== currentDoel.naam) ?
       <NavLink
         to={`/doelstellingDashboard/${p.id}`}
         className="underline"
         >
          {p.naam}
       </NavLink>
      : p.naam}
      </>
       })
    }
    </div>

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
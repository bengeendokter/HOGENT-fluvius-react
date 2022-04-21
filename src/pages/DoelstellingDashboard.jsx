
import Accordion from '../components/Accordion';
import { DoelstellingContext} from '../contexts/DoelstellingProvider';
import {useParams } from "react-router-dom";
import {
  useContext
} from 'react';


export default function DoelstellingDashboard() {
  const {doelstellingen} = useContext(DoelstellingContext);
  const { id } = useParams();
  
  console.log(id);

  const doelstelling = doelstellingen.filter(e => e.id === Number(id))[0];
  console.log(doelstelling);

  
  
  return (

    <>
    {doelstelling && 
      <div className="m-2 border-2 border-[#004C69]">
        <div className="border-2 border-[#004C69] bg-[#004C69] text-white text-left p-1 grid grid-cols-2">
          <div className="ml-2">DashBoard - Economie - {doelstelling.naam}</div>
          <div className="justify-self-end mr-2">Sdgs</div>
        </div>

      

        <div className="accordion min-w-full px-4">
          {doelstelling.subdoelstellingen && doelstelling.subdoelstellingen.map(d => <Accordion {...d}></Accordion>)}
        </div>

      </div>
}
    </>
  );
}
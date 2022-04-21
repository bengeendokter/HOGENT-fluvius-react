import Doelstelling from '../components/Doelstelling';
import {DoelstellingContext} from '../contexts/DoelstellingProvider';
import {useParams } from "react-router-dom";
import {
  useEffect, useContext
} from 'react';

export default function CategorieDashboard() {
  const {doelstellingenCat, getDoelstellingByCategorieID, setCatId} = useContext(DoelstellingContext);
  const { id } = useParams();
  // console.log(id);

  useEffect(() =>
  {
    setCatId(id);
    getDoelstellingByCategorieID();
  }, [setCatId,getDoelstellingByCategorieID, id]);

  
  return (
    <>
      <div className="m-2 border-2 border-[#004C69]">
        <div className="border-2 border-[#004C69] bg-[#004C69] text-white text-left p-1 grid grid-cols-2">
          <div className="ml-2">DashBoard - Economie</div>
          <div className="justify-self-end mr-2">Sdgs</div>
        </div>


      {doelstellingenCat.map(d => <Doelstelling key={d.id} { ...d }  ></Doelstelling>)}

      </div>
    </>
  );
}
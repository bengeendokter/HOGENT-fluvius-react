import { NavLink } from "react-router-dom";
import BarChart from "./BarChart";
import {useData} from '../contexts/DataProvider'
import { useEffect } from "react";


export default function Doelstelling(d) {
  const {naam, id} = d;
  const { doelstellingenData, getAllDataByDoelstellingId, setDoelstellingId} = useData();

  useEffect(() =>
  {
    setDoelstellingId(id);
    getAllDataByDoelstellingId();
  }, [setDoelstellingId,getAllDataByDoelstellingId, id]);

  console.log("de array", doelstellingenData);

  return (
    <>
      <NavLink
			  to={`/doelstellingDashboard/${id}`}>
           <div className="border-2 border-[#004C69] text-left p-1 m-2">
          <div className="grid grid-cols-2">
            <div>{naam}</div>
            <div className="justify-self-end mt-7">
              <BarChart></BarChart>
            </div>
          </div>
        </div>     
                
      </NavLink>


        
        
    </>
  );
}
import {NavLink} from "react-router-dom";
import BarChart from "./BarChart";

export default function Doelstelling(d)
{
  const {naam, id, subdoelstellingen} = d;


  return (
    <>
      {subdoelstellingen && subdoelstellingen.length > 0 ? <><NavLink
        to={`/doelstellingDashboard/${id}`} >
        <div className="border-2 border-[#055063] text-left p-1 m-2">

          <div className="grid grid-cols-2">
            <div data-cy="doelstellingNaam">{naam}</div>
            <div className="justify-self-end mt-7">
              <BarChart id={id} naam={naam}></BarChart>
            </div>
          </div>
        </div>

      </NavLink></> : <>
        <div className="border-2 border-[#055063] text-left p-1 m-2">
          <div className="grid grid-cols-2">
            <div data-cy="doelstellingNaam">{naam}</div>
            <div className="justify-self-end mt-7">
              <BarChart id={id} naam={naam}></BarChart>
            </div>
          </div>
        </div>    </>}
    </>
  );
}
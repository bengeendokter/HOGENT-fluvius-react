import { NavLink } from "react-router-dom";

export default function Doelstelling(d) {
  const {naam, id} = d;

  return (
    <>
      <NavLink
			  to={`/doelstellingDashboard/${id}`}>
           <div className="border-2 border-[#004C69] text-left p-1 m-2">
          <div className="grid grid-cols-2">
            <div>{naam}</div>
            <div className="justify-self-end">Grafiek</div>
          </div>
        </div>     
                
      </NavLink>


        
        
    </>
  );
}
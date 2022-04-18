import { NavLink } from "react-router-dom";

export default function Doelstelling(d) {
  const {naam, id} = d;

  return (
    <>
      <NavLink
			  to={`/doelstellingDashboard/${id}`}>
                <a href="#" >
                    <span className="ml-12">Doestelling: {naam}</span>
                </a>
      </NavLink>


        <div className="border-2 border-[#004C69] text-left p-1 m-2">
          <div className="grid grid-cols-2">
            <div>{naam}</div>
            <div>{id}</div>
            <div className="justify-self-end">Grafiek</div>
          </div>
        </div>
        
    </>
  );
}
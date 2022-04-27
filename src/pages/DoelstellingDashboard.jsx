
import Accordion from '../components/Accordion';
import { DoelstellingContext} from '../contexts/DoelstellingProvider';
import {useParams } from "react-router-dom";
import {
  useContext
} from 'react';
import { NavLink } from "react-router-dom";
import { useCategories } from "../contexts/CategorieProvider";


export default function DoelstellingDashboard() {
  const {doelstellingen} = useContext(DoelstellingContext);
  const { id } = useParams();
  const {currentCategorie, setCurrent, categories} = useCategories();
  
  console.log("de id van de doelstelling", id);
  console.log("de array van doels", doelstellingen);

  let doelstelling = doelstellingen.filter(e => e.id === Number(id))[0];
  
  if (doelstelling === undefined) {
    
    for (var m = 0; m < doelstellingen.length; m++) {
      //top niveau doelstellingen overlopen
      if (doelstellingen[m].soort === 'COMP') {
        //kijken of ze subdoelstellingen hebben
        if (doelstellingen[m].subdoelstellingen && doelstellingen[m].subdoelstellingen.length >= 1) {
            //iteratie over eerste subs
            for (var y = 0; y < doelstellingen[m].subdoelstellingen.length; y++) {
              //kijk naar de id
              const lijst = doelstellingen[m].subdoelstellingen;
              if (lijst[y].id === Number(id)) {
                //gelijkstellen en break;
                doelstelling = lijst[y];
                break;
              }

              //niet gelijk maar check naar subs

              if (lijst[y].soort === 'COMP') {
                if (lijst[y].subdoelstellingen && lijst[y].subdoelstellingen.length >= 1) {
                  for (var z = 0; z < lijst[y].subdoelstellingen.length; z++)  {
                    const lijst1 = lijst[y].subdoelstellingen;
                    
                    if (lijst1[z].id === Number(id)) {
                      //gelijkstellen en break;
                      doelstelling = lijst1[z];
                      break;
                    }

                  }
                }
              }
              

            }
        }
      }
      //next doelstelling
    }
  }
  
  console.log("testtest", doelstelling)

  return (

    <>
    {(doelstelling && doelstelling.subdoelstellingen && doelstelling.subdoelstellingen.length > 0) &&
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
			to={`/categorieDashboard/${currentCategorie.CATEGORIEID}`}
      className="underline"
			>
			 {currentCategorie.NAAM}
		</NavLink>
   
    &nbsp;   -  &nbsp; {doelstelling.naam}</div>
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
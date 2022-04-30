
import Accordion from '../components/Accordion';
import { DoelstellingContext} from '../contexts/DoelstellingProvider';
import {useParams, useLocation } from "react-router-dom";
import {
  useContext
} from 'react';
import { NavLink } from "react-router-dom";
import { useCategories } from "../contexts/CategorieProvider";


export default function DoelstellingDashboard() {
  const {doelstellingen} = useContext(DoelstellingContext);
  const { id } = useParams();
  const {currentCategorie, setCurrent, categories} = useCategories();
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

  //breadcrumbs bestaande uit array van parent doelstellingen
  let pad = [];
  
  //alleen overlopen als het een sub is, dus een parent doelstelling heeft (parent_doelstelling.id !== null)
  if (doelstelling && doelstelling.parent_doelstelling.id !== null) {
    const parentid = doelstelling.parent_doelstelling.id;

    //alle parents steken in de array
    let parent = doelstellingen.filter(e => e.id === Number(parentid))[0];
    if (parent === undefined) {
    
      for (var m = 0; m < doelstellingen.length; m++) {
        //top niveau doelstellingen overlopen
        if (doelstellingen[m].soort === 'COMP') {
          //kijken of ze subdoelstellingen hebben
          if (doelstellingen[m].subdoelstellingen && doelstellingen[m].subdoelstellingen.length >= 1) {
              //iteratie over eerste subs
              for (var y = 0; y < doelstellingen[m].subdoelstellingen.length; y++) {
                //kijk naar de id
                const lijst = doelstellingen[m].subdoelstellingen;
                if (lijst[y].id === Number(parentid)) {
                  //gelijkstellen en break;
                  parent = lijst[y];
                  break;
                }
  
                //niet gelijk maar check naar subs
  
                if (lijst[y].soort === 'COMP') {
                  if (lijst[y].subdoelstellingen && lijst[y].subdoelstellingen.length >= 1) {
                    for (var z = 0; z < lijst[y].subdoelstellingen.length; z++)  {
                      const lijst1 = lijst[y].subdoelstellingen;
                      
                      if (lijst1[z].id === Number(parentid)) {
                        //gelijkstellen en break;
                        parent = lijst1[z];
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
    pad.unshift(parent.naam);


    while (parent.parent_doelstelling.id !== null) {
      let x = parent;
      parent = doelstellingen.filter(e => e.id === Number(x.parent_doelstelling.id))[0];
      //console.log("parent", parent);
      if (parent === undefined) {
        //console.log("parent", test);
        for (var m = 0; m < doelstellingen.length; m++) {
          //top niveau doelstellingen overlopen
          if (doelstellingen[m].soort === 'COMP') {
            //kijken of ze subdoelstellingen hebben
            if (doelstellingen[m].subdoelstellingen && doelstellingen[m].subdoelstellingen.length >= 1) {
                //iteratie over eerste subs
                for (var y = 0; y < doelstellingen[m].subdoelstellingen.length; y++) {
                  //kijk naar de id
                  const lijst = doelstellingen[m].subdoelstellingen;
                  if (lijst[y].id === Number(parent.parent_doelstelling.id)) {
                    //gelijkstellen en break;
                    parent = lijst[y];
                    break;
                  }
    
                  //niet gelijk maar check naar subs
    
                  if (lijst[y].soort === 'COMP') {
                    if (lijst[y].subdoelstellingen && lijst[y].subdoelstellingen.length >= 1) {
                      for (var z = 0; z < lijst[y].subdoelstellingen.length; z++)  {
                        const lijst1 = lijst[y].subdoelstellingen;
                        
                        if (lijst1[z].id === Number(parent.parent_doelstelling.id)) {
                          //gelijkstellen en break;
                          parent = lijst1[z];
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

      //console.log("parent", parent);
      pad.unshift(parent.naam);
    }
  }

  //als laatste naam van huidige doelstelling plaatsen
  //pad.push(doelstelling.naam);
  console.log(doelstelling);

  //console.log("juiste pad", pad);

  return (

    <>
    {(doelstelling) &&
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
			to={`/categorieDashboard/${doelstelling.categorie.id}`}
      className="underline"
			>
			 {doelstelling.categorie.naam}
		</NavLink>
    
   {pad && pad.push(doelstelling.naam) && pad.map((p, index) =>  {
     let doel = doelstellingen.filter(e => e.naam === (p))[0];
     if (doel === undefined) {
       
       for (var m = 0; m < doelstellingen.length; m++) {
         //top niveau doelstellingen overlopen
         if (doelstellingen[m].soort === 'COMP') {
           //kijken of ze subdoelstellingen hebben
           if (doelstellingen[m].subdoelstellingen && doelstellingen[m].subdoelstellingen.length >= 1) {
               //iteratie over eerste subs
               for (var y = 0; y < doelstellingen[m].subdoelstellingen.length; y++) {
                 //kijk naar de id
                 const lijst = doelstellingen[m].subdoelstellingen;
                 if (lijst[y].naam === (p)) {
                   //gelijkstellen en break;
                   doel = lijst[y];
                   break;
                 }
   
                 //niet gelijk maar check naar subs
   
                 if (lijst[y].soort === 'COMP') {
                   if (lijst[y].subdoelstellingen && lijst[y].subdoelstellingen.length >= 1) {
                     for (var z = 0; z < lijst[y].subdoelstellingen.length; z++)  {
                       const lijst1 = lijst[y].subdoelstellingen;
                       
                       if (lijst1[z].naam === (p)) {
                         //gelijkstellen en break;
                         doel = lijst1[z];
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
     return <> &nbsp; -  &nbsp;
   { (p !== doelstelling.naam) ?
    <NavLink
			to={`/doelstellingDashboard/${doel.id}`}
      className="underline"
			>
			 {p}
		</NavLink>
   : p}
   </>})}
    </div>
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
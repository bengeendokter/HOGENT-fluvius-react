import { NavLink } from "react-router-dom";
import BarChart from "./BarChart";
import Doelstelling from './Doelstelling';

const AccordionCategory = (props) => {
  const {naam, id, doelstellingen, sdgs} = props;

  return (
    <>
      <div className="accordion-item bg-white border border-gray-200"
      >
        <h2 className="accordion-header mb-0
        border-2 border-[#004C69] bg-[#004C69] text-white text-left p-1 
        
        " id={`headingOne${id}`}>
          <button className="
            accordion-button
            relative
            flex
            items-center
            w-full
            py-4
            px-5
            text-base text-gray-800 text-left
            bg-white
            border-0
            rounded-none
            transition
            focus:outline-none
          
            border-2 border-[#004C69] bg-[#004C69] text-white text-left p-1 grid grid-cols-2
            w-full
          
            " type="button" data-bs-toggle="collapse" data-bs-target={`#collapseOne${id}`} aria-expanded="true"
            aria-controls={`collapseOne${id}`}>
              
            <span className="text-white">{naam}</span>
          </button>
          {sdgs.map(sdg => sdg.AFBEELDINGNAAM).filter((sdgNaam, index, array) => array.indexOf(sdgNaam) === index).map(sdgNaam => <img key={sdgNaam} src={`/assets/images/${sdgNaam}.jpg`} alt={`sdg ${sdgNaam}`} className="w-12 inline-block p-1"/>)}
        </h2>
        
        <div id={`collapseOne${id}`} className="accordion-collapse collapse show" aria-labelledby={`headingOne${id}`}>
          <div className="accordion-body py-4 px-5">
          <br />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {doelstellingen.map(d => <Doelstelling key={d.id} { ...d } ></Doelstelling>)}
        </div>
           

          
          
          </div>
        </div>
      </div>
    </>
  );
};
export default AccordionCategory;
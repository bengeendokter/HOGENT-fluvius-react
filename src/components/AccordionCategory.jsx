import { NavLink } from "react-router-dom";
import BarChart from "./BarChart";
import DoelstellingPreview from './DoelstellingPreview';
import {useCategories} from '../contexts/CategorieProvider';


const AccordionCategory = (props) => {
  const {naam, id, doelstellingen, sdgs} = props;
  const {setCurrent} = useCategories();
    const handleClick = () => {
        setCurrent({CATEGORIEID: id, NAAM: naam, sdgs, doelstellingen});
    };

  return (
    <>
      <div className="accordion-item bg-white  m-4"
      >
        <h2 className="accordion-header mb-0
         bg-[#004C69] text-white text-left 
        
        " id={`headingOne${id}`}>
          <div className="border-2 border-[#004C69] bg-[#004C69] text-white text-left p-1 grid grid-cols-2">
          <div>
          <NavLink key={id} to={`/categorieDashboard/${id}`}>
                <h2  onClick={handleClick} data-cy="categorieClick" className="text-xl hover:underline">{naam}</h2>
                </NavLink>
    
    </div>
          <div className="justify-self-end mr-2">
          {sdgs.map(sdg => sdg.AFBEELDINGNAAM).filter((sdgNaam, index, array) => array.indexOf(sdgNaam) === index).map(sdgNaam => <img key={sdgNaam} src={`/assets/images/${sdgNaam}.jpg`} alt={`sdg ${sdgNaam}`} className="w-12 inline-block p-1"/>)}
            
          </div>
          </div>
          {/* <span className="text-white text-xl">{naam}</span>
          {sdgs.map(sdg => sdg.AFBEELDINGNAAM).filter((sdgNaam, index, array) => array.indexOf(sdgNaam) === index).map(sdgNaam => <img key={sdgNaam} src={`/assets/images/${sdgNaam}.jpg`} alt={`sdg ${sdgNaam}`} className="w-12 inline-block p-1"/>)} */}
          <button className="
            accordion-button
            relative
            flex
            items-center
            w-full
            px-5
            text-base text-gray-800 text-left
            bg-[#F0F9FF]
            border-l-2
            border-r-2
            border-t-2
            border-b-0
            border-[#004C69]
            rounded-none
            transition
            focus:outline-none
          
            border-2 border-[#004C69] rounded-none bg-white text-white text-left p-1 grid grid-cols-2 rounded-none
            w-full
          
            " type="button" data-bs-toggle="collapse" data-bs-target={`#collapseOne${id}`} aria-expanded="true"
            aria-controls={`collapseOne${id}`} >
              
          </button>
          
        </h2>
        
        <div id={`collapseOne${id}`} className="accordion-collapse collapse show rounded-none" aria-labelledby={`headingOne${id}`}>
          <div className="accordion-body py-4 px-5 border-b-2 border-l-2 border-r-2 border-[#004C69]  rounded-none bg-[#F0F9FF]">
          <br />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {doelstellingen.map(d => <DoelstellingPreview key={d.id} { ...d }></DoelstellingPreview>)}
        </div>
           

          
          
          </div>
        </div>
      </div>
    </>
  );
};
export default AccordionCategory;
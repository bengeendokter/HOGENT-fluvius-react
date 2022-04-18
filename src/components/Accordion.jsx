import { NavLink } from "react-router-dom";
import BarChart from "./BarChart";

const Accordion = (props) => {
  const {naam, id, doelwaarde} = props;

  return (
    <>
      <div className="accordion-item bg-white border border-gray-200">
        <h2 className="accordion-header mb-0" id={`headingOne${id}`}>
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
          " type="button" data-bs-toggle="collapse" data-bs-target={`#collapseOne${id}`} aria-expanded="true"
            aria-controls={`collapseOne${id}`}>
            <span>{naam}</span>
          </button>
        </h2>
        <div id={`collapseOne${id}`} className="accordion-collapse collapse show" aria-labelledby={`headingOne${id}`}>
          <div className="accordion-body py-4 px-5">
          
          <NavLink
			  to={`/doelstellingDashboard/${id}`}>
           <span>{id}</span>   
        </NavLink>
        <br />
          <span>doelwaarde: {doelwaarde}</span>
          <BarChart></BarChart>  

          
          
          </div>
        </div>
      </div>
    </>
  );
};
export default Accordion;
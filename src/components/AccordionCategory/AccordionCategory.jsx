import {NavLink} from "react-router-dom";
import styles from './AccordionCategory.module.css';
import DoelstellingPreview from '../DoelstellingPreview';
import {useCategories} from '../../contexts/CategorieProvider';


export default function AccordionCategory({naam, id, doelstellingen, sdgs})
{
  const {setCurrent} = useCategories();
  const handleClick = () =>
  {
    setCurrent({CATEGORIEID: id, NAAM: naam, sdgs, doelstellingen});
  };

  return (
    <>
      <div className={["accordion-item", styles.item].join(" ")}>
        <div className={["accordion-header", styles.header].join(" ")} id={`headingOne${id}`}>
          <button
          className={["accordion-button flex", styles.button].join(" ")}
          type="button"
          data-bs-toggle="collapse"
          data-bs-target={`#collapseOne${id}`}
          aria-expanded="true"
          aria-controls={`collapseOne${id}`} >
          </button>
            {/* <div className="justify-self-end mr-2">
              {sdgs.map(sdg => sdg.AFBEELDINGNAAM).filter((sdgNaam, index, array) => array.indexOf(sdgNaam) === index).map(sdgNaam => <img key={sdgNaam} src={`/assets/images/${sdgNaam}.jpg`} alt={`sdg ${sdgNaam}`} className="w-12 inline-block p-1" />)}
            </div> */}
              <NavLink key={id} to={`/categorieDashboard/${id}`}>
                <h2
                className={styles.title}
                onClick={handleClick}
                data-cy="categorieClick"
                >{naam}</h2>
              </NavLink>
        </div>

        <div
        id={`collapseOne${id}`}
        className="accordion-collapse collapse show"
        aria-labelledby={`headingOne${id}`}>
          <div className={["accordion-body", styles.body].join(" ")}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {doelstellingen
              .sort(({naam: a}, {naam: b}) => a.localeCompare(b))
              .map(d => <DoelstellingPreview key={d.id} {...d}></DoelstellingPreview>)}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
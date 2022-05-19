import * as React from 'react';
import styles from './OverzichtWijzigen.module.css';
import {TemplateContext} from '../../contexts/TemplatesProvider';
import TemplateCategorieRol from '../../components/TemplateCategorieRol/TemplateCategorieRol';
import {useEffect, useContext, useState} from 'react';
import { DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import { useSession} from "../../contexts/AuthProvider";
import Alert from '@mui/material/Alert';

export default function OverzichtWijzigen() {
  const [selectedRol, setSelectedRol] = React.useState('');
  const {orderVoorTemplate, verander, rolNaam, getTemplatesMetCategorie, templatesMetCategorie, templatesRol, getAllTemplatesByRol, setRolNaam} = useContext(TemplateContext);
  const [temps, updateTemps] = useState([]);
  const {roles} = useSession();
  const [gelukt, setGelukt] = useState(0);

   function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(temps);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateTemps(items);

  }

  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: 'none',
    padding: 4 * 2,
    margin: `0 4px 0 0`,
    background: isDragging ? 'lightblue' : 'white',
    ...draggableStyle,
  });

  const save = () => {
      orderVoorTemplate(temps);
      setGelukt(1);
  };

  const reset = React.useCallback(() => {
    let newTemps = temps.sort(({category_id: a}, {category_id: b}) => a.localeCompare(b));
    newTemps.forEach((t, index) => t.order = index);
    updateTemps(newTemps);
    orderVoorTemplate(temps);
    setGelukt(1);
  }, [orderVoorTemplate, temps])

  useEffect(() =>
  {
    setRolNaam(roles);
    getAllTemplatesByRol();
    
  }, [getAllTemplatesByRol, setRolNaam, roles]);

 useEffect(() =>
  {
    if(templatesRol.length !== 0){
      getTemplatesMetCategorie(templatesRol);
      
    }
  }, [templatesRol, getTemplatesMetCategorie, verander]);

  useEffect(() => {
    if (templatesMetCategorie.some( t => t.order === null)) {
      updateTemps(templatesMetCategorie.filter(t => t.is_costumisable === 1).sort(({category_id: a}, {category_id: b}) => a.localeCompare(b)))
    } else {
      updateTemps(templatesMetCategorie.filter(t => t.is_costumisable === 1).sort((a, b) => a.order - b.order)); 
    }
  },[templatesMetCategorie]);

  if (!temps || (temps && temps.length === 0)) {
    return <div className={styles["noneLeft"]}>Er zijn geen categorieën om te personaliseren.</div>
  }

  return (
    <>
    <div className={styles["personalisation-all"]}>
      {gelukt === 1 &&<Alert severity="success" className={styles["categorie-title-personalisatie"]}>Wijzigingen zijn opgeslagen!</Alert>}
      <div className={styles["categorie-titles-personalisatie"]}>
        <p className={styles["categorie-title-personalisatie"]}>Template {roles}</p>
        <p className={styles["categorie-title-personalisatie"]}>Verander de volgorde van je categorieën!</p>
      </div>
      <div >
        {verander && rolNaam && temps &&
        <DragDropContext onDragEnd={handleOnDragEnd} >
          <Droppable droppableId="characters"  direction="horizontal">
            {(provided) => (
            <div className={styles["draggable-categorie-container"]} {...provided.droppableProps} ref={provided.innerRef}>
            {temps.map((element, index) => {
            return (
              <Draggable key={element.id} draggableId={element.id} index={index} >

              {(provided, snapshot) => (
                <div className={styles["dragCard"]} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={getItemStyle(
                  snapshot.isDragging,
                  provided.draggableProps.style
                )}>
                  <TemplateCategorieRol key={element.id} rolTemplate={selectedRol} isPersonalisatieScherm={true} {...element}/>
                </div>
              )}
            </Draggable>
            );
          })}
          {provided.placeholder}
        </div>)}
          </Droppable>
        </DragDropContext>}
          <div className={styles["saveButton-container"]}>
            <button onClick={reset} className={styles["resetButton"]}>
              Herstellen
            </button>
            <button onClick={save} className={styles["saveButton"]}>
              Opslaan
            </button>
          </div>
      </div>
    </div>
    <div className={styles["personalisation-none"]}>Het personaliseren van je categorieën kan alleen gebeuren op een groter scherm. Zoom uit of probeer opnieuw op een breder scherm.</div>
    </>
  );
}
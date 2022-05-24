import * as React from 'react';
import {useContext, useEffect, useState} from 'react';
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd';
import {useToasts} from 'react-toast-notifications';
import TemplateCategorieRol from '../../components/TemplateCategorieRol/TemplateCategorieRol';
import {useSession} from "../../contexts/AuthProvider";
import {TemplateContext} from '../../contexts/TemplatesProvider';
import styles from './OverzichtWijzigen.module.css';

export default function OverzichtWijzigen()
{
  const {orderVoorTemplate, verander, rolNaam, getTemplatesMetCategorie, templatesMetCategorie, templatesRol, getAllTemplatesByRol, setRolNaam} = useContext(TemplateContext);
  const [temps, updateTemps] = useState([]);
  const {roles} = useSession();
  const {addToast} = useToasts();

  useEffect(() =>
  {
    addToast("Wijzig de volgorde van de categorieën door de items te verslepen", {
      appearance: 'info',
      autoDismiss: true,
    })
  }, [addToast]);

  function handleOnDragEnd(result)
  {
    if(!result.destination) return;
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

  const save = () =>
  {
    orderVoorTemplate(temps);
    addToast("Wijzigingen zijn opgeslagen!", {
      appearance: 'success',
      autoDismiss: true,
    });
  };

  const reset = React.useCallback(() =>
  {
    let newTemps = temps.sort(({category_id: a}, {category_id: b}) => a.localeCompare(b));
    newTemps.forEach((t, index) => t.order = index);
    updateTemps(newTemps);
    orderVoorTemplate(temps);
    addToast("Wijzigingen zijn opgeslagen!", {
      appearance: 'success',
      autoDismiss: true,
    });
  }, [orderVoorTemplate, temps, addToast])

  useEffect(() =>
  {
    setRolNaam(roles);
    getAllTemplatesByRol();

  }, [getAllTemplatesByRol, setRolNaam, roles]);

  useEffect(() =>
  {
    if(templatesRol.length !== 0)
    {
      getTemplatesMetCategorie(templatesRol);

    }
  }, [templatesRol, getTemplatesMetCategorie, verander]);

  useEffect(() =>
  {
    if(templatesMetCategorie.some(t => t.order === null))
    {
      updateTemps(templatesMetCategorie.filter(t => t.is_visible === 1).sort(({category_id: a}, {category_id: b}) => a.localeCompare(b)))
    } else
    {
      updateTemps(templatesMetCategorie.filter(t => t.is_visible === 1).sort((a, b) => a.order - b.order));
    }
  }, [templatesMetCategorie]);

  if(!temps || (temps && temps.length === 0))
  {
    return <div className={styles["noneLeft"]}>Er zijn geen categorieën om te personaliseren.</div>
  }

  return (
    <>
      <div className={styles["personalisation-all"]}>
        <div className={styles["categorie-titles-personalisatie"]}>
          <p data-cy="naam_rol_template" className={styles["categorie-title-personalisatie"]}>Template {roles}</p>
        </div>
        <div >
          {verander && rolNaam && temps &&
            <DragDropContext onDragEnd={handleOnDragEnd} >
              <Droppable droppableId="characters" direction="horizontal">
                {(provided) => (
                  <div className={styles["draggable-categorie-container"]} {...provided.droppableProps} ref={provided.innerRef}>
                    {temps.map((element, index) =>
                    {
                      return (
                        <Draggable key={element.id} draggableId={element.id} index={index} >

                          {(provided, snapshot) => (
                            <div className={styles["dragCard"]} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps} style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}>
                              <TemplateCategorieRol key={element.id} isPersonalisatieScherm={true} {...element} />
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
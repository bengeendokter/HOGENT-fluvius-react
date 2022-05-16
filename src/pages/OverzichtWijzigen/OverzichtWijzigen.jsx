import * as React from 'react';
import styles from './OverzichtWijzigen.module.css';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import {RolContext} from '../../contexts/RolProvider';
import eye from "../../images/eye.jpg";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { grey } from '@mui/material/colors';
import {TemplateContext} from '../../contexts/TemplatesProvider';
import TemplateCategorieRol from '../../components/TemplateCategorieRol/TemplateCategorieRol';
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  useEffect, useContext, useState
} from 'react';
// BEAUTIFUL DRAG AND DROP
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { useSession, useAuth } from "../../contexts/AuthProvider";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};


function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function OverzichtWijzigen() {
  const theme = useTheme();
  const [selectedRol, setSelectedRol] = React.useState('');
  const {rollen} = useContext(RolContext);
  const {orderVoorTemplate, verander, rolNaam, createOrUpdateTemplate, getTemplatesMetCategorie, templatesMetCategorie, setTemplatesRol, templatesRol, getAllTemplatesByRol, setRolNaam, templates, setTemplateToUpdate, currentTemplate} = useContext(TemplateContext);
  const { id } = useParams();
  const [temps, updateTemps] = useState([]);
  const {roles} = useSession();
  let voerUit = true;

   // DRAG AND DROP
   function handleOnDragEnd(result) {
    if (!result.destination) return;
    const items = Array.from(temps);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    updateTemps(items);

  }

  const getListStyle = () => ({
    background: 'white',
    // TODO: scherm kleiner maken flex column
    display: 'flex',
    padding: 4,
    overflow: 'none',
  });

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: 'none',
    padding: 4 * 2,
    margin: `0 4px 0 0`,
  
    // change background colour if dragging
    background: isDragging ? 'lightblue' : 'white',
  
    // styles we need to apply on draggables
    ...draggableStyle,
  });


  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedRol(
      typeof value === 'string' ? value.split(',') : value,
    );
  };

  const saveOrder = React.useCallback(
    async (temp, index) => {
      try {
          await createOrUpdateTemplate({
           id: temp.id,
           category_id: temp.category_id,
           rol: selectedRol[0],
           is_visible: temp.is_visible,
           is_costumisable: temp.is_visible,
           order: index + 1,
          });
          
      } catch (error) {

        throw error;
      }
    },
    [
      selectedRol, createOrUpdateTemplate
    ]
  );

  const save = () => {
      orderVoorTemplate(temps);
      getAllTemplatesByRol();
      getTemplatesMetCategorie(templatesRol);
      getAllTemplatesByRol();
      getTemplatesMetCategorie(templatesRol);
  };

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
    updateTemps(templatesMetCategorie.sort((a, b) => a.order - b.order)); 
  },[templatesMetCategorie]);

  return (
    <>
    <div className={styles["personalisation-all"]}>
      <div className={styles["categorie-titles-personalisatie"]}>
        <p className={styles["categorie-title-personalisatie"]}>Template {roles}</p>
        <p className={styles["categorie-title-personalisatie"]}>Verander de volgorde van je categorieën!</p>
      </div>
      <div >
        {verander && rolNaam && temps &&
        <DragDropContext onDragEnd={handleOnDragEnd} >
          <Droppable droppableId="characters"  direction="horizontal">
            {(provided, snapshot) => (
            <div className={styles["draggable-categorie-container"]} {...provided.droppableProps} ref={provided.innerRef}>
            {temps.map((element, index) => {
            return (
              <Draggable key={element.id} draggableId={element.id} index={index}>
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

        <div className="flex justify-end mr-8">
          {
          <button onClick={save} className="xl:inline-block mt-2  block  m-3 text-white hover:text-white hover:bg-[#FF4512] bg-[#B8CE44]  p-2 rounded-xl text-white font-bold">
            Opslaan
          </button>
      }
        </div>
      </div>
    </div>
    <div className={styles["personalisation-none"]}>Het personaliseren van je categorieën kan alleen gebeuren op een grotere scherm. Zoom uit of probeer opnieuw op een bredere scherm.</div>
    </>
  );
}
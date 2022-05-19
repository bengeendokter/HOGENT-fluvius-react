import * as React from 'react';
import styles from './TemplateBeheren.module.css';
import {useTheme} from '@mui/material/styles';
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
import {grey} from '@mui/material/colors';
import {TemplateContext} from '../../contexts/TemplatesProvider';
import TemplateCategorieRol from '../../components/TemplateCategorieRol/TemplateCategorieRol';
import {Link, useParams, useNavigate} from "react-router-dom";
import
  {
    useEffect, useContext
  } from 'react';
import { useCategories } from '../../contexts/CategorieProvider';
import { useSession } from '../../contexts/AuthProvider';

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


function getStyles(name, personName, theme)
{
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function TemplateBeheren()
{
  const theme = useTheme();
  const [selectedRol, setSelectedRol] = React.useState('');
  const {rollen} = useContext(RolContext);
  const {roles} = useSession();
  const {verander, rolNaam, createOrUpdateTemplate, orderVoorTemplate, getTemplatesMetCategorie, templatesMetCategorie, setTemplatesRol, templatesRol, getAllTemplatesByRol, setRolNaam, templates, setTemplateToUpdate, currentTemplate} = useContext(TemplateContext);
  const {categories} = useCategories();
  const {id} = useParams();
  
  const handleChange = (event) =>
  {
    const {
      target: {value},
    } = event;
    setSelectedRol(
      typeof value === 'string' ? value.split(',') : value,
    );
  };



  const reset = React.useCallback(
    async () =>
    {
      try
      {
        if(selectedRol[0] !== undefined)
        {
         for (let m = 0; m < templatesMetCategorie.length; m++) {
          await createOrUpdateTemplate({
            id: templatesMetCategorie[m].id,
            category_id: templatesMetCategorie[m].category_id,
            rol: selectedRol[0],
            is_visible: 1,
            is_costumisable: (selectedRol[0] === "Stakeholder") ? 0 : 1,
            order: templatesMetCategorie[m].order
          });
          }

          getAllTemplatesByRol();
          getTemplatesMetCategorie(templatesRol);
        }


      } catch(error)
      {
        console.log(error);
        throw error;
      }
    },
    [
      createOrUpdateTemplate, selectedRol, getAllTemplatesByRol, getTemplatesMetCategorie, templatesRol
    ]
  );


  // const reset = () =>
  // {
  //   if(selectedRol[0] !== undefined)
  //   {
  //     console.log("goed goed", templatesMetCategorie);
  //     templatesMetCategorie.forEach(temp => reset1(temp));
  //     getAllTemplatesByRol();
  //     getTemplatesMetCategorie(templatesRol);

  //   }
  //   console.log("reset template voor geselecteerde rol");
  // };

  useEffect(() =>
  {
    if(selectedRol)
    {
      setRolNaam(selectedRol[0]);
      getAllTemplatesByRol();
    }
  }, [selectedRol, getAllTemplatesByRol, setRolNaam, verander]);

  useEffect(() =>
  {
    if(templatesRol.length !== 0)
    {
      getTemplatesMetCategorie(templatesRol);
    }
  }, [templatesRol, getTemplatesMetCategorie, verander]);

  return (
    <>
      <div className={styles["beheren-header"]}>

          <FormControl className={styles["beheren-header-select"]}>
            <InputLabel id="demo-simple-select-label">Rol</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedRol}
              label="Age"
              onChange={handleChange}
            >
              {rollen.map((rol) => (
                <MenuItem
                  key={rol.NAAM}
                  value={rol.NAAM}
                  style={getStyles(rol.NAAM, selectedRol, theme)}
                >
                  {rol.NAAM}
                </MenuItem>))}
            </Select>
          </FormControl>
          <button onClick={reset} className={styles["beheren-header-button"]}>
            Herstel standaard weergave
          </button>

      </div>
      <div>

        {verander && rolNaam && selectedRol && 
          <>
            <div className={styles["categorie-title"]}>
              Weergave {selectedRol}
            </div>

            <div className={styles["categorie-container"]}>
              {templatesMetCategorie.map(r => 
                <TemplateCategorieRol key={r.id} {...r} rolTemplate={selectedRol} isPersonalisatieScherm={false} />)
              }
            </div>
          </>
        }

      </div>

    </>
  );
}
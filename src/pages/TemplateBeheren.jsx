import * as React from 'react';
import {useTheme} from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import {RolContext} from '../contexts/RolProvider';
import eye from "../images/eye.jpg";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {grey} from '@mui/material/colors';
import {TemplateContext} from '../contexts/TemplatesProvider';
import TemplateCategorieRol from '../components/TemplateCategorieRol';
import {Link, useParams, useNavigate} from "react-router-dom";
import
  {
    useEffect, useContext
  } from 'react';

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
  const {verander, rolNaam, createOrUpdateTemplate, getTemplatesMetCategorie, templatesMetCategorie, setTemplatesRol, templatesRol, getAllTemplatesByRol, setRolNaam, templates, setTemplateToUpdate, currentTemplate} = useContext(TemplateContext);
  const {id} = useParams();

  //TODO:
  //-personaliseerbaar V
  //-overzicht rollen en categories
  //-useeffect bij verandering template V
  //-order categories (horizontal... gebruiken)
  //-reset template V
  //-reset 2 keer klikken oplossen
  //-seeds niet gebruiken -> zelf aanmaken indien het niet bestaat in de databank
  //-bug fixen (wijziging niet opslaan -> blijft zo bij reset)

  // useEffect(() => {
  //   if(selectedRol){
  //     setTemplateToUpdate(selectedRol[0]);
  //   }
  // }, [selectedRol, setTemplateToUpdate]);

  // useEffect(() => {
  //   if(selectedRol){
  //     console.log("current", currentTemplate);
  //   }
  // }, [selectedRol, currentTemplate]);





  /*useEffect(() =>
  {
    if(templatesRol.length !== 0){
      console.log("templ rol", templatesRol);
      getTemplatesMetCategorie(templatesRol);
    }
  }, [templatesRol, getTemplatesMetCategorie]);*/

  /*useEffect(() =>
  {
      console.log("templ met cat rol", templatesMetCategorie);
  }, [templatesMetCategorie]); */


  const handleChange = (event) =>
  {
    const {
      target: {value},
    } = event;
    setSelectedRol(
      typeof value === 'string' ? value.split(',') : value,
    );
    // console.log("sel", selectedRol);
    // setRolNaam(selectedRol);
    // getAllTemplatesByRol();
    // console.log("test", templatesRol);
    // aan de hand van de geselecteerde rol --> categorieën opvragen --> ook visibility weergeven
  };

  const onClick = () =>
  {
    console.log("onclick verander visibility");
  };

  const reset1 = React.useCallback(
    async (temp) =>
    {
      //console.log(temp);
      try
      {
        //is_visible: 1, is_costumisable: 1 (andere rollen)
        //is_visible: 1, is_costumisable: 0 (Stakeholder)

        await createOrUpdateTemplate({
          id: temp.id,
          category_id: temp.category_id,
          rol: selectedRol[0],
          is_visible: 1,
          is_costumisable: (selectedRol[0] === "Stakeholder") ? 0 : 1,
          order: temp.order
        });

      } catch(error)
      {

        throw error;
      }
    },
    [
      createOrUpdateTemplate, selectedRol
    ]
  );


  const reset = () =>
  {
    if(selectedRol[0] !== undefined)
    {
      console.log("goed goed", templatesMetCategorie);
      templatesMetCategorie.forEach(temp => reset1(temp));
      getAllTemplatesByRol();
      getTemplatesMetCategorie(templatesRol);

    }
    console.log("reset template voor geselecteerde rol");
  };

  /*useEffect(() =>
  {
    console.log("ait");
  }, [reset]);*/

  /*const save = () => {
    console.log("save template voor geselecteerde rol");
  };*/

  useEffect(() =>
  {
    if(selectedRol)
    {
      setRolNaam(selectedRol[0]);
      getAllTemplatesByRol();
      //console.log("Done1");
    }
  }, [selectedRol, getAllTemplatesByRol, setRolNaam, verander]);

  useEffect(() =>
  {
    if(templatesRol.length !== 0)
    {
      //console.log("templ rol", templatesRol);
      getTemplatesMetCategorie(templatesRol);
      //console.log("test", templatesMetCategorie);
    }
  }, [templatesRol, getTemplatesMetCategorie, verander]);

  const css = `
  .categorie_container
  {
    display: flex;
    justify-content: space-around;
  }

  .categorie_rol
  {
    width: 320px;
  }
      `

  return (
    <>
      <div className="flex justify-center mt-5">
        <div>

          <FormControl sx={{m: 1, width: 300}}>
            <InputLabel id="demo-simple-select-label">rol</InputLabel>
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
        </div>

      </div>
      <div>

        <p className="font-bold text-xl ml-10 mb-10 text-[#004C69]">Weergave {selectedRol}</p>
        <style>
          {css}
        </style>

        <div className="categorie_container">
          {verander && rolNaam && selectedRol && templatesMetCategorie.map(r => <TemplateCategorieRol key={r.id} {...r} rolTemplate={selectedRol} ></TemplateCategorieRol>)}

        </div><div className="flex justify-end mr-8">
          <button onClick={reset} className="xl:inline-block mt-2  block  m-3 text-white hover:text-white hover:bg-[#FF4512] bg-[#B8CE44]  p-2 rounded-xl text-white font-bold">
          Herstel standaard weergave
          </button>
          {/*
        <div onClick={save} className="xl:inline-block mt-2  block  m-3 text-white hover:text-white hover:bg-[#FF4512] bg-[#B8CE44]  p-2 rounded-xl text-white font-bold">
          Opslaan
        </div>
    */}
        </div>
      </div>

    </>
  );
}
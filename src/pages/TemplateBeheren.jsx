
import * as React from 'react';
import { useTheme } from '@mui/material/styles';
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
import { grey } from '@mui/material/colors';
import {TemplateContext} from '../contexts/TemplatesProvider';
import TemplateCategorieRol from '../components/TemplateCategorieRol';
import {
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


function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function TemplateBeheren() {
  const theme = useTheme();
  const [selectedRol, setSelectedRol] = React.useState('');
  const {rollen} = useContext(RolContext);
  const {templatesRol, getAllTemplatesByRol, setRolNaam, templates} = useContext(TemplateContext);

  useEffect(() =>
  {
    //setSelectedRol('MVO Coördinator');
    // setRolNaam(selectedRol);
    // getAllTemplatesByRol();
    // console.log("test", templatesRol);
    // categorieën opvragen voor de MVO Coördinator --> visibility ook weergeven
  }, [setSelectedRol, setRolNaam, getAllTemplatesByRol]);


  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    setSelectedRol(
      typeof value === 'string' ? value.split(',') : value,
    );
    console.log("sel", selectedRol);
    setRolNaam(selectedRol);
    getAllTemplatesByRol();
    console.log("test", templatesRol);
    // aan de hand van de geselecteerde rol --> categorieën opvragen --> ook visibility weergeven
  };

  const onClick = () => {
    console.log("onclick verander visibility");
  };

  const reset = () => {
    console.log("reset template voor geselecteerde rol");
  };

  const save = () => {
    console.log("save template voor geselecteerde rol");
  };


  return (
    <>
    <div className="flex justify-center mt-5">
      <div>

      <FormControl sx={{ m: 1, width: 300 }}>
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
      <p className="font-bold text-xl ml-10 mb-10 text-[#004C69]">Template {selectedRol}</p>
      {templatesRol.map(r => <TemplateCategorieRol key={r.id} { ...r }  ></TemplateCategorieRol>)}
      <div className="flex justify-end mr-8">
        <div onClick={reset} className="xl:inline-block mt-2  block  m-3 text-teal-200 hover:text-white hover:bg-[#FF4512] bg-[#B8CE44]  p-2 rounded-xl text-white font-bold">
          Reset template
        </div>
        <div onClick={save} className="xl:inline-block mt-2  block  m-3 text-teal-200 hover:text-white hover:bg-[#FF4512] bg-[#B8CE44]  p-2 rounded-xl text-white font-bold">
          Opslaan
        </div>
      </div>
    </div>

    </>
  );
}
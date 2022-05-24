import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import {useTheme} from '@mui/material/styles';
import * as React from 'react';
import {useContext, useEffect} from 'react';
import {useToasts} from 'react-toast-notifications';
import TemplateCategorieRol from '../../components/TemplateCategorieRol/TemplateCategorieRol';
import {RolContext} from '../../contexts/RolProvider';
import {TemplateContext} from '../../contexts/TemplatesProvider';
import styles from './TemplateBeheren.module.css';

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
  const [selectedRol, setSelectedRol] = React.useState('MVO Coördinator');
  const {rollen} = useContext(RolContext);
  const {verander, rolNaam, createOrUpdateTemplate, getTemplatesMetCategorie, templatesMetCategorie, templatesRol, getAllTemplatesByRol, setRolNaam} = useContext(TemplateContext);
  const {addToast} = useToasts();
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
          for(let m = 0; m < templatesMetCategorie.length; m++)
          {
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
        addToast("Wijzigingen zijn opgeslagen!", {
          appearance: 'success',
          autoDismiss: true,
        });
      } catch(error)
      {
        throw error;
      }
    },
    [
      createOrUpdateTemplate, selectedRol, getAllTemplatesByRol, getTemplatesMetCategorie, templatesRol, templatesMetCategorie, addToast
    ]
  );

  useEffect(() =>
  {
    if(selectedRol)
    {
      setRolNaam(selectedRol);
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
            data-cy="template_select"
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
          Herstel standaardweergave
        </button>
      </div>
      <div>
        {verander && rolNaam && selectedRol &&
          <>
            <div data-cy="template_weergave" className={styles["categorie-title"]}> Weergave {selectedRol}</div>
            <div className={styles["categorie-container"]}>
              {templatesMetCategorie.map(r => <TemplateCategorieRol key={r.id} {...r} rolTemplate={selectedRol} isPersonalisatieScherm={false} />)}
            </div>
          </>
        }
      </div>
    </>
  );
}
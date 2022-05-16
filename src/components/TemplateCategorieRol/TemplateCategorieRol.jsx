import styles from './TemplateCategorieRol.module.css';
import { NavLink } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { grey } from '@mui/material/colors';
import { useCategories } from "../../contexts/CategorieProvider";
import {
  useEffect, useContext, useCallback, useState
} from 'react';
import {TemplateContext} from '../../contexts/TemplatesProvider';

import Alert from '@mui/material/Alert';

//customisable
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import EditOffIcon from '@mui/icons-material/EditOff';

export default function TemplateCategorieRol(r) {
  
  let {id, is_visible, rol, icon, category_id, is_costumisable, rolTemplate } = r;
  //console.log("dit is een template voor de rol: ", rolTemplate[0]);

  const {currentCategorie, setCatId, getCategorieByID} = useCategories();
  const {setTemplateToUpdate, createOrUpdateTemplate, currentTemplate} = useContext(TemplateContext);
  const [visible, setVisible] = useState(is_visible);
  const [verander, setVerander] = useState(0);
  const [gelukt, setGelukt] = useState(0);
  //customisable
  const [customisable, setCustomisable] = useState(0);



  const handleClick = useCallback(async (data) => {
    try {
      setVerander(1);
      if (visible === 1) {
        await createOrUpdateTemplate({
          id: id,
          category_id: category_id,
          rol: rolTemplate[0],
          is_visible: 0,
          is_costumisable: customisable,
        });
        setVisible(0);
      } else {
        await createOrUpdateTemplate({
          id: id,
          category_id: category_id,
          rol: rolTemplate[0],
          is_visible: 1,
          is_costumisable: customisable,
        });
        setVisible(1);
      }
      setGelukt(1);
    } catch (error) {
      setGelukt(0);
      console.error(error);
    }
  }, [visible, customisable, category_id, createOrUpdateTemplate, id, rolTemplate]);

  const handleClickCustom = useCallback(async (data) => {
    try {
      if (customisable === 1) {
        await createOrUpdateTemplate({
          id: id,
          category_id: category_id,
          rol: rolTemplate[0],
          is_visible: visible,
          is_costumisable: 0,
        });
        setCustomisable(0);
      } else {
        await createOrUpdateTemplate({
          id: id,
          category_id: category_id,
          rol: rolTemplate[0],
          is_visible: visible,
          is_costumisable: 1,
        });
        setCustomisable(1);
      }
      setGelukt(1);
    } catch (error) {
      setGelukt(0);
      console.error(error);
    }
  }, [visible, customisable, category_id, rolTemplate, createOrUpdateTemplate, id]);

  useEffect(() =>
  {
    setVisible(is_visible);
    //stakeholders krijgen niet de optie hun dashboard te personaliseren
    if (rolTemplate[0] === "Stakeholder") {
      setCustomisable(0);
    } else {
      setCustomisable(is_costumisable);
    }
    
  }, [is_visible, is_costumisable, rolTemplate]);


  return (
    <>
    {r &&
      <div className={styles["card"]}>
        <img className={styles["card-img"]} src={`/assets${icon.substring(8)}`}  alt="icon"/>
        <div className={styles["card-info"]}>
          <div className={styles["card-title"]}>{category_id}</div>
          <div className={styles["card-buttons"]}>
            {visible === 1?
              <div onClick={handleClick} className={styles["card-button-green"]}>
                <VisibilityIcon sx={{ color: grey[900] }} />
              </div>
              :
              <div onClick={handleClick} className={styles["card-button-red"]}>
                <VisibilityOffIcon sx={{ color: grey[900] }} />
              </div>
            }
            {(rolTemplate[0] !== "Stakeholder") &&
              <>
                {customisable === 1?
                  <div onClick={handleClickCustom} className={styles["card-button-green"]}>
                    <ModeEditIcon sx={{ color: grey[900] }} />
                  </div>
                  :
                  <div onClick={handleClickCustom} className={styles["card-button-red"]}>
                    <EditOffIcon sx={{ color: grey[900] }} />
                  </div>
                }
              </>
            }
          </div>
        </div>
        {verander === 1 && gelukt === 1 &&
          <Alert severity="success">Wijzigingen zijn opgeslagen!</Alert>
        }
        {verander === 1 && gelukt === 0 &&
          <Alert severity="error">This is an error alert — check it out!</Alert>
        }
      </div>
    }
        
    </>
  );
}
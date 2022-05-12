import { NavLink } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { grey } from '@mui/material/colors';
import { useCategories } from "../contexts/CategorieProvider";
import {
  useEffect, useContext, useCallback, useState
} from 'react';
import {TemplateContext} from '../contexts/TemplatesProvider';

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
  }, [visible, customisable]);

  // const onClickCustom = () => {
  //   if(customisable === parseInt(1)){
  //     setCustomisable(0);
  //   }else{
  //     setCustomisable(1);
  //   }
    
  // };

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
  }, [visible, customisable]);

  useEffect(() =>
  {
    setVisible(is_visible);
    //stakeholders krijgen niet de optie hun dashboard te personaliseren
    if (rolTemplate[0] === "Stakeholder") {
      setCustomisable(0);
    } else {
      setCustomisable(is_costumisable);
    }
    
  }, [is_visible, is_costumisable], rolTemplate[0]);


  return (
    <>
    {r &&

    <div class="categorie_rol max-w-sm rounded overflow-hidden shadow-lg">
  <img className="w-full inline-block p-1" src={`/assets${icon.substring(8)}`}  alt="icon"/>
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">{category_id}</div>
    <p class="text-gray-700 text-base">
    {visible === 1 ? <><VisibilityIcon sx={{ color: grey[900] }} onClick={handleClick} /></>: <><VisibilityOffIcon sx={{ color: grey[900] }} onClick={handleClick} /> </>}
    </p>
    {(rolTemplate[0] !== "Stakeholder") &&
    <p class="text-gray-700 text-base">
      {customisable === 1 ? <><ModeEditIcon sx={{ color: grey[900] }} onClick={handleClickCustom} /></>: <><EditOffIcon sx={{ color: grey[900] }} onClick={handleClickCustom} /> </>}
    </p>}
    {/* <button onClick={onClick2} class="mt-4 bg-[#004C69] hover:bg-white text-white font-semibold hover:text-[#004C69] py-2 px-4 border border-[#004C69] hover:border-transparent rounded">
  Opslaan
</button> */}
  </div>
  <div class="px-6 flex">
    
    
  </div>
  {verander == 1 && gelukt == 1 ? (
  <Alert severity="success">Wijzigingen zijn opgeslagen!</Alert>) : (<></>)
}
{verander == 1 && gelukt == 0 ? (
  <Alert severity="error">This is an error alert — check it out!</Alert>
  ) : (<></>)
}

</div>
}
        
    </>
  );
}
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
  const [visible, setVisible] = useState(0);
  const [verander, setVerander] = useState(0);
  const [gelukt, setGelukt] = useState(0);
  //customisable
  const [customisable, setCustomisable] = useState(0);

  const onClick = () => {
    if(visible === parseInt(1)){
      setVisible(0);
    }else{
      setVisible(1);
    }
    
  };

  const onClickCustom = () => {
    if(customisable === parseInt(1)){
      setCustomisable(0);
    }else{
      setCustomisable(1);
    }
    
  };

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

  
  /*useEffect(() =>
  {
    setVisible(is_visible);
    setCustomisable(is_costumisable);
  }, [is_visible, is_costumisable]);*/

 

  const onClick2 = useCallback(
    async (data) => {
      try {
        setVerander(1);
          await createOrUpdateTemplate({
            id: id,
            category_id: category_id,
            rol: rolTemplate[0],
            is_visible: visible,
            is_costumisable: customisable,
          });
          
      
       setGelukt(1);
      
      } catch (error) {
        setGelukt(0);
        throw error;
      }
    },
    [
      createOrUpdateTemplate,
      visible,
      customisable
    ]
  );

  return (
    <>
    {r &&

    <div class="max-w-sm rounded overflow-hidden shadow-lg">
  <img className="w-full inline-block p-1" src={`/assets${icon.substring(8)}`}  alt="icon"/>
  <div class="px-6 py-4">
    <div class="font-bold text-xl mb-2">{category_id}</div>
    <p class="text-gray-700 text-base">
    {visible === 1 ? <><VisibilityIcon sx={{ color: grey[900] }} onClick={onClick} /></>: <><VisibilityOffIcon sx={{ color: grey[900] }} onClick={onClick} /> </>}
    </p>
    {(rolTemplate[0] !== "Stakeholder") &&
    <p class="text-gray-700 text-base">
      {customisable === 1 ? <><ModeEditIcon sx={{ color: grey[900] }} onClick={onClickCustom} /></>: <><EditOffIcon sx={{ color: grey[900] }} onClick={onClickCustom} /> </>}
    </p>}
    {/*<button onClick={onClick2} class="mt-4 bg-[#004C69] hover:bg-white text-white font-semibold hover:text-[#004C69] py-2 px-4 border border-[#004C69] hover:border-transparent rounded">
  Opslaan
    </button>*/}
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
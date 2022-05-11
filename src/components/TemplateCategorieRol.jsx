import {NavLink} from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {grey} from '@mui/material/colors';
import {useCategories} from "../contexts/CategorieProvider";
import
  {
    useEffect, useContext, useCallback
  } from 'react';
import {TemplateContext} from '../contexts/TemplatesProvider';





export default function TemplateCategorieRol(r)
{
  console.log("r", r);
  let {id, category_id, rol, is_visible} = r;
  const {currentCategorie, setCatId, getCategorieByID} = useCategories();
  const {setTemplateToUpdate, createOrUpdateTemplate, currentTemplate} = useContext(TemplateContext);
  // met state werken! is_visible en setIs_visible! dan zo aanpassen en dan createOrUpdate doen, geen current!
  let test = 0;
  // useEffect(() =>
  // {
  //   setCatId(category_id);
  //   getCategorieByID();
  // }, [setCatId, getCategorieByID,category_id]);

  // console.log("current cat", currentCategorie);

  useEffect(() =>
  {
    console.log("id,", id);
    setTemplateToUpdate(id);
  }, [setTemplateToUpdate, id]);

  useEffect(() =>
  {
    if(currentTemplate)
    {
      console.log("onclick verander visibility", currentTemplate);
    }
  }, [currentTemplate]);

  // const onClick = () => {
  //   if(is_visible == 1){
  //               console.log(is_visible);
  //               is_visible = 0;
  //               console.log(is_visible);
  //             }else{
  //               is_visible = 1;
  //             }
  //             test = 1;
  // };

  // useEffect(() => {
  //   setTemplateToUpdate(id);
  // },[onClick]);

  const onClick = useCallback(
    async (data) =>
    {
      try
      {
        //await setTemplateToUpdate(id);
        if(currentTemplate)
        {
          if(is_visible == 1)
          {
            console.log(is_visible);
            is_visible = 0;
            console.log(is_visible);
          } else
          {
            is_visible = 1;
          }
          console.log("current", currentTemplate);
          await createOrUpdateTemplate({
            id: currentTemplate.id,
            category_id: currentTemplate.category_id,
            rol: currentTemplate.rol,
            is_visible: is_visible,
          });
          //setTemplateToUpdate(null);
          console.log("call");
        }
      } catch(error)
      {
        throw error;
      }
    },
    [
      currentTemplate,
      createOrUpdateTemplate,
      setTemplateToUpdate
    ]
  );

  return (
    <>
      {r &&
        <div className="ml-10 grid grid-cols-2 bg-[#055063] p-3 mr-10 mb-4">
          <div className="text-white">
            {category_id}
            {/* test */}
          </div>
          <div className="justify-self-end" >
            {is_visible == 1 ? <><VisibilityIcon sx={{color: grey[50]}} onClick={onClick} /></> : <><VisibilityOffIcon sx={{color: grey[50]}} onClick={onClick} /> </>}

          </div>
        </div>
      }

    </>
  );
}
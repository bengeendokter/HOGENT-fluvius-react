import { NavLink } from "react-router-dom";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { grey } from '@mui/material/colors';
import { useCategories } from "../contexts/CategorieProvider";
import {
  useEffect, useContext
} from 'react';

const onClick = () => {
  console.log("onclick verander visibility");
};



export default function TemplateCategorieRol(r) {
  const {category_id, rol, is_visible } = r;
  const {currentCategorie, setCatId, getCategorieByID} = useCategories();

  useEffect(() =>
  {
    setCatId(category_id);
    getCategorieByID();
  }, [setCatId, getCategorieByID,category_id]);

  console.log(currentCategorie);

  return (
    <>
    <div className="ml-10 grid grid-cols-2 bg-[#004C69] p-3 mr-10 mb-4">
        <div className="text-white">
          {/* {currentCategorie.NAAM} */}
          test
        </div>
        <div className="justify-self-end" >
          {is_visible == 1 ? <><VisibilityIcon sx={{ color: grey[50] }} onClick={onClick} /></>: <><VisibilityOffIcon sx={{ color: grey[50] }} onClick={onClick} /> </>}
        
        </div>
        {rol}
        {is_visible}
      </div>

        
    </>
  );
}
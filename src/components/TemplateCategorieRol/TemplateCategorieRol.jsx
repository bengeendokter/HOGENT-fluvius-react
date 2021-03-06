import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import {useCallback, useContext, useEffect, useState} from 'react';
import {useToasts} from 'react-toast-notifications';
import {TemplateContext} from '../../contexts/TemplatesProvider';
import styles from './TemplateCategorieRol.module.css';



export default function TemplateCategorieRol({isPersonalisatieScherm, ...r})
{
  const {id, is_visible, icon, category_id, is_costumisable, rolTemplate} = r;
  const {createOrUpdateTemplate} = useContext(TemplateContext);
  const [visible, setVisible] = useState(is_visible);
  const {addToast} = useToasts();

  const handleClick = useCallback(async () =>
  {
    try
    {
      if(visible === 1)
      {
        await createOrUpdateTemplate({
          id: id,
          category_id: category_id,
          rol: rolTemplate[0],
          is_visible: 0,
          is_costumisable: is_costumisable,
        });
        setVisible(0);
      } else
      {
        await createOrUpdateTemplate({
          id: id,
          category_id: category_id,
          rol: rolTemplate[0],
          is_visible: 1,
          is_costumisable: is_costumisable,
        });
        setVisible(1);
      }
      addToast("Wijzigingen zijn opgeslagen!", {
        appearance: 'success',
        autoDismiss: true,
      });
    } catch(error)
    {
      console.error(error);
      addToast("Oops, er is iets misgegaan. Het is niet mogelijk om alle categorieën onzichtbaar te maken.", {
        appearance: 'error',
        autoDismiss: true,
      });
    }
  }, [visible, is_costumisable, category_id, createOrUpdateTemplate, id, rolTemplate, addToast]);

  useEffect(() =>
  {
    setVisible(is_visible);

  }, [is_visible]);

  return (
    <>
      {r &&
        <>
          {!isPersonalisatieScherm ?
            <div data-cy="template_rol" className={styles["card"]}>
              <img className={styles["card-img"]} src={`/assets${icon.substring(8)}`} alt="icon" />
              <div className={styles["card-info"]}>
                <div className={styles["card-title"]}>{category_id}</div>
                {!isPersonalisatieScherm &&
                  <div data-cy="oog" className={styles["card-buttons"]}>
                    {visible === 1 ?
                      <div onClick={handleClick} className={styles["card-button-green"]}>
                        <VisibilityIcon />
                      </div>
                      :
                      <div onClick={handleClick} className={styles["card-button-red"]}>
                        <VisibilityOffIcon />
                      </div>
                    }
                  </div>
                }
              </div>
              {/* {!isPersonalisatieScherm && 
          <>
            {verander === 1 && gelukt === 1 &&
              <Alert severity="success">Wijzigingen zijn opgeslagen!</Alert>
            }
            {verander === 1 && gelukt === 0 &&
              <Alert severity="error">Oops, er is iets misgegaan.</Alert>
            }
          </>
        } */}
            </div>
            :
            <>
              <img className={styles["card-img"]} src={`/assets${icon.substring(8)}`} alt="icon" />
              <div className={styles["card-info"]}>
                <div className={styles["card-title"]}>
                  {category_id}
                </div>
              </div>
            </>
          }
        </>
      }
    </>
  );
}
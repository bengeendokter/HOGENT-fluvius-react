import
  {
    createContext,
    useState,
    useEffect,
    useCallback,
  } from 'react';

import * as templatesApi from "../api/template";
import * as categoriesApi from "../api/categories";
import { useSession } from './AuthProvider';
import { useCategories } from './CategorieProvider';

export const TemplateContext = createContext();

export const TemplatesProvider = ({
  children
}) =>
{
  const [initialLoad, setInitialLoad] = useState(false);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [rolNaam, setRolNaam] = useState("");
  const [currentTemplate, setCurrentTemplate] = useState({test: 0});
  const [templates, setTemplates] = useState([]);
  const [templatesRol, setTemplatesRol] = useState([]);
  const [templatesMetCategorie, setTemplatesMetCategorie] = useState([]);
  const {categories} = useCategories();
  const {roles} = useSession();

  const [verander, setVerander] = useState(false);

  const { ready : authReady } = useSession();

  const refreshTemplates = useCallback(async () =>
  {
    try
    {
      setError('');
      setLoading(true);
      const data = await templatesApi.getAllTemplates();

      setTemplates(data.data)

      return true;
    } catch(error)
    {
      setError(error);
      return false;
    } finally
    {
      setLoading(false)
    }

  }, []);

  useEffect(() =>
  {
    if(authReady && !initialLoad)
    {
      refreshTemplates();
      setInitialLoad(true);
    }
  }, [authReady, initialLoad, refreshTemplates]);


  const getAllTemplatesByRol = useCallback(async () =>
  {
    try
    {
      setError('');
      setLoading(true);
      if(rolNaam)
      {
        const data = await templatesApi.getAllTemplatesByRol(rolNaam);
        if (data.length === 0) {
          if (categories && categories.length > 0) {
            const templatesToCreate = categories.map(c => ({
              category_id : c.CATEGORIEID,
              rol : rolNaam,
              is_visible : 1,
              is_costumisable: 1,
              order: null
            }))
            await orderVoorTemplate(templatesToCreate, false);

            const data2 = await templatesApi.getAllTemplatesByRol(rolNaam);

            setTemplatesRol(data2)
            return data2;
        }
      } else {
        setTemplatesRol(data);
        return data;
      }
        return null;
      }

    } catch(error)
    {
      setError(error);
      return null;
    } finally
    {
      setLoading(false)
    }

  }, [rolNaam, categories]);

  const getTemplatesMetCategorie = useCallback(async (templatesRol) =>
  {
    try
    {
      setError('');
      setLoading(true);
      let newTemplatesMetCategorie = [];
      for(const temp of templatesRol)
      {
        const newCat = await categoriesApi.getCategorieByID(temp.category_id);
        newTemplatesMetCategorie.push({order: temp.order, id: temp.id, category_id: newCat[0].NAAM, is_visible: temp.is_visible, icon: newCat[0].ICON, is_costumisable: temp.is_costumisable});
      }
      setTemplatesMetCategorie(newTemplatesMetCategorie);

      setVerander(true);
      
      return newTemplatesMetCategorie;
    } catch(error)
    {
      setError(error);
      return null;
    } finally
    {
      setLoading(false)
    }

  }, []);

  const createOrUpdateTemplate = useCallback(async ({
    id,
    category_id,
    rol,
    is_visible,
    is_costumisable,
    order
  }) =>
  {
    setError();
    setLoading(true);

    try
    {
      const arr = templatesMetCategorie.filter(el => el.is_visible === 0);
      if((arr.length === templatesMetCategorie.length - 1) && is_visible === 0){
        throw error;
      } else{

      
      const changedTemplate = await templatesApi.save({
        id,
        category_id,
        rol,
        is_visible,
        is_costumisable,
        order
      });
      await refreshTemplates();
      return changedTemplate;
    }
    } catch(error)
    {
      throw error;

    } finally
    {
      setLoading(false)
    }
  }, [refreshTemplates, templatesMetCategorie, error]);

  const orderVoorTemplate = useCallback(async (orderTemplates, zetIndexAlsOrder = true
  ) =>
  {
    setError();
    setLoading(true);
    try
    {
      if (zetIndexAlsOrder) {
        orderTemplates.forEach((temp, index) => {
          temp.order = index;
        });
      }
      await templatesApi.saveAlles(orderTemplates);
      await getAllTemplatesByRol();
      await getTemplatesMetCategorie(templatesRol)
      await refreshTemplates();
      return true;
    } catch(error)
    {
      return false;

    } finally
    {
      setLoading(false)
    }
  }, [getAllTemplatesByRol, getTemplatesMetCategorie, templatesRol, refreshTemplates]);

  const deleteTemplate = useCallback(async (id) =>
  {
    setLoading(true);
    setError();
    try
    {
      await templatesApi.deleteTemplate(id);
      refreshTemplates();
    } catch(error)
    {
      throw error;
    } finally
    {
      setLoading(false)
    }
  }, [refreshTemplates]);

  useEffect(() => {
    if (categories && categories.length > 0) {
      if (templates.length === 0 || !templates.some(d => d.rol === roles)) {
        const templatesToCreate = categories.map(c => ({
          category_id : c.CATEGORIEID,
          rol : roles,
          is_visible : 1,
          is_costumisable: 1,
          order: null
        }))
  
        orderVoorTemplate(templatesToCreate, false);
      }
    }
  }, [roles, categories, templates])

  const setTemplateToUpdate = useCallback(
    (id) =>
    {
      setCurrentTemplate(
        id === null ? {} : templates.find((t) => t.id === id.toString())
      );
    },
    [templates]
  );

  useEffect(() => {
    if(templatesRol) {
      getAllTemplatesByRol();
      getTemplatesMetCategorie(templatesRol)
    }
  }, [templates,getAllTemplatesByRol,getTemplatesMetCategorie, templatesRol])


  return (
    <TemplateContext.Provider value={{orderVoorTemplate, verander, rolNaam, templatesMetCategorie, getTemplatesMetCategorie, setTemplates, setTemplatesRol, templatesRol, deleteTemplate, currentTemplate, setTemplateToUpdate, createOrUpdateTemplate, setRolNaam, refreshTemplates, getAllTemplatesByRol, templates, error, setError, loading, setLoading}}>
      {children}
    </TemplateContext.Provider>
  );
};
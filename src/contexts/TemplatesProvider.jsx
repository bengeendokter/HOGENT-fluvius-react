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

  //test
  const [verander, setVerander] = useState(false);

  const { ready : authReady } = useSession();

  const refreshTemplates = useCallback(async () =>
  {
    try
    {
      setError('');
      setLoading(true);
      const data = await templatesApi.getAllTemplates();
      setTemplates(data.data);
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
      // TODO aanpassen naar rolNaam!!!
      //console.log(rolNaam);
      if(rolNaam)
      {
        const data = await templatesApi.getAllTemplatesByRol(rolNaam);
        setTemplatesRol(data);
        //console.log("date rol", data);
        return data;
      }

    } catch(error)
    {
      setError(error);
      return null;
    } finally
    {
      setLoading(false)
    }

  }, [rolNaam]);

  const getTemplatesMetCategorie = useCallback(async (templatesRol) =>
  {
    try
    {
      setError('');
      setLoading(true);
      let newTemplatesMetCategorie = [];
      //console.log("dikke miserie", templatesRol);
      for(const temp of templatesRol)
      {
        //console.log("temp", temp);
        const newCat = await categoriesApi.getCategorieByID(temp.category_id);
        //console.log("newcat NAAM", newCat[0].NAAM);
        //newTemplatesMetCategorie.push({id: temp.id, category_id: newCat[0].NAAM, is_visible: temp.is_visible, icon: newCat[0].ICON});
        newTemplatesMetCategorie.push({order: temp.order, id: temp.id, category_id: newCat[0].NAAM, is_visible: temp.is_visible, icon: newCat[0].ICON, is_costumisable: temp.is_costumisable});
      }
      //console.log("miserie", newTemplatesMetCategorie);
      //newTemplatesMetCategorie.sort((a, b) => a.order - b.order);
      setTemplatesMetCategorie(newTemplatesMetCategorie);
      //test
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

  }, [templates]);

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
    } catch(error)
    {
      throw error;

    } finally
    {
      setLoading(false)
    }
  }, [refreshTemplates]);

  const orderVoorTemplate = useCallback(async (orderTemplates
  ) =>
  {
    setError();
    setLoading(true);
    //templatesMetCategorie veranderen met orderTemplates
    //de orde is de volgorde van de array orderTemplates

    try
    {
      //setTemplatesMetCategorie(orderTemplates);
      orderTemplates.forEach((temp, index) => {
        temp.order = index;
        createOrUpdateTemplate(temp)
      });
      await refreshTemplates();
      return true;
    } catch(error)
    {
      throw error;

    } finally
    {
      setLoading(false)
    }
  }, [refreshTemplates, createOrUpdateTemplate]);

  const deleteTemplate = useCallback(async (id) =>
  {
    setLoading(true);
    setError();
    try
    {
      //console.log("delete");
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

  // const setTemplateToUpdate = useCallback(
  //   (naam) =>
  //   {
  //     setCurrentTemplate(
  //       naam === null ? {} : templates.find((t) => t.rol === naam)
  //     );
  //   },
  //   [templates]
  // );

  const setTemplateToUpdate = useCallback(
    (id) =>
    {
      setCurrentTemplate(
        id === null ? {} : templates.find((t) => t.id === id.toString())
      );
    },
    [templates]
  );



  return (
    <TemplateContext.Provider value={{orderVoorTemplate, verander, rolNaam, templatesMetCategorie, getTemplatesMetCategorie, setTemplates, setTemplatesRol, templatesRol, deleteTemplate, currentTemplate, setTemplateToUpdate, createOrUpdateTemplate, setRolNaam, refreshTemplates, getAllTemplatesByRol, templates, error, setError, loading, setLoading}}>
      {children}
    </TemplateContext.Provider>
  );
};
import {
  createContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

import * as templatesApi from "../api/template";
//import { useSession } from './AuthProvider';

export const TemplateContext = createContext();



export const TemplatesProvider = ({
  children
}) => {
  const [initialLoad, setInitialLoad] = useState(false);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [rolNaam, setRolNaam] = useState("");
  const [templates, setTemplates] = useState([]);
  const [templatesRol, setTemplatesRol] = useState([]);

  //const { ready : authReady } = useSession();

  const refreshTemplates = useCallback(async () => {
    try {
      setError('');
      setLoading(true);
      const data = await templatesApi.getAllTemplates();
      setTemplates(data.data);
      return true;
    } catch (error) {
      setError(error);
      return false;
    } finally {
      setLoading(false)
    }

  }, []);

  useEffect(() => {
    if (/*authReady && */!initialLoad) {
      refreshTemplates();
      setInitialLoad(true);
    }
  }, [/*authReady, */initialLoad, refreshTemplates]);



  const getAllTemplatesByRol = useCallback(async () => {
    try {
      setError('');
      setLoading(true);
      // TODO aanpassen naar rolNaam!!!
      const data = await templatesApi.getAllTemplatesByRol("Manager");
      setTemplatesRol(data);
      console.log("date rol", data);
      return data;
    } catch (error) {
      setError(error);
      return null;
    } finally {
      setLoading(false)
    }

  }, [rolNaam]);



  return (
    <TemplateContext.Provider value={{ setTemplates,templatesRol, setRolNaam, refreshTemplates, getAllTemplatesByRol, templates, error, setError, loading, setLoading}}>
      {children}
    </TemplateContext.Provider>
  );
};
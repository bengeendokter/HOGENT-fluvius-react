import {
    createContext,
    useState,
    useEffect,
    useCallback,
  } from 'react';

  import * as datasourceApi from "../api/datasources";
  import { useSession } from './AuthProvider';

  export const DatasourceContext = createContext();

  export const DatasourceProvider = ({
    children
  }) => {
    const [initialLoad, setInitialLoad] = useState(false);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [datasources, setDatasources] = useState([]);
    
    
    const { ready : authReady } = useSession();

    const refreshDatasources = useCallback(async () => {
      try {
        setError('');
        setLoading(true);
        const data = await datasourceApi.getAllDatasources();
        setDatasources(data.data);
        return true;
      } catch (error) {
        setError(error);
        return false;
      } finally {
        setLoading(false)
      }

    }, []);

    const updateDatasource = useCallback(async (
      id
    ) =>
    {
      setError();
      setLoading(true);
  
      try
      {
        const data = await datasourceApi.updateDatasource({
          id,
          CORRUPT: 1,
        });
        await refreshDatasources();
        return data;
      } catch(error)
      {
        throw error;
  
      } finally
      {
        setLoading(false)
      }
    }, [refreshDatasources]);

    useEffect(() => {
      if (authReady && !initialLoad) {
        refreshDatasources();
        setInitialLoad(true);
      }
    }, [authReady, initialLoad, refreshDatasources]);

  
    return (
      <DatasourceContext.Provider value={{refreshDatasources, updateDatasource, datasources, error, setError, loading, setLoading}}>
        {children}
      </DatasourceContext.Provider>
    );
  };
import {
  createContext,
  useState,
  useEffect,
  useCallback,
} from 'react';

import * as rolApi from "../api/rollen";
import { useSession } from './AuthProvider';

export const RolContext = createContext();



export const RolProvider = ({
  children
}) => {
  const [initialLoad, setInitialLoad] = useState(false);

  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [rollen, setRollen] = useState([]);

  

  const { ready : authReady } = useSession();

  const refreshRollen = useCallback(async () => {
    try {
      setError('');
      setLoading(true);
      const data = await rolApi.getAllRollen();
      setRollen(data.data);
      return true;
    } catch (error) {
      setError(error);
      return false;
    } finally {
      setLoading(false)
    }

  }, []);

  useEffect(() => {
    if (authReady && !initialLoad) {
      refreshRollen();
      setInitialLoad(true);
    }
  }, [authReady, initialLoad, refreshRollen]);




  return (
    <RolContext.Provider value={{ refreshRollen,  rollen, error, setError, loading, setLoading}}>
      {children}
    </RolContext.Provider>
  );
};
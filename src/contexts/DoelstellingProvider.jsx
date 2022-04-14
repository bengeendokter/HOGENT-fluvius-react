import {
    createContext,
    useState,
    useEffect,
    useCallback,
    useContext,
    useMemo
  } from 'react';

  import * as doelstellingApi from "../api/doelstellingen";
//import { useSession } from './AuthProvider';

  export const DoelstellingContext = createContext();
  export const useDoelstellingen = () => useContext(DoelstellingContext);

  export const DoelstellingProvider = ({
    children
  }) => {
    const [initialLoad, setInitialLoad] = useState(false);
    //const [currentGame, setCurrentGame] = useState({});
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [doelstellingen, setDoelstellingen] = useState([]);

    //const { ready : authReady } = useSession();

    const refreshDoelstellingen = useCallback(async () => {
      try {
        setError('');
        setLoading(true);
        const data = await doelstellingApi.getAllDoelstellingen();
        setDoelstellingen(data.data);
        console.log(doelstellingen)
        return true;
      } catch (error) {
        setError(error);
        return false;
      } finally {
        setLoading(false)
      }

    }, [doelstellingen]);

    useEffect(() => {
      if (/*authReady && */!initialLoad) {
        refreshDoelstellingen();
        setInitialLoad(true);
      }
    }, [/*authReady, */initialLoad, refreshDoelstellingen]);

    const getDoelstellingByID = useCallback(async () => {
      try {
        setError('');
        setLoading(true);
        const data = await doelstellingApi.getDoelstellingByID();
        return data.data ?? null
      } catch (error) {
        setError(error);
        return null;
      } finally {
        setLoading(false)
      }

    }, []);

    const value = useMemo(() => ({
      refreshDoelstellingen,
      //currentGame,
      //setCurrentGame,
      doelstellingen,
      error,
      setError,
      loading,
      setLoading,
    }), [refreshDoelstellingen, doelstellingen, error, setError, loading, setLoading])

    return (
      <DoelstellingContext.Provider value={value}>
        {children}
      </DoelstellingContext.Provider>
    );
  };
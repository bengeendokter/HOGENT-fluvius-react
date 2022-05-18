import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo,
} from 'react';

import * as dataApi from "../api/data";
import { useSession } from './AuthProvider';

export const DataContext = createContext();
export const useData = () => useContext(DataContext);


export const DataProvider = ({
  children
}) => {
  const [initialLoad, setInitialLoad] = useState(false);
  //const [currentGame, setCurrentGame] = useState({});
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [alldata, setAllData] = useState([]);

  const { ready : authReady } = useSession();

  const refreshData = useCallback(async () => {
    try {
      setError('');
      setLoading(true);
      const data = await dataApi.getAllData();
      setData(data.data);
      return true;
    } catch (error) {
      setError(error);
      return false;
    } finally {
      setLoading(false)
    }

  }, []);


  const getDataByDoelstellingId = useCallback(async (id) => {
      try {
        setError('');
        setLoading(true);
        const data = await dataApi.getDataByDoelstellingId(id);
        return data.data[0];
      } catch (error) {
        setError(error);
        return null;
      } finally {
        setLoading(false)
      }
    }, []);

    const getDataByDoelstellingIdAndYear = useCallback(async (id, jaar) => {
      try {
        setError('');
        setLoading(true);
        const data = await dataApi.getDataByDoelstellingIdAndYear(id, jaar);
        return data.data;
      } catch (error) {
        setError(error);
        return null;
      } finally {
        setLoading(false)
      }
    }, []);

    const getAllDataByDoelstellingId = useCallback(async (id) => {
      try {
        setError('');
        setLoading(true);
        const data = await dataApi.getAllDataByDoelstellingId(id);
        setAllData(data);
        return data;
      } catch (error) {
        setError(error);
        return null;
      } finally {
        setLoading(false)
      }
    }, []);

    useEffect(() => {
      if (authReady && !initialLoad) {
        refreshData();

        /* 
        Testen of alle methodes werken \/

        const wow = async () => {
          console.log("Data by doelstellingID: ", await getDataByDoelstellingId(8));
          console.log("Data doelstelling op id en jaar: ", await getDataByDoelstellingIdAndYear(8, 2022));
          console.log("Alle data van doelstelling: ", await getAllDataByDoelstellingId(8));
        }

        wow();
        */
        setInitialLoad(true);
      }
    }, [authReady, initialLoad, refreshData/*, getDataByDoelstellingId,getDataByDoelstellingIdAndYear,getAllDataByDoelstellingId*/]);


   const value = useMemo(() => ({
     refreshData,
     getDataByDoelstellingId,
     getDataByDoelstellingIdAndYear,
     getAllDataByDoelstellingId,
     //currentGame,
     //setCurrentGame,
     data,
     error,
     setError,
     loading,
     setLoading,
     alldata
   }), [alldata, refreshData,getDataByDoelstellingId, getDataByDoelstellingIdAndYear, getAllDataByDoelstellingId, data, error, setError, loading, setLoading])

  return (
    <DataContext.Provider value={value}>
      {children}
    </DataContext.Provider>
  );
};
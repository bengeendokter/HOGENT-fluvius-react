import {
  createContext,
  useState,
  useEffect,
  useCallback,
  useContext,
  useMemo
} from 'react';

import * as categoriesApi from "../api/categories";
//import { useSession } from './AuthProvider';

export const CategorieContext = createContext();
export const useCategories = () => useContext(CategorieContext);

export const CategorieProvider = ({
  children
}) => {
  const [initialLoad, setInitialLoad] = useState(false);
  //const [currentGame, setCurrentGame] = useState({});
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  //const { ready : authReady } = useSession();

  const refreshCategories = useCallback(async () => {
    try {
      setError('');
      setLoading(true);
      const data = await categoriesApi.getAllCategories();
      setCategories(data.data);
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
      refreshCategories();
      setInitialLoad(true);
    }
  }, [/*authReady, */initialLoad, refreshCategories]);

  

  const value = useMemo(() => ({
    refreshCategories,
    //currentGame,
    //setCurrentGame,
    categories,
    error,
    setError,
    loading,
    setLoading,
  }), [refreshCategories, categories, error, setError, loading, setLoading])

  return (
    <CategorieContext.Provider value={value}>
      {children}
    </CategorieContext.Provider>
  );
};
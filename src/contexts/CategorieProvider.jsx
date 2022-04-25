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
  const [currentCategorie, setCurrentCategorie] = useState({test:0});
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  //const { ready : authReady } = useSession();

  const refreshCategories = useCallback(async () => {
    try {
      setError('');
      setLoading(true);
      const data = await categoriesApi.getAllCategories();
      // const categorieMetProps = {...data.data, }
      setCategories(data.data);
      // console.log(categories);
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

  
  const setCategorieToUpdate = useCallback(
    (id) => {
      console.log("api id", id);
      console.log("cats", categories);
      setCurrentCategorie(
        id === null ? {} : categories.find((t) => t.CATEGORIEID === parseInt(id))
      );
    },
    [categories]
  );

  const setCurrent = useCallback(
    (categorie) => {

      setCurrentCategorie(
        categorie === null ? {} : categorie
      );
    },
    [categories]
  );


  const value = useMemo(() => ({
    refreshCategories,
    currentCategorie,
    setCategorieToUpdate,
    setCurrent,
    categories,
    error,
    setError,
    loading,
    setLoading,
  }), [refreshCategories, categories, setCurrent, currentCategorie, setCategorieToUpdate, error, setError, loading, setLoading])

  return (
    <CategorieContext.Provider value={value}>
      {children}
    </CategorieContext.Provider>
  );
};
import
{
  createContext, useCallback,
  useContext, useEffect, useMemo, useState
} from 'react';
import * as categoriesApi from "../api/categories";
import {useSession} from './AuthProvider';


export const CategorieContext = createContext();
export const useCategories = () => useContext(CategorieContext);

export const CategorieProvider = ({
  children
}) =>
{
  const [initialLoad, setInitialLoad] = useState(false);
  const [currentCategorie, setCurrentCategorie] = useState({test: 0});
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [catId, setCatId] = useState(0);

  const {ready: authReady} = useSession();

  const refreshCategories = useCallback(async () =>
  {
    try
    {
      setError('');
      setLoading(true);
      const data = await categoriesApi.getAllCategories();
      setCategories(data.data);
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
      refreshCategories();
      setInitialLoad(true);
    }
  }, [authReady, initialLoad, refreshCategories]);


  const setCategorieToUpdate = useCallback(
    (id) =>
    {
      setCurrentCategorie(
        id === null ? {} : categories.find((t) => t.CATEGORIEID === parseInt(id))
      );
    },
    [categories]
  );

  const setCurrent = useCallback(
    (categorie) =>
    {

      setCurrentCategorie(
        categorie === null ? {} : categorie
      );
    },
    []
  );

  const getCategorieByID = useCallback(async () =>
  {
    try
    {
      setError('');
      setLoading(true);
      const data = await categoriesApi.getCategorieByID(catId);
      setCurrentCategorie(data);
      return data;
    } catch(error)
    {
      setError(error);
      return null;
    } finally
    {
      setLoading(false)
    }

  }, [catId]);


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
    getCategorieByID,
    setCatId
  }), [refreshCategories, categories, setCurrent, currentCategorie, setCategorieToUpdate, error, setError, loading, setLoading, getCategorieByID, setCatId])

  return (
    <CategorieContext.Provider value={value}>
      {children}
    </CategorieContext.Provider>
  );
};
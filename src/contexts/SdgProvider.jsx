import
{
  createContext, useCallback, useEffect, useState
} from 'react';
import * as sdgApi from "../api/sdgs";
import {useSession} from './AuthProvider';


export const SdgContext = createContext();



export const SdgProvider = ({
  children
}) =>
{
  const [initialLoad, setInitialLoad] = useState(false);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [catId1, setCatId1] = useState(0);
  const [sdgs, setSdgs] = useState([]);
  const [sdgsCat, setSdgsCat] = useState([]);

  const [categories, setCategories] = useState([]);
  const [categoriesMetSdgs, setCategoriesMetSdgs] = useState([]);

  const {ready: authReady} = useSession();

  const refreshSdgs = useCallback(async () =>
  {
    try
    {
      setError('');
      setLoading(true);
      const data = await sdgApi.getAllSdgs();
      setSdgs(data.data);
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
      refreshSdgs();
      setInitialLoad(true);
    }
  }, [authReady, initialLoad, refreshSdgs]);


  const getSdgsByCategorieId = useCallback(async () =>
  {
    try
    {
      setError('');
      setLoading(true);
      const data = await sdgApi.getSdgsByCategorieId(catId1);
      setSdgsCat(data);
      return data;
    } catch(error)
    {
      setError(error);
      return null;
    } finally
    {
      setLoading(false)
    }

  }, [catId1]);

  const getSdgsVoorCategories = useCallback(async () =>
  {
    try
    {
      setError('');
      setLoading(true);
      let newCategoriesMetSdgs = [];

      for(const categorie of categories)
      {
        const newSdgs = await sdgApi.getSdgsByCategorieId(categorie.CATEGORIEID);
        newCategoriesMetSdgs.push({id: categorie.CATEGORIEID, naam: categorie.NAAM, sdgs: newSdgs, doelstellingen: categorie.doelstellingen});
      }

      setCategoriesMetSdgs(newCategoriesMetSdgs);
      return newCategoriesMetSdgs;
    } catch(error)
    {
      setError(error);
      return null;
    } finally
    {
      setLoading(false)
    }

  }, [categories]);

  return (
    <SdgContext.Provider value={{getSdgsVoorCategories, categoriesMetSdgs, setCategories, sdgsCat, setCatId1, refreshSdgs, getSdgsByCategorieId, sdgs, error, setError, loading, setLoading}}>
      {children}
    </SdgContext.Provider>
  );
};
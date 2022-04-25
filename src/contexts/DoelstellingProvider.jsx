import {
    createContext,
    useState,
    useEffect,
    useCallback,
  } from 'react';

  import * as doelstellingApi from "../api/doelstellingen";
//import { useSession } from './AuthProvider';

  export const DoelstellingContext = createContext();
  // export const useDoelstellingen = () => useContext(DoelstellingContext);
  

  export const DoelstellingProvider = ({
    children
  }) => {
    const [initialLoad, setInitialLoad] = useState(false);
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const [catId, setCatId] = useState(0);
    const [doelstellingen, setDoelstellingen] = useState([]);
    const [doelstellingenCat, setDoelstellingenCat] = useState([]);
    
    
    const [categories, setCategories] = useState([]);
    const [categoriesMetDoelstellingen, setCategoriesMetDoelstellingen] = useState([]);
    //const { ready : authReady } = useSession();

    const refreshDoelstellingen = useCallback(async () => {
      try {
        setError('');
        setLoading(true);
        const data = await doelstellingApi.getAllDoelstellingen();
        setDoelstellingen(data.data);
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
        refreshDoelstellingen();
        setInitialLoad(true);
      }
    }, [/*authReady, */initialLoad, refreshDoelstellingen]);

    const getDoelstellingPerRolByID = useCallback(async () => {
      try {
        setError('');
        setLoading(true);
        const data = await doelstellingApi.getDoelstellingPerRolByID();
        return data.data ?? null
      } catch (error) {
        setError(error);
        return null;
      } finally {
        setLoading(false)
      }

    }, []);

    const getDoelstellingByCategorieID = useCallback(async () => {
      try {
        setError('');
        setLoading(true);
        
        console.log(catId);
        const data = await doelstellingApi.getDoelstellingByCategorieID(catId);
        setDoelstellingenCat(data);
        // console.log("doelst cat", data);
        return data;
      } catch (error) {
        setError(error);
        return null;
      } finally {
        setLoading(false)
      }

    }, [catId]);

    const getDoelstellingenVoorCategories = useCallback(async () => {
      try {
        setError('');
        setLoading(true);
        let newCategoriesMetDoelstellingen = [];
 
        for(const categorie of categories)
        {
          const newDoelstellingen = await doelstellingApi.getDoelstellingByCategorieID(categorie.id);
          newCategoriesMetDoelstellingen.push({id: categorie.id, naam: categorie.naam, sdgs: categorie.sdgs, doelstellingen: newDoelstellingen});
        }

        setCategoriesMetDoelstellingen(newCategoriesMetDoelstellingen);
        return newCategoriesMetDoelstellingen;
      } catch (error) {
        setError(error);
        return null;
      } finally {
        setLoading(false)
      }

    }, [categories]);

    // const value = useMemo(() => ({
    //   refreshDoelstellingen,
    //   getDoelstellingPerRolByID,
    //   getDoelstellingByCategorieID,
    //   //currentGame,
    //   //setCurrentGame,
    //   doelstellingen,
    //   error,
    //   setCatId,
    //   setError,
    //   loading,
    //   setLoading,
      
    // }), [setCatId, refreshDoelstellingen, getDoelstellingPerRolByID,getDoelstellingByCategorieID, doelstellingen, error, setError, loading, setLoading])

    return (
      <DoelstellingContext.Provider value={{getDoelstellingenVoorCategories, setCategories, categoriesMetDoelstellingen, doelstellingenCat, setCatId, refreshDoelstellingen, getDoelstellingPerRolByID,getDoelstellingByCategorieID, doelstellingen, error, setError, loading, setLoading}}>
        {children}
      </DoelstellingContext.Provider>
    );
  };
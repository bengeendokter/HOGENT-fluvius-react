import
{
  createContext, useCallback, useEffect, useState
} from 'react';
import * as doelstellingApi from "../api/doelstellingen";
import {useSession} from './AuthProvider';


export const DoelstellingContext = createContext();



export const DoelstellingProvider = ({
  children
}) =>
{
  const [initialLoad, setInitialLoad] = useState(false);
  const [error, setError] = useState();
  const [loading, setLoading] = useState(false);
  const [catId, setCatId] = useState(0);
  const [doelstellingen, setDoelstellingen] = useState([]);
  const [doelstellingenCat, setDoelstellingenCat] = useState([]);
  const [currentDoel, setCurrentDoel] = useState({});
  const [pad, setPad] = useState([]);


  const [categories, setCategories] = useState([]);
  const [categoriesMetDoelstellingen, setCategoriesMetDoelstellingen] = useState([]);
  const {ready: authReady} = useSession();

  const refreshDoelstellingen = useCallback(async () =>
  {
    try
    {
      setError('');
      setLoading(true);
      const data = await doelstellingApi.getAllDoelstellingen();
      setDoelstellingen(data.data);
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
      refreshDoelstellingen();
      setInitialLoad(true);
    }
  }, [authReady, initialLoad, refreshDoelstellingen]);

  const getDoelstellingPerRolByID = useCallback(async () =>
  {
    try
    {
      setError('');
      setLoading(true);
      const data = await doelstellingApi.getDoelstellingPerRolByID();
      return data.data ?? null
    } catch(error)
    {
      setError(error);
      return null;
    } finally
    {
      setLoading(false)
    }

  }, []);

  const getDoelstellingByCategorieID = useCallback(async () =>
  {
    try
    {
      setError('');
      setLoading(true);
      const data = await doelstellingApi.getDoelstellingByCategorieID(catId);
      setDoelstellingenCat(data);
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

  const getDoelstellingenVoorCategories = useCallback(async () =>
  {
    try
    {
      setError('');
      setLoading(true);
      let newCategoriesMetDoelstellingen = [];

      for(const categorie of categories)
      {
        const newDoelstellingen = await doelstellingApi.getDoelstellingByCategorieID(categorie.id);
        newCategoriesMetDoelstellingen.push({id: categorie.id, naam: categorie.naam, sdgs: categorie.sdgs, doelstellingen: newDoelstellingen, order: categorie.order});
      }

      setCategoriesMetDoelstellingen(newCategoriesMetDoelstellingen);
      return newCategoriesMetDoelstellingen;
    } catch(error)
    {
      setError(error);
      return null;
    } finally
    {
      setLoading(false)
    }

  }, [categories]);

  const getSubWithID = useCallback(async (ID) =>
  {
    try
    {
      setError('');
      setLoading(true);

      for(var m = 0; m < doelstellingen.length; m++)
      {
        //top niveau doelstellingen overlopen
        if(doelstellingen[m].soort === 'COMP')
        {
          //kijken of ze subdoelstellingen hebben
          if(doelstellingen[m].subdoelstellingen && doelstellingen[m].subdoelstellingen.length >= 1)
          {
            //iteratie over eerste subs
            for(var y = 0; y < doelstellingen[m].subdoelstellingen.length; y++)
            {
              //kijk naar de id
              const lijst = doelstellingen[m].subdoelstellingen;
              if(lijst[y].id === Number(ID))
              {
                //gelijkstellen en break;
                return lijst[y];
              }

              //niet gelijk maar check naar subs

              if(lijst[y].soort === 'COMP')
              {
                if(lijst[y].subdoelstellingen && lijst[y].subdoelstellingen.length >= 1)
                {
                  for(var z = 0; z < lijst[y].subdoelstellingen.length; z++)
                  {
                    const lijst1 = lijst[y].subdoelstellingen;

                    if(lijst1[z].id === Number(ID))
                    {
                      //gelijkstellen en break;
                      return lijst1[z];
                    }

                  }
                }
              }


            }
          }
        }
        //next doelstelling
      }
      return null;
    } catch(error)
    {
      setError(error);
      return null;
    } finally
    {
      setLoading(false)
    }

  }, [doelstellingen]);

  const setCurrentDoelstelling = useCallback(async (id) =>
  {
    try
    {
      setError('');
      setLoading(true);
      let doelstelling = doelstellingen.filter(e => e.id === Number(id))[0];

      if(doelstelling === undefined)
      {
        doelstelling = await getSubWithID(id);
      }

      setCurrentDoel(doelstelling);

      let pad1 = [];

      if(doelstelling && doelstelling.parent_doelstelling.id !== null)
      {
        const parentid = doelstelling.parent_doelstelling.id;

        //alle parents steken in de array
        let parent = doelstellingen.filter(e => e.id === Number(parentid))[0];
        if(parent === undefined)
        {
          parent = await getSubWithID(parentid);
        }

        pad1.unshift(parent);

        while(parent.parent_doelstelling.id !== null)
        {
          let x = parent;
          parent = doelstellingen.filter(e => e.id === Number(x.parent_doelstelling.id))[0];

          if(parent === undefined)
          {

            parent = await getSubWithID(parentid);
          }


          pad1.unshift(parent);
        }

      }
      pad1.push(doelstelling);
      setPad(pad1);

      return true;
    } catch(error)
    {
      setError(error);
      return false;
    } finally
    {
      setLoading(false)
    }

  }, [doelstellingen, getSubWithID]);

  return (
    <DoelstellingContext.Provider value={{setPad, pad, currentDoel, setCurrentDoelstelling, getSubWithID, getDoelstellingenVoorCategories, setCategories, categoriesMetDoelstellingen, doelstellingenCat, setCatId, refreshDoelstellingen, getDoelstellingPerRolByID, getDoelstellingByCategorieID, doelstellingen, error, setError, loading, setLoading}}>
      {children}
    </DoelstellingContext.Provider>
  );
};
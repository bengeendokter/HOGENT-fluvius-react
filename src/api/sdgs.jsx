import {axios} from '.';

export const getAllSdgs = async () => {
    const { data } = await axios.get("sdgs");
    return data;
};

export const getSdgsByCategorieId = async (     
    id,
) => {
    const { data } = await axios({
        method : "get",
        url : `sdgs/categorie/${id}`
    });
      return data;
};


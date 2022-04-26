import {axios} from '.';

export const getAllCategories = async () => {
    const { data } = await axios.get("categories");
    return data;
};

export const getCategorieByID = async (     
    id,
) => {
    const { data } = await axios({
        method : "get",
        url : `categories/${id}`
    });
      return data;
};


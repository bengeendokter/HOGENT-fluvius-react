import {axios} from '.';

export const getAllCategories = async () => {
    const { data } = await axios.get("categories");
    return data;
};


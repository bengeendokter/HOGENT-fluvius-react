import {axios} from '.';

export const getAllDoelstellingen = async () => {
    const { data } = await axios.get("doelstellingen");
    return data;
};

export const getDoelstellingByID = async ({      
    id,
}) => {
    const { data } = await axios({
        method : "get",
        url : `doelstellingen/${id}`
    });
      return data;
};
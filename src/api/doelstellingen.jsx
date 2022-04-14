import {axios} from '.';

export const getAllDoelstellingen = async () => {
    const { data } = await axios.get("doelstellingen");
    return data;
};

export const getDoelstellingPerRolByID = async ({      
    id,
}) => {
    const { data } = await axios({
        method : "get",
        url : `doelstellingen/rol/${id}`
    });
      return data;
};
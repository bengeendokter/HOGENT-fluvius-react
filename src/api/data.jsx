import {axios} from '.';

export const getAllData = async () => {
    const { data } = await axios.get("data");
    return data;
};

export const getDataByDoelstellingId = async (id) => {
    const { data } = await axios({
        method : "get",
        url : `data/doelstelling/${id}`
    });
      return data;
}

export const getDataByDoelstellingIdAndYear = async (id, jaar) => {
    const { data } = await axios({
        method : "get",
        url : `data/doelstelling/${id}/${jaar}`
    });
      return data;
}

export const getAllDataByDoelstellingId = async (id) => {
    const { data } = await axios({
        method : "get",
        url : `data/all/doelstelling/${id}`
    });
      return data;
}
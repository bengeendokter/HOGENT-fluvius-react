import {axios} from '.';

export const getAllRollen = async () => {
    const { data } = await axios.get("rollen");
    return data;
};


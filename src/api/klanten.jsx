import { axios } from ".";

export const login = async (email, password) => {
  const { data } = await axios.post(`klanten/login`, {
    email,
    password,
  });
  return data;
};

export const register = async ({ naam, achternaam, email, password }) => {
  const { data } = await axios.post(`klanten/register`, {
    naam,
    achternaam,
    email,
    password,
  });
  return data;
};

export const getKlantById = async (id) => {
  const { data } = await axios.get(`klanten/${id}`);
  return data;
};

export const getBoekById = async (id) => {
  const { data } = await axios.get(`klanten/${id}`);
  return data;
};

export const getAllKlanten = async () => {
  const { data } = await axios.get("klanten", {
    params: {
      limit: 25,
      offset: 0,
    },
  });
  return data;
};

export const saveKlant = async ({ id, naam, achternaam, email }) => {
  const { data } = await axios({
    method: "put",
    url: `klanten/${id}`,
    data: {
      naam,
      achternaam,
      email,
    },
  });
  return data;
};

export const deleteKlant = async (id) => {
  await axios.delete(`klanten/${id}`);
};

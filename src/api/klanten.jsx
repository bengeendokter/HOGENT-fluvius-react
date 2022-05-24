import {axios} from ".";

export const login = async (gebruikersnaam, wachtwoord) =>
{
  const {data} = await axios.post(`users/login`, {
    GEBRUIKERSNAAM: gebruikersnaam,
    WACHTWOORD: `${wachtwoord}`,
  });
  return data;
};

export const register = async ({naam, achternaam, email, password}) =>
{
  const {data} = await axios.post(`users/register`, {
    naam,
    achternaam,
    email,
    password,
  });
  return data;
};

export const getKlantById = async (id) =>
{
  const {data} = await axios.get(`users/${id}`);
  return data;
};

export const getBoekById = async (id) =>
{
  const {data} = await axios.get(`users/${id}`);
  return data;
};

export const getAllusers = async () =>
{
  const {data} = await axios.get("users", {
    params: {
      limit: 25,
      offset: 0,
    },
  });
  return data;
};

export const saveKlant = async ({id, naam, achternaam, email}) =>
{
  const {data} = await axios({
    method: "put",
    url: `users/${id}`,
    data: {
      naam,
      achternaam,
      email,
    },
  });
  return data;
};

export const deleteKlant = async (id) =>
{
  await axios.delete(`users/${id}`);
};

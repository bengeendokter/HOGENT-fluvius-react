import {axios} from '.';

export const getAllDatasources = async () => {
    const { data } = await axios.get("doelstellingen");
    return data;
};

export const updateDatasource = async ({
    id,
    CORRUPT,
}) => {
const {
  data
} = await axios({
  method: 'put',
  url: `datasources/${id}`,
  data: {
    CORRUPT,
  },
});

return data;
};

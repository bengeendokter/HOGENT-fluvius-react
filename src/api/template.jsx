import {axios} from '.';

export const getAllTemplates = async () => {
    const { data } = await axios.get("templates");
    return data;
};

export const getAllTemplatesByRol = async (      
    rolnaam,
) => {
    const { data } = await axios({
        method : "get",
        url : `templates/rol/${rolnaam}`
    });
      return data;
};


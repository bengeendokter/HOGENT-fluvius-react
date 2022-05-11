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

export const save = async ({
        id,
        category_id,
        rol,
        is_visible,
        is_costumisable
    
  }) => {
    console.log("isvis", is_visible);
    const {
      data
    } = await axios({
      method: id ? 'put' : 'post',
      url: `templates/${id ?? ''}`,
      data: {
        category_id,
        rol,
        is_visible,
        is_costumisable
      },
    });
    
    return data;
  };

  export const deleteTemplate = async (id) => {
    await axios.delete(`templates/${id}`);
  };
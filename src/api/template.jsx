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
        is_costumisable,
        order
    
  }) => {
    const {
      data
    } = await axios({
      method: id ? 'put' : 'post',
      url: `templates/${id ?? ''}`,
      data: {
        category_id,
        rol,
        is_visible,
        is_costumisable,
        order
      },
    });
    return data;
  };

export const saveAlles = async (templates) => {
  
    if (typeof templates === "object" && templates.length !== 0) {
      for (const temp of templates) {
        const {
          id,
          category_id,
          rol,
          is_visible,
          is_costumisable,
          order } = temp;

        await axios({
          method: id ? 'put' : 'post',
          url: `templates/${id ?? ''}`,
          data: {
            category_id,
            rol,
            is_visible,
            is_costumisable,
            order
          },
        });
        
      }
    }
  };

  export const deleteTemplate = async (id) => {
    await axios.delete(`templates/${id}`);
  };
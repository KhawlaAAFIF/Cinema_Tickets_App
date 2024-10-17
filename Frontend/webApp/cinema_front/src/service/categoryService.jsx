import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api/categorie'; 

const categoryService = {
  getAllCategories: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/getAll`);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la récupération des catégories');
    }
  },

  getCategoryById: async (categoryId) => {
    try {
      const response = await axios.get(`${API_BASE_URL}/${categoryId}`);
      return response.data;
    } catch (error) {
      throw new Error('Erreur lors de la récupération de la catégorie');
    }
  },
};

export default categoryService;

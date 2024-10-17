import axios from 'axios';

const API_URL = 'http://localhost:8080/api/utilisateur';

const userService = {
  getAllUsers: async () => {
    const response = await axios.get(`${API_URL}/getAll`);
    return response.data;
  },

  getUserById: async (id) => {
    const response = await axios.get(`${API_URL}/byid/${id}`);
    return response.data;
  },
  getCount: async () => {
    const response = await axios.get(`${API_URL}/count`);
    return response.data;
  },

  updateUser: async (userData) => {
    try {
      const response = await axios.put(`${API_URL}/update/${userData.id}`, userData);
      return response;
    } catch (error) {
      throw error;
    }
  },

};

export default userService;

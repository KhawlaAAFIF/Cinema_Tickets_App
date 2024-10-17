import axios from 'axios';

const API_URL = 'http://localhost:8080/api/salle';

const salleService = {
  addSalle: async (salle) => {
    const response = await axios.post(`${API_URL}/add`, salle);
    return response.data;
  },

  getAllSalles: async () => {
    const response = await axios.get(`${API_URL}/getAll`);
    return response.data;
  },

  getSalleById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  updateSalle: async (id, updatedSalle) => {
    const response = await axios.put(`${API_URL}/${id}`, updatedSalle);
    return response.data;
  },

  deleteSalle: async (id) => {
    await axios.delete(`${API_URL}/${id}`);
  },
};

export default salleService;

import axios from 'axios';

const API_URL = 'http://localhost:8080/api/billet';

const billetService = {
  addBillet: async (billet) => {
    const response = await axios.post(`${API_URL}/add`, billet);
    return response.data;
  },

  getAllBillets: async () => {
    const response = await axios.get(`${API_URL}/getAll`);
    return response.data;
  },

  getBilletById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  updateBillet: async (id, updatedBillet) => {
    const response = await axios.put(`${API_URL}update/${id}`, updatedBillet);
    return response.data;
  },

  deleteBillet: async (id) => {
    await axios.delete(`${API_URL}/delete/${id}`);
  },
};

export default billetService;

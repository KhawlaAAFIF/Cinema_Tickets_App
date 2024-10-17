import axios from 'axios';

const API_URL = 'http://localhost:8080/api/projection';

const projectionService = {
  addProjection: async (projection) => {
    const response = await axios.post(`${API_URL}/add`, projection);
    return response.data;
  },

  getAllProjection: async () => {
    const response = await axios.get(`${API_URL}/getAll`);
    return response.data;
  },

  getProjectionById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  updateProjection: async (id, updatedProjection) => {
    const response = await axios.put(`${API_URL}/update/${id}`, updatedProjection);
    return response.data;
  },

  deleteProjection: async (id) => {
    await axios.delete(`${API_URL}/delete/${id}`);
  },

  getProjectionsByFilmId: async (idFilm) => {
    const response = await axios.get(`${API_URL}/film/${idFilm}`);
    return response.data;
  },
};

export default projectionService;

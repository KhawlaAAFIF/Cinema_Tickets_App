import axios from 'axios';

const API_URL = 'http://localhost:8080/api/film';

const filmService = {
  addFilm: async (film) => {
    const response = await axios.post(`${API_URL}/add`, film);
    return response.data;
  },

  getAllFilms: async () => {
    const response = await axios.get(`${API_URL}/getFilm`);
    return response.data;
  },

  getFilmById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  updateFilm: async (id, updatedFilm) => {
    const response = await axios.put(`${API_URL}/update/${id}`, updatedFilm);
    return response.data;
  },

  deleteFilm: async (id) => {
    await axios.delete(`${API_URL}/delete/${id}`);
  },
  getCount: async () => {
    const response = await axios.get(`${API_URL}/count`);
    return response.data;
  },
  uploadImage: async (id, formData) => {
    try {
      const response = await axios.post(
        `/api/film/uploadImage?id=${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data; 
    } catch (error) {
      console.error('Upload Image Error:', error.response.data);
      return null;
    }
  },
};

export default filmService;

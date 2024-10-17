import axios from 'axios';

const API_URL = 'http://localhost:8080/api/reservation';

const reservationService = {
 
  addReservation: async () => {
    const response = await axios.post(`${API_URL}/add`);
    return response.data;
  },
  getAllReservations: async () => {
    const response = await axios.get(`${API_URL}/getAll`);
    return response.data;
  },

  getReservationById: async (id) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  },

  updateReservation: async (id, updatedReservation) => {
    const response = await axios.put(`${API_URL}/update/${id}`, updatedReservation);
    return response.data;
  },

  deleteReservation: async (id) => {
    await axios.delete(`${API_URL}/delete/${id}`);
  },
  getCount: async () => {
    const response = await axios.get(`${API_URL}/count`);
    return response.data;
  },
};

export default reservationService;

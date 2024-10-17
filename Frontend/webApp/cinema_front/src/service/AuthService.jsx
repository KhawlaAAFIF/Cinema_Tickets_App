import axios from 'axios';

const apiUrl = 'http://localhost:8080/api';

const handleApiCall = async (endpoint, user) => {
  try {
    const response = await axios.post(`${apiUrl}/${endpoint}`, user);
    console.log(response.data);
    return response.data; 
  } catch (error) {
    console.error(error.response.data);
    throw new Error(error.response.data); 
  }
};

const register = async (user) => {
  return handleApiCall('utilisateur/register', user); 
};


const login = async (user) => {
  return await handleApiCall('utilisateur/login', user); 
};

const adminLogin = async (admin) => {
  return await handleApiCall('admin/login', admin); 
};

export { register, login, adminLogin };

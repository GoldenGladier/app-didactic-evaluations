import axios from 'axios';

const API_URL = 'http://localhost:3001/api/v1/roll';

const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

class TestService {
  async getRoll() {
    try {
      const response = await axiosInstance.get(`${API_URL}/get`);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }
}

export default new TestService();
// import axios from 'axios';
import axios from './axios';

const API_URL = process.env.VUE_APP_API_URL + '/dinamic';

// const axiosInstance = axios.create();

// axiosInstance.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('token');
// if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

class ActivityService {
  async addActivityOrderStatement(activityData) {
    try {
      const response = await axios.post(`${API_URL}/orderQuestion/add`, activityData);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }

  async getActivities(idEvaluation) {
    try {
      const response = await axios.get(`${API_URL}/orderQuestion/getActivity/${idEvaluation}`);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }  
}

export default new ActivityService();
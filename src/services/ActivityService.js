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

  async deleteActivityOrderStatement(idOrdenamiento) {
    try {
      const response = await axios.post(`${API_URL}/orderQuestion/delete`, { idOrdenamiento });
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }  

  async respondActivityOrderStatement(data) {
    try {
      const response = await axios.post(`${process.env.VUE_APP_API_URL}/answer/sortSentence`, data);      
      return response.data;
    } catch (error) {
      throw error.response;
      // throw error.response.data.message;
    }
  }

  async getActivities(idEvaluation) {
    try {
      const response = await axios.get(`${API_URL}/orderQuestion/getActivity/${idEvaluation}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new Error("No hay actividades asociadas a la evaluación.");
      } else {
        throw error;
      }
    }
  }  
}

export default new ActivityService();
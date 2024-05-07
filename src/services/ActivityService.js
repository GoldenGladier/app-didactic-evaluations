import axios from 'axios';

const API_URL = process.env.VUE_APP_API_URL + '/dinamic';

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

class ActivityService {
    async addActivityOrderStatement(activityData) {
        try {
            const response = await axiosInstance.post(`${API_URL}/orderQuestion/add`, activityData);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    }
}

export default new ActivityService();
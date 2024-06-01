import axios from 'axios';
import router from '@/router'; 
import store from '@/store/auth';

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

axiosInstance.interceptors.response.use(
  (response) => response, 
  (error) => {
    if (error.response && error.response.status === 401) {
      store.commit('logout');   
      router.push('/login');
    }
    return Promise.reject(error); 
  }
);

export default axiosInstance;
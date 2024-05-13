// import axios from 'axios';
import axios from './axios';

const API_URL = process.env.VUE_APP_API_URL + '/evaluation';

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

class EvaluationService {
    async create(evaluationData) {
        try {
            const response = await axios.post(`${API_URL}/create`, evaluationData);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    }
    async getEvaluationById(id) {
        try {
            const response = await axios.get(`${API_URL}/getEvaluation/${id}`);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    }    
    async update(id, newEvaluationData) {
        try {
            const response = await axios.post(`${API_URL}/update/${id}`, newEvaluationData);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    }    
    async getAllEvaluationsByAauthenticatedUser() {
        try {
            const response = await axios.get(`${API_URL}/getAllEvaluations`);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    }         
    async getClasification() {
        try {
            const response = await axios.get(`${API_URL}/getClasification`);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    }
    async getDinamics() {
        try {
            const response = await axios.get(`${API_URL}/getDinamics`);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    }  
}

export default new EvaluationService();
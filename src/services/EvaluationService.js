import axios from './axios';

const API_URL = process.env.VUE_APP_API_URL + '/evaluation';

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
    async delete(id_evaluaciones) {
        try {
            const response = await axios.delete(`${API_URL}/delete/${id_evaluaciones}`);
            return response.data;
        } catch (error) {
            throw error.response.data.message;
        }
    }       
    async share(id_evaluaciones) {
        try {
            const response = await axios.get(`${API_URL}/share/${id_evaluaciones}`);
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
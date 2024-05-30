import axios from './axios';

const API_URL = process.env.VUE_APP_API_URL + '/dinamic';

class ActivityService {

    // ---- Ordena el enunciado ----
  async addActivityOrderStatement(activityData) {
    try {
      const response = await axios.post(`${API_URL}/orderQuestion/add`, activityData);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }

  async getActivitiesOrderStatement(idEvaluation) {
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

    // ---- Ordena los items ----
  async addActivitiesSortItems(activityData) {
    try {
      const response = await axios.post(`${API_URL}/orderItem/addItems`, activityData);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }

  async deleteActivitySortItems(id) {
    try {
      const response = await axios.post(`${API_URL}/orderQuestion/delete`, { id });
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }  

    // ---- Actividades en general ----
}

export default new ActivityService();
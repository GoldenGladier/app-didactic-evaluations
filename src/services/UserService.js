import axios from './axios';

const API_URL = process.env.VUE_APP_API_URL + '/user';

class UserService {
  async getUserByEmail(email) {
    try {
      const response = await axios.get(`${API_URL}`, { params: { email } });        
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }  
  async updateUser(id, newUserData) {
    try {
      const response = await axios.post(`${API_URL}/${id}`, newUserData);        
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }
  async sendConfirmationEmail() {
    try {
      const response = await axios.get(`${API_URL}/sendConfirmationEmail`);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }     
}

export default new UserService();
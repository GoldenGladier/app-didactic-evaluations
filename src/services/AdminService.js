import axios from './axios';

const API_URL = process.env.VUE_APP_API_URL + '/admin';

class AdminService {
  async getAllUsers() {
    try {
      const response = await axios.get(`${API_URL}/users`);        
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }      
}

export default new AdminService();
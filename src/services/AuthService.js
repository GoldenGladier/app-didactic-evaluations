import axios from 'axios';
import store from '@/store/auth';

const API_URL = process.env.VUE_APP_API_URL + '/user';

class AuthService {
  async login(credentials) {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        const token = response.data.token;
        const user = response.data.user;

        store.commit('setToken', token);
        store.commit('setUser', user);
        console.log("user en el servicio: ", user)

        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
  }

  async register(newUserInfo) {
    try {
      const response = await axios.post(`${API_URL}/signup`, newUserInfo);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }

}

export default new AuthService();
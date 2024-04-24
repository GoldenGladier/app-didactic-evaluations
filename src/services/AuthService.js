import axios from 'axios';
import store from '@/store/auth';

const API_URL = 'http://localhost:3001/lerner/user';

class AuthService {
  async login(credentials) {
    try {
        const response = await axios.post(`${API_URL}/login`, credentials);
        const token = response.data.token;
        const user = response.data.user;

        // Guardar el token en Vuex y localStorage
        store.commit('setToken', token);
        // Guardar los datos del usuario en Vuex y localStorage
        store.commit('setUser', user);
        console.log("user en el servicio: ", user)

        return response.data;
    } catch (error) {
        throw error.response.data.message;
    }
  }

  async register(userInfo) {
    try {
      const response = await axios.post(`${API_URL}/signup`, userInfo);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }

}

export default new AuthService();
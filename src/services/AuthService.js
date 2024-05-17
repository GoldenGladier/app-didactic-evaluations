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
  async validateSession(token) {
    try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/session/validateToken/${token}`); 
        if(response.status === 401) {
          console.log("Estoy haciendo logout")
          store.commit('logout'); 
        }
        return response.data;
    } catch (error) {
      if(error.response.status === 401) { 
        console.log("Estoy haciendo logout")
        store.commit('logout'); 
      }
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

  async confirmEmail(token) {
    try {
      const response = await axios.get(`${API_URL}/confirmEmail/${token}`);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }

  async requestResetPassword(data) {
    try {
      const response = await axios.post(`${API_URL}/forgotPassword`, data);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }

  async resetPassword(data, token) {
    try {
      const response = await axios.post(`${API_URL}/newPassword/${token}`, data);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }  

  async newGuestUser(username) {
    try {
      const response = await axios.post(`${API_URL}/guest`, username);
      return response.data;
    } catch (error) {
      throw error.response.data.message;
    }
  }    
  
}

export default new AuthService();
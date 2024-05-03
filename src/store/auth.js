import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user')) || null, // Aquí almacenaremos los datos del usuario
    token: localStorage.getItem('token') || null, // Inicializar el token desde localStorage si está presente
    isLoggedIn: !!localStorage.getItem('token') // Indicar si el usuario está autenticado basado en la presencia del token
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    setToken(state, token) {
      state.token = token;
      state.isLoggedIn = !!token;
      localStorage.setItem('token', token);
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.isLoggedIn = false;
      localStorage.removeItem('token'); 
      localStorage.removeItem('user'); 
    }
  }
});

export function isLoggedIn() {
  return !!localStorage.getItem('token');
}
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    sidebarCollapsed: JSON.parse(localStorage.getItem('sidebarCollapsed')) || false, 
  },
  mutations: {
    setCollapsed(state, sidebarCollapsed) {
      state.sidebarCollapsed = sidebarCollapsed;
      localStorage.setItem('sidebarCollapsed', JSON.stringify(sidebarCollapsed));
    },
  }
});

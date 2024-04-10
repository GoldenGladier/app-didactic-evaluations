const state = {
    // Estado inicial del sidebar, por ejemplo, si está abierto o cerrado
    isOpen: false,
  };
  
  const mutations = {
    // Mutación para cambiar el estado de `isOpen`
    TOGGLE_SIDEBAR(state) {
      state.isOpen = !state.isOpen;
    },
  };
  
  const actions = {
    // Acción para togglear el sidebar
    toggleSidebar({ commit }) {
      commit('TOGGLE_SIDEBAR');
    },
  };
  
  const getters = {
    // Getter para acceder al estado del sidebar
    isSidebarOpen: (state) => state.isOpen,
  };
  
  export default {
    namespaced: true, // Importante para permitir el uso de módulos
    state,
    mutations,
    actions,
    getters,
  };
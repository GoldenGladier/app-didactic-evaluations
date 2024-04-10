import Vue from 'vue';
import Vuex from 'vuex';

import sidebar from './sidebar';

Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        sidebar,    
    },    
    state: {
        // Aquí van las variables de estado
    },
    mutations: {
        // Aquí se modifican esas variables
    },
    actions: {
        // Aquí se realizan llamadas a APIs, etc.
    },
    getters: {
        // Aquí se pueden obtener partes del estado y posiblemente manipularlo para devolver algo
    }
});
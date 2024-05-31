import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AuthService from '@/services/AuthService';
// import './interceptors/axios'
import VueSweetalert2 from 'vue-sweetalert2';
// import VueDriver from "vue-driver.js";
import 'bootstrap-icons/font/bootstrap-icons.css';

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import './styles/app.scss'
import './styles/custom-sweetalert2.scss'

import "driver.js/dist/driver.css";
// import 'sweetalert2/dist/sweetalert2.min.css';

// const options = {
//   confirmButtonColor: '#EE6F57',
//   cancelButtonColor: '#ff7674',
// };

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueSweetalert2)
// Vue.use(VueDriver)

const token = localStorage.getItem('token');
if (token) {
  AuthService.validateSession(token)
    .catch(error => {
      console.error('La sesión del usuario ha caducado.', error);
      router.push({ name: 'Login' });
    });
}

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// import './interceptors/axios'
import VueSweetalert2 from 'vue-sweetalert2'

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import './styles/app.scss'
import './styles/custom-sweetalert2.scss'
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

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

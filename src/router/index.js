import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/Home.vue' 
import About from '@/views/About.vue'
import Login from '@/views/Login.vue'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            redirect: '/home' // Redirigir la ruta raíz a la ruta '/home'
        },    
        {
        path: '/home',
        name: 'Home',
        component: Home
        },
        {
            path: '/about',
            name: 'About',
            component: About
        },
        {
            path: '/login',
            name: 'Login',
            component: Login
        }            
        // Puedes añadir más rutas aquí
    ]
})
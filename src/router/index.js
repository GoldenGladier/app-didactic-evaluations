import Vue from 'vue'
import Router from 'vue-router'
import { isLoggedIn } from '@/store/auth.js'

import Home from '@/views/Home.vue' 
import About from '@/views/About.vue'
import Login from '@/views/Login.vue'
import Checkin from '@/views/Checkin.vue'
import TestingUi from '@/views/TestingUi.vue'
import JoinToAssessment from '@/views/JoinToAssessment.vue'


Vue.use(Router)

const router = new Router({
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
        },
        {
            path: '/testingUi',
            name: 'TestingUi',
            component: TestingUi
        },   
        {
            path: '/checkin',
            name: 'Checkin',
            component: Checkin
        },                                    
        {
            path: '/join-to-activity',
            name: 'JoinToAssessment',
            component: JoinToAssessment,
            meta: {
                requiresAuth: true // Esta meta indica que esta ruta requiere autenticación
            }            
        },                
        // Puedes añadir más rutas aquí
    ]
})

// Guardia de navegación para verificar la autenticación
router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isLoggedIn()) { // Verificar si la ruta requiere autenticación y el usuario no está autenticado
      next('/login'); // Redirigir al usuario al login
    } else {
      next(); // Continuar con la navegación
    }
});

export default router;
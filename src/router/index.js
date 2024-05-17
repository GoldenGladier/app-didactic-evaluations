import Vue from 'vue'
import Router from 'vue-router'
import { isLoggedIn } from '@/store/auth.js'

import Home from '@/views/Home.vue' 
import About from '@/views/About.vue'
import Login from '@/views/Login.vue'
import Register from '@/views/Register.vue'
import ConfirmEmail from '@/views/ConfirmEmail.vue'
import RequestResetPassword from '@/views/user/RequestResetPassword.vue'
import ResetPassword from '@/views/user/ResetPassword.vue'
import EditUser from '@/views/user/EditUser.vue'
import TestingUi from '@/views/TestingUi.vue'
import JoinToAssessment from '@/views/JoinToAssessment.vue'
import EvaluationsLayout from '@/views/EvaluationsLayout.vue'
import MyEvaluations from '@/views/MyEvaluations.vue'
import CreateEvaluation from '@/views/activities/CreateEvaluation.vue'  
import CreateActivities from '@/views/activities/CreateActivities.vue'  
import EditEvaluation from '@/views/activities/EditEvaluation.vue'  
import ActivityView from '@/views/ActivityView.vue'  

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
            path: '/register',
            name: 'Register',
            component: Register
        },  
        {
            path: '/confirm-email/:token?',
            name: 'ConfirmEmail',
            component: ConfirmEmail
        },           
        {
            path: '/user/request-reset-password',
            name: 'RequestResetPassword',
            component: RequestResetPassword                        
        },
        {
            path: '/user/reset-password/:token?',
            name: 'ResetPassword',
            component: ResetPassword
        },                    
        {
            path: '/edit-user',
            name: 'EditUser',
            component: EditUser
        },  
        {
            path: '/join-to-activity/:pin?',
            name: 'JoinToAssessment',
            component: JoinToAssessment,      
        },
        // {
        //     path: '/mis-evaluaciones',
        //     name: 'MyEvaluations',
        //     component: MyEvaluations
        // },
        // {
        //     path: '/crear-evaluacion',
        //     name: 'CreateEvaluation',
        //     component: CreateEvaluation
        // },
        // {
        //     path: 'evaluaciones/:idEvaluation/crear-actividades',
        //     name: 'CreateActivities',
        //     component: CreateActivities
        // },     

        {
            path: '/evaluaciones',
            component: EvaluationsLayout, // Layout específico para la sección de evaluaciones
            meta: {
                requiresAuth: true
            },            
            children: [
              {
                path: 'mis-evaluaciones',
                name: 'MyEvaluations',
                component: MyEvaluations,
                meta: {
                    requiresAuth: true
                },                  
              },
              {
                path: 'crear-evaluacion',
                name: 'CreateEvaluation',
                component: CreateEvaluation,
                meta: {
                    requiresAuth: true
                },                       
              },
              {
                path: ':idEvaluation/crear-actividades', 
                name: 'CreateActivities',
                component: CreateActivities,
                meta: {
                    requiresAuth: true
                },                  
              },
              {
                path: ':idEvaluation/editar/:tabId?', 
                name: 'EditEvaluation',
                component: EditEvaluation,
                meta: {
                    requiresAuth: true
                },                  
              },
            ]
        },        
        {
            path: '/activity',
            name: 'ActivityView',
            component: ActivityView
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
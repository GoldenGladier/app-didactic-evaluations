<template>
  <b-navbar toggleable="md" type="dark" class="custom-navbar">
    <div class="custom-info-brand">
      <AppIcon color="#ffffff" />
      <b-navbar-brand href="#">Mi aplicación</b-navbar-brand>      
    </div>

    <b-collapse  id="navbarSupportedContent" class="custom-extra-options" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown v-if="isLoggedIn" class="test-g">
          <template #button-content>
            <div class="d-flex align-items-center custom-user-opcions">
              <span class="username">{{ username }}</span>
              <!-- <img src="ruta-a-la-imagen-del-usuario" alt="Foto de perfil" class="user-avatar"> -->
              <b-icon icon="person" class="user-avatar"></b-icon>
            </div>
          </template>
          <b-dropdown-item @click="logout()">            
            <b-icon icon="door-closed" class="sidebar-icon"></b-icon>
            <span class="sidebar-text">Cerrar sesión</span>              
          </b-dropdown-item>    
          <!-- <b-dropdown-item >            
            <b-icon icon="person-fill" class="sidebar-icon"></b-icon>
            <span class="sidebar-text">Configurar usuario</span>              
          </b-dropdown-item>               -->
        </b-nav-item-dropdown>

      </b-navbar-nav>
    </b-collapse>

  </b-navbar>
</template>

<script>
import store from '@/store/auth';
import AppIcon from './navegation/AppIcon.vue';

export default {
  name: 'Navbar',
  components: {
    AppIcon,
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn;
    },
    user() {
      return this.$store.state.auth.user;
    },
    username() {
      return this.user.nombre + ' ' + this.user.apellido_paterno + ' ' + (this.user.apellido_materno ? this.user.apellido_materno : '')
    }
  },
  methods: {
    logout() {
      console.log("Close sesion")
      store.commit('logout');   
      if(this.$route.path !== '/login') {
        this.$router.push('/login');
      }
    }
  },  
  // created() {
  //   console.log("localStorage.getItem('token'): ", localStorage.getItem('token'))
  //   console.log("localStorage.getItem('user'): ", localStorage.getItem('user'))
  // }, 
};
</script>

<style>
.custom-navbar {
  background-color: #FBA834;
  border-radius: 0.4rem;
  margin-bottom: 0.5rem;
  box-shadow: 0 4px 24px 0 rgba(34,41,47, 0.15);
}

.custom-info-brand {
  padding-left: 2rem;
}

.sidebar-icon {
  margin: auto 0.5rem;
  color: #F6F5F5;
}

.custom-extra-options {
  padding-right: 2rem;
}

.custom-navbar {
  background-color: #EE6F57;
  padding: 0.5rem;
}

.custom-user-opcions {
  color: #F6F5F5;
}

.custom-extra-options .sidebar-icon{
  color: var(--secondary-color);
  margin: initial;
  margin-right: 0.5rem;
}

.username {
  margin-right: 0.5rem;
}

.user-avatar {
  width: 30px; 
  height: 30px; 
  border-radius: 50%; 
  border: solid 1px #F6F5F5;
  padding: 2px;
}

.custom-navbar .dropdown-toggle::after {
  display: none !important;
}

.custom-extra-options .dropdown-menu {
  left: -1rem !important;
}

.ml-auto {
  margin-left: auto !important;
}
</style>
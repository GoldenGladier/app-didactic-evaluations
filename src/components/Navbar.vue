<template>
  <b-navbar toggleable="md" type="dark" class="custom-navbar justify-content-center justify-content-md-between">
    <b-nav-item to="/home" class="custom-info-brand">
      <AppIcon color="#ffffff" />
      <b-navbar-brand>Actividades didácticas</b-navbar-brand>   
    </b-nav-item>    

    <b-collapse id="navbarSupportedContent" class="custom-extra-options" is-nav>
      <b-navbar-nav class="ml-auto">

        <b-nav-item v-if="!isLoggedIn" href="/login" class="custom-nav-item d-flex align-items-center">
          <b-icon icon="door-open" class="sidebar-icon" /> Login
        </b-nav-item>
        <b-nav-item v-if="!isLoggedIn" href="/register" class="custom-nav-item d-flex align-items-center">
          <b-icon icon="person-plus" class="sidebar-icon" /> Registrarse
        </b-nav-item>

        <b-nav-item-dropdown v-if="isLoggedIn">
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
          <b-dropdown-item v-if="!user.isGuestUser" @click="$router.push('/edit-user');" :class="{ 'active': isActive('/edit-user') }">            
            <!-- <b-icon icon="gear" class="sidebar-icon"></b-icon> -->
            <i class="bi bi-person-gear"></i>
            <span class="sidebar-text">Editar usuario</span>              
          </b-dropdown-item>              
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
    },
    isActive(route) {
      return this.$route.path === route;
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
  list-style-type: none; 
  padding: 0;
  margin: 0; 
  display: flex; 
}
.custom-info-brand .nav-link {
  padding: 0;
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

.custom-extra-options .active {
  background-color: var(--primary);  
}
.custom-extra-options .active .sidebar-text, .custom-extra-options .active i{
  color: #F6F5F5;
}
.custom-extra-options .active:hover .sidebar-text, .custom-extra-options .active:hover i{
  color: var(--text-dark-color);
}

.custom-nav-item .nav-link {
  color: #F6F5F5 !important;
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
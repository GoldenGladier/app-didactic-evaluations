<template>
  <div>
    <div :class="['sidebar', { 'collapsed': sidebarCollapsed, 'is-overlay': isOverlay }]" v-click-outside="handleClickOutside">
      <ul class="list-unstyled mb-0">
        <li class="extra-nav-item" >
          <AppIcon color="#ffffff" size="25px"/>
          <span v-if="!sidebarCollapsed" class="sidebar-text">Actividades didácticas</span>
        </li>   
        <li :class="sidebarCollapsed ? 'extra-nav-item' : ''">          
          <b-icon v-if="isOverlay" @click="toggleCollapse" icon="x" class="collapse-icon"></b-icon>    
          <b-icon v-else @click="toggleCollapse" :icon="sidebarCollapsed ? 'chevron-double-right' : 'chevron-double-left'" class="collapse-icon"></b-icon>    
        </li>

        <hr class="custom-hr">

        <b-nav vertical class="custom-vertical-nav">
          <template v-for="(item, index) in items">
            <template v-if="item.isExternalLink">
              <li :key="index" :class="{ 'custom-nav-item': true, 'active': isActive(item.link) }">
                <a :href="item.link" class="nav-link" target="_blank">
                  <b-icon :icon="item.icon" class="sidebar-icon"></b-icon>
                    <span v-if="!sidebarCollapsed" class="sidebar-text">{{ item.text }}</span>                 
                </a>
              </li>
            </template>      
            <template v-else>      
              <b-nav-item :key="index" :to="item.link" :class="{ 'custom-nav-item': true, 'active': isActive(item.link) }">
                <b-icon :icon="item.icon" class="sidebar-icon"></b-icon>
                <!-- <Transition name="bounce"> -->
                  <span v-if="!sidebarCollapsed" class="sidebar-text">{{ item.text }}</span>
                <!-- </Transition> -->
              </b-nav-item>
            </template>
          </template>
          
          <div v-if="isOverlay">
            <hr class="custom-hr">             
            <div v-if="!isLoggedIn">
              <b-nav-item href="/login" class="custom-nav-item">
                <b-icon icon="door-open" class="sidebar-icon" /> Login
              </b-nav-item>
              <b-nav-item href="/register" class="custom-nav-item">
                <b-icon icon="person-plus" class="sidebar-icon" /> Registrarse
              </b-nav-item>  
            </div>
            <b-nav-item v-else @click="logout()" class="custom-nav-item">
              <b-icon icon="door-closed" class="sidebar-icon"></b-icon>
                <span v-if="!sidebarCollapsed" class="sidebar-text">Cerrar sesión</span>
            </b-nav-item>             
          </div>          
        </b-nav>
      </ul>
    </div>
                  
    <b-button v-if="isOverlay" @click="toggleCollapse" variant="primary" class="custom-button-toggle-collapse">
      <i class="bi bi-list mr-0"></i>
    </b-button>

  </div>
</template>

<script>
import AppIcon from './navegation/AppIcon.vue';
import sidebar from '@/store/sidebar';

import ClickOutside from 'vue-click-outside'

export default {
  components: {
    AppIcon
  },
  data() {
    return {
      sidebarCollapsed: false,
      isOverlay: false,
      sidebarFullWidth: 'calc(250px - 0.5rem)',
      items: [
        { text: 'Inicio', icon: 'house-door', link: '/home' },
        { text: 'Mis evaluaciones', icon: 'card-checklist', link: '/evaluaciones/mis-evaluaciones' },
        { text: 'Crear evaluación', icon: 'plus-circle', link: '/evaluaciones/crear-evaluacion' },
        { text: 'Unirse a actividad', icon: 'star', link: '/join-to-activity' },        
        // { text: 'Login', icon: 'door-open', link: '/login' },
        // { text: 'Registrarse', icon: 'person-plus', link: '/register' },
        { text: 'Administración', icon: 'gear', link: '/administracion' },
        { text: 'UI', icon: 'code-slash', link: '/testingUi' },
        { text: 'Icons', icon: 'suit-heart', link: 'https://icons.getbootstrap.com', isExternalLink: true },
        { text: 'Desarrollo', icon: 'hammer', link: '/activity' },
        
        // Agrega más ítems aquí según tu necesidad
      ]
    }
  },
  computed: {
    sidebarWidth() {
      return this.sidebarCollapsed ? 'calc(60px + 0.5rem)' : '250px';
    }
  },
  methods: {
    checkScreenSize() {
      this.isOverlay = window.innerWidth <= 768;
    },
    toggleCollapse() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
      sidebar.commit("setCollapsed", this.sidebarCollapsed);
      this.$emit( 'update:sidebarWidth', this.sidebarWidth );
      console.log(this.sidebarWidth)
    },
    handleClickOutside() {
      if (this.isOverlay && !this.sidebarCollapsed) {
        this.toggleCollapse();
      }
    },    
    isActive(route) {
      return this.$route.path === route;
    }
  },
  created() {
    this.checkScreenSize();
    window.addEventListener('resize', this.checkScreenSize);
    this.sidebarCollapsed = this.$store.state.sidebar.sidebarCollapsed;
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenSize);
  },
  directives: {
    ClickOutside
  }
}
</script>

<style scoped>
.custom-hr {
  width: 80%;
  margin: 1rem auto;
}
.sidebar {
  width: 250px;
  height: 100%;

  width: calc(250px - 0.5rem);
  height: calc(100% - 1rem);
  border-radius: 0.5rem;
  margin: 0.5rem;
  margin-right: 0;

  background-color: #EE6F57;
  color: #F6F5F5;
  position: fixed;
  top: 0;
  left: 0;
  overflow-x: hidden;
  overflow-y: auto;
  transition: width 0.5s ease;
  text-align: left;
}

.sidebar.is-overlay {
  border-radius: 0 0.5rem 0.5rem 0;
}

.sidebar .custom-vertical-nav {
  padding: 1rem;
  padding-top: 0;
}

.extra-nav-item, .custom-nav-item {
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  margin: initial;
}

.extra-nav-item {
  padding-top: 2rem;
  padding-left: 1rem;
}

.sidebar .custom-nav-item a {
  margin-bottom: 0.4rem;
  border-radius: 0.4rem;
}

.sidebar .custom-nav-item a:hover {
  background-color: #FDBF60;
  background-color: #e7a399;
  border-radius: 0.4rem;
  color: #F6F5F5;
  padding: auto 1rem;
}

.sidebar .custom-nav-item.active a {
  background-color: #FDBF60;
  background-color: #CC6F60;
  border-radius: 0.4rem;
  color: #F6F5F5;
  padding: auto 1rem;
}

.sidebar.collapsed {
  width: 60px;
}

.sidebar.collapsed .extra-nav-item {
  text-align: center;
  padding: 0.6rem;
}
.sidebar.collapsed .custom-vertical-nav {
  padding: 0;
}

.sidebar.collapsed .custom-nav-item {
  margin: auto;
}

.sidebar.collapsed .custom-nav-item .nav-link{
  padding: 0.5rem !important;
}

.sidebar .collapse-icon {
  font-size: 20px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}

.sidebar.is-overlay.collapsed {
  transform: translateX(-101%);  
}

.sidebar.is-overlay {
  transform: translateX(0);
  position: fixed;
  margin: 0;  
  top: 0;
  left: 0;
  height: 100%;
  z-index: 20;
  width: 270px;
  transition: transform 0.5s ease;
}

.sidebar-text {
  margin-left: 5px;
  color: #F6F5F5;
}

.sidebar.collapsed .collapse-icon {
  position: relative;
  top: 0;
  right: 0;
}

.sidebar-icon {
  color: #F6F5F5;
}

.custom-button-toggle-collapse {
  position: fixed;
  left: 0.5rem;
  top: 0.5rem;
  padding: 0.7rem 1rem;
  z-index: 16;
  border-radius: 0.4rem;
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

</style>
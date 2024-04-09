<template>
  <div id="app">
    <!-- <Navbar @show-sidebar="showSidebar" /> -->
    <Sidebar v-if="sidebarVisible" />
    
    <b-container fluid>
      <!-- Contenido principal de tu aplicación -->
      <router-view></router-view>
    </b-container>    
  </div>
</template>

<script>
// import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'

export default {
  name: 'App',
  components: {
    // Navbar,
    Sidebar
  },  
  data() {
    return {
      sidebarVisible: true
    };
  },
  methods: {
    showSidebar() {
      // Mostrar el sidebar cuando se emite el evento desde el Navbar
      this.sidebarVisible = !this.sidebarVisible;
    }
  }  
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

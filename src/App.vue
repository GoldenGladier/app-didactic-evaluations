<template>
  <div id="app">
    <Sidebar :sidebarWidth.sync="sidebarWidth" />
    
    <div class="master-container" :style="{ 'margin-left': sidebarWidth }" >
      <Navbar />
      <router-view></router-view>
    </div>    
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'

export default {
  name: 'App',
  components: {
    Navbar,
    Sidebar,
  },  
  data() {
    return {
      sidebarWidth: "calc(250px)"
    };
  }, 
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

#app .master-container {
  min-height: 100vh;
  transition: margin-left 0.5s ease;
}
</style>

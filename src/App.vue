<template>
  <div id="app">
    <Sidebar :sidebarWidth.sync="sidebarWidth" />
    <div class="master-container" :style="{ 'margin-left': sidebarWidth }" >
      <Navbar />
      <div class="view-master-container">
        <router-view></router-view>
      </div>
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
      sidebarWidth: "250px",
    };
  }, 
  created() {
    document.title = 'Actividades didácticas';
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
  background: #F8F8F8;
}

#app .master-container {
  position: relative;
  min-height: 100vh;
  padding: 0.5rem;
  transition: margin-left 0.5s ease;
}

#app .master-container .view-master-container {
  /* background: #FFFFFF;
  border-radius: 0.4rem;
  box-shadow: 0 4px 24px 0 rgba(34,41,47, 0.15); */
  position: absolute;
  width: calc(100% - 1rem);
  min-height: calc(100% - 5.5rem);
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

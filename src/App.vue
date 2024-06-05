<template>
  <div id="app">
    <Sidebar :sidebarWidth="sidebarWidth" v-if="(isLoggedIn && !isGuestUser) || this.isOverlay" />
    <div class="master-container" id="master-container" :class="{ 'with-sidebar': !isOverlay }" :style="{ 'margin-left': sidebarWidth }" >
      <Navbar />
      <div class="view-master-container" id="view-master-container">
        <router-view></router-view>
      </div>
    </div>    
  </div>
</template>

<script>
import Navbar from './components/Navbar.vue'
import Sidebar from './components/Sidebar.vue'
import sidebar from '@/store/sidebar';

export default {
  name: 'App',
  components: {
    Navbar,
    Sidebar,
  },  
  data() {
    return {
      // sidebarWidth: "250px",
      collapsedSize: "calc(60px + 0.5rem)",

      isOverlay: false,
    };
  }, 
  created() {
    this.checkScreenSize();
    // this.sidebarWidth = this.isLoggedIn ? (this.$store.state.sidebar.sidebarCollapsed ? this.collapsedSize : this.sidebarWidth) : '0px';    
    window.addEventListener('resize', this.checkScreenSize);
    document.title = 'Donkademy';
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.checkScreenSize);
  },    
  methods: {
    checkScreenSize() {
      this.isOverlay = window.innerWidth <= 768;
      if(this.isOverlay){
        sidebar.commit("setCollapsed", true);
      }
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn;
    },   
    isGuestUser() {
      return this.$store.state.auth.user?.isGuestUser;
    },
    sidebarWidth() {
      if((this.isLoggedIn && !this.isGuestUser) || this.isOverlay) {
        console.log("Mostrar sidebar");
      }
      return ((this.isLoggedIn && !this.isGuestUser) || this.isOverlay) ? (this.$store.state.sidebar.sidebarCollapsed ? this.collapsedSize : "250px") : '0px';   
    }
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
  background: #F8F8F8;
}

#app .master-container {
  position: relative;
  overflow-x: hidden;
  min-height: 100vh;
  padding: 0.5rem;
  transition: margin-left 0.5s ease;
}

#app .master-container .view-master-container {
  position: absolute;
  width: calc(100% - 1rem);
  min-height: calc(100% - 5.5rem);
  display: flex;
  justify-content: center;
  align-items: center;
}

@media (max-width: 768px) {
  #app .master-container {
    margin-left: 0 !important;
  }

  .sidebar {
    --sidebar-width: 250px;
  }
}
</style>

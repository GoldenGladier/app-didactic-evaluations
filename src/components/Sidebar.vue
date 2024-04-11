<template>
  <div>
    <div :class="{ 'sidebar': true, 'collapsed': sidebarCollapsed }">
      <ul class="list-unstyled mb-0">
        <li class="extra-nav-item" >
          <b-icon icon="triangle-half" class="sidebar-icon"></b-icon>
          <span v-if="!sidebarCollapsed" class="sidebar-text">Mi Aplicación</span>
        </li>   
        <li :class="sidebarCollapsed ? 'extra-nav-item' : ''">
          <b-icon @click="toggleCollapse" :icon="sidebarCollapsed ? 'chevron-double-right' : 'chevron-double-left'" class="collapse-icon"></b-icon>    
        </li>

        <hr class="custom-hr">

        <b-nav vertical class="custom-vertical-nav">
          <b-nav-item v-for="item in items" :key="item.id" :to="item.link" :class="{ 'custom-nav-item': true, 'active': isActive(item.link) }">
            <b-icon :icon="item.icon" class="sidebar-icon"></b-icon>
            <span v-if="!sidebarCollapsed" class="sidebar-text">{{ item.text }}</span>
          </b-nav-item>
        </b-nav>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      sidebarCollapsed: false,
      sidebarFullWidth: 'calc(250px - 0.5rem)',
      items: [
        { id: 1, text: 'Inicio', icon: 'house-door', link: '/home' },
        { id: 2, text: 'Mis evaluaciones', icon: 'card-checklist', link: '/mis-evaluaciones' },
        { id: 3, text: 'Crear evaluación', icon: 'plus-circle', link: '/crear-evaluacion' },
        { id: 4, text: 'Unirse', icon: 'play', link: '/unirse' },
        { id: 5, text: 'Nosotros', icon: 'people', link: '/about' },
        { id: 6, text: 'Login', icon: 'door-open', link: '/login' },
        { id: 6, text: 'UI', icon: 'code-slash', link: '/testingUi' },
        
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
    toggleCollapse() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
      this.$emit( 'update:sidebarWidth', this.sidebarWidth );
    },
    isActive(route) {
      return this.$route.path === route;
    }
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

  background-color: #FBA834;
  color: #F6F5F5;
  position: fixed;
  top: 0;
  left: 0;
  overflow-x: hidden;
  overflow-y: auto;
  transition: width 0.5s ease;
  text-align: left;
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
  padding-left: 2rem;
}

.sidebar .custom-nav-item a {
  margin-bottom: 0.4rem;
  border-radius: 0.4rem;
}

.sidebar .custom-nav-item a:hover {
  background-color: #FDBF60;
  border-radius: 0.4rem;
  color: #F6F5F5;
  padding: auto 1rem;
}

.sidebar .custom-nav-item.active a {
  background-color: #FDBF60;
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

.sidebar-text {
  margin-left: 10px;
  color: #F6F5F5;
}

.sidebar .collapse-icon {
  font-size: 20px;
  cursor: pointer;
  position: absolute;
  top: 10px;
  right: 10px;
}

.sidebar.collapsed .collapse-icon {
  position: relative;
  top: 0;
  right: 0;
}

.sidebar-icon {
  color: #F6F5F5;
}

</style>
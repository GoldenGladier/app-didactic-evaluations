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
        <b-nav vertical>
          <b-nav-item v-for="item in items" :key="item.id" :to="item.link">
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
      items: [
        { id: 1, text: 'Inicio', icon: 'house-door', link: '/inicio' },
        { id: 2, text: 'Mis evaluaciones', icon: 'card-checklist', link: '/mis-evaluaciones' },
        { id: 3, text: 'Crear evaluación', icon: 'plus-circle', link: '/crear-evaluacion' },
        { id: 4, text: 'Unirse', icon: 'play', link: '/unirse' },
        // Agrega más ítems aquí según tu necesidad
      ]
    }
  },
  computed: {
    sidebarWidth() {
      return this.sidebarCollapsed ? '50px' : '250px';
    }
  },
  methods: {
    toggleCollapse() {
      this.sidebarCollapsed = !this.sidebarCollapsed;
    }
  }
}
</script>

<style scoped>
.sidebar {
  width: 250px;
  height: 100%;
  background-color: #f8f9fa;
  position: fixed;
  top: 0;
  left: 0;
  overflow-x: hidden;
  overflow-y: auto;
  transition: width 0.5s ease;
  text-align: left;
}

.extra-nav-item {
  padding: 0.5rem 1rem;
}

.sidebar.collapsed {
  width: 50px;
}

.sidebar-text {
  margin-left: 10px;
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
  margin-right: 10px;
}

li .sidebar-icon {
  margin-right: 0;
}

</style>
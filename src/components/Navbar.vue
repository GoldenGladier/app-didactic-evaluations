<template>
  <b-navbar toggleable="md" type="dark" variant="dark">
    <b-navbar-toggle @click="toggleSidebar" target="sidebar"></b-navbar-toggle>
    <b-navbar-brand href="#">Mi aplicación</b-navbar-brand>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar',
  methods: {
    toggleSidebar() {
      // Emitir un evento para mostrar el sidebar cuando se hace clic en el botón de menú
      this.$emit('show-sidebar');
    }
  }
};
</script>
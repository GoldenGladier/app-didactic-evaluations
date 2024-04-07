<template>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-container class="px-0">
      <b-navbar-brand href="#" class="mr-auto px-2">Mi Aplicación</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="/home">
            <b-icon icon="house"></b-icon> Inicio
          </b-nav-item>
          <b-nav-item href="#">
            <b-icon icon="info"></b-icon> Acerca de
          </b-nav-item>
          <b-nav-item href="/about">
            <b-icon icon="people"></b-icon> About Us
          </b-nav-item>          
          <!-- Puedes agregar más elementos de navegación aquí -->
        </b-navbar-nav>

        <!-- Esto es opcional, puedes agregar más elementos en el navbar -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item href="#">
            <b-icon icon="person"></b-icon> Iniciar sesión
          </b-nav-item>
        </b-navbar-nav>
      </b-collapse>
    </b-container>
  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>
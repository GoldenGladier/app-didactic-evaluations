<template>
  <div>
    <b-container class="mt-4">
      <b-row>
        <b-col cols="12" class="text-center">
          <h1>Bienvenido a la Página de Inicio</h1>
          <p>¡Haz clic en el botón para ir a la página "About"!</p>
          <b-button @click="redirectToAbout" variant="primary">Ir a About</b-button>

          <b-dropdown id="dropdown-dropleft" offset="-100" text="Drop-Left" variant="primary" class="ml-1">
            <b-dropdown-item href="#">Action</b-dropdown-item>
            <b-dropdown-item href="#">Another action</b-dropdown-item>
            <b-dropdown-item href="#">Something else here</b-dropdown-item>
          </b-dropdown>          
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  methods: {
    redirectToAbout() {
      this.$router.push({ name: 'About' });
    }
  }
}
</script>
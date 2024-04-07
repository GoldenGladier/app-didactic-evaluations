<template>
  <div>
    <b-container class="mt-4">
      <b-row>
        <b-col cols="12" class="text-center">
          <h1>Bienvenido a la Página de Inicio</h1>
          <p>¡Haz clic en el botón para ir a la página "About"!</p>
          <b-button @click="redirectToAbout" variant="primary">Ir a About</b-button>
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
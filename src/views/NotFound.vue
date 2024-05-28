<!-- src/components/NotFound.vue -->

<template>
  <div class="not-found">
    <b-container class="text-center">
      <b-row class="align-items-center justify-content-center">
        <b-col md="6">
          <img src="/img/dog-404.png" alt="404 Not Found" class="img-fluid mb-4">
          <h1 class="display-4">Oops! Página no encontrada</h1>
          <p class="lead">Lo sentimos, pero la página que buscas no existe.</p>
          <b-button variant="primary" @click="$router.push('/')"><i class="bi bi-house-door"></i>Volver al Inicio</b-button>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  name: 'NotFound'
};
</script>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f8f9fa;
}

.img-fluid {
  max-width: 100%;
  height: auto;
}

.display-4 {
  font-weight: 300;
  color: var(--acivity-border-color);
}

.lead {
  color: var(--acivity-border-color);
}
</style>
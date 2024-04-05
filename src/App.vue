<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <b-row>
      <b-col col="3">1</b-col>
      <b-col col="3">2</b-col>
      <b-col col="3">3</b-col>
      <b-col col="3">4</b-col>
    </b-row>
    <div>
      <b-container>
        <b-row>
          <b-col cols="6">
            <div class="bg-primary text-white p-3">Columna 1</div>
            <b-button variant="primary" class="mt-1 mb-1">Botón Primario</b-button>
          </b-col>
          <b-col cols="6">
            <div class="bg-secondary text-white p-3">Columna 2</div>
            <b-button variant="secondary" class="mt-1 mb-1">Botón Secundario</b-button>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
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
  margin-top: 60px;
}
</style>

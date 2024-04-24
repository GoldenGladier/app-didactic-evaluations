<template>
  <div class="search-bar-container">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search"
      @input="handleSearch"
      class="round-input"
    />
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      searchQuery: ''
    };
  },
  methods: {
    handleSearch() {
      // Emitir un evento con el término de búsqueda
      this.$emit('search', this.searchQuery);
    }
  }
};
</script>
  
<style scoped>
  /* Estilos para el campo de búsqueda redondo */
  .round-input {
    padding: 8px;
    width: auto ;
    border: 1px solid #ccc;
    border-radius: 20px; /* Ajusta el valor de border-radius según prefieras */
    outline: none; /* Eliminar el borde de enfoque predeterminado */
  }
  
  /* Estilos para el contenedor del componente */
  div {
    text-align: center; /* Alineación centrada del campo de búsqueda */
  }
</style>
  
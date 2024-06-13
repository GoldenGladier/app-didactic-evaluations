<template>
  <div class="search-bar-container custom-center-flex">
    <b-input
      type="text"
      v-model="searchQuery"
      placeholder="Buscar"
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
      this.$emit('search', this.searchQuery);
    }
  }
};
</script>
  
<style scoped>
  .search-bar-container {
    margin: auto;
  }
  .round-input {
    padding: 8px;
    width: auto ;
    border: 1px solid #ccc;
    border-radius: 0.4rem;
    outline: none;
  }
  
  div {
    text-align: center; 
  }
</style>
  
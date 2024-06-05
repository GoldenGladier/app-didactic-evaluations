<template>
  <div class="mt-3">
    <p>{{ `${numQuestion}. ${question}` }}</p>
    <draggable v-model="localItems" :group="{ name: 'items', pull: false, put: false }" :id="'items-list-'+numQuestion" @start="drag=true" @end="onDragEnd">
      <span class="custom-span-drag" v-for="(element, index) in localItems" :key="index">{{element.oracion}}</span>
    </draggable>
  </div>
</template>
  
<script>
import draggable from 'vuedraggable';

export default {
  name: 'SortItems',
  components: {
    draggable
  },
  props: {
    numQuestion: null,
    question: null,
    items: Array,
    initialOrder: Array // Nuevo prop para almacenar el orden inicial
  },
  data() {
    return {
      drag: false,
      localItems: [] // Usaremos esta copia local de items
    };
  },
  methods: {
    onDragEnd() {
      const order = this.localItems.map(item => item.orden);
      this.$emit('update-response', order);
    }
  },
  created() {
    // Copiar items en localItems
    this.localItems = [...this.items];
    // Emitir el orden inicial al inicio
    this.$emit('update-response', this.initialOrder);
  }
};
</script>

<style scoped>
.custom-span-drag {
  display: block;
  margin: 0.2rem;
  padding: 0.4rem 0.6rem;
  border-radius: 0.4rem;
  border: 1px solid #ccc;
  cursor: pointer;
}
.custom-span-drag:hover {
  background: #f9e1dc;
}
</style>

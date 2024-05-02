<template>
    <div class="mt-3">
        <p>Arrasta las palabras y ordenalas en el orden adecuado: </p>

        <draggable v-model="items" group="people" @start="drag=true" @end="drag=false">
            <span class="custom-span-drag" v-for="element in items" :key="element.id">{{element.name}}</span>
        </draggable>

        <b-button type="submit" variant="primary" class="mt-3" @click="Ok">Guardar</b-button>

    </div>
</template>
  
<script>
import draggable from 'vuedraggable'
  
  export default {
    components: {
        draggable
    },
    data() {
        return {
            items: [
                { name: "Complejidad 1"},
                { name: "Complejidad 2"},
                { name: "Complejidad 3"},
                { name: "Complejidad 4"},
                { name: "Complejidad 5"},
            ]
      };
    },
    methods: {
      Ok() {
          console.log("My array: ", this.myArray)
          let answer = this.myArray.map(obj => obj.name).join(" ").trim();
          console.log("My final response: ", answer)
      }
    },
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


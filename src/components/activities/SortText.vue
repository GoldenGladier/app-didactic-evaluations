<template>
    <div class="mt-3">
        <p>Arrasta las palabras y ordenalas para crear el enunciado correcto: </p>

        <draggable v-model="myArray" group="people" @start="drag=true" @end="drag=false">
            <span class="custom-span-drag" v-for="element in myArray" :key="element.id">{{element.name}}</span>
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
            myArray: [
                { name: "Un", index: 0 },
                { name: "robot", index: 1 },
                { name: "no", index: 2 },
                { name: "hará", index: 3 },
                { name: "daño", index: 4 },
                { name: "a", index: 5 },
                { name: "un", index: 6 },
                { name: "ser", index: 7 },
                { name: "humano,", index: 8 },
                { name: "ni", index: 9 },
                { name: "por", index: 10 },
                { name: "inacción", index: 11 },
                { name: "permitirá", index: 12 },
                { name: "que", index: 13 },
                { name: "un", index: 14 },
                { name: "ser", index: 15 },
                { name: "humano", index: 16 },
                { name: "sufra", index: 17 },
                { name: "daño", index: 18 }
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


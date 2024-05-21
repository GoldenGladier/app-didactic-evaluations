<template>
    <div class="mb-4">
        <p><span v-if="index">{{ index }}.</span> Arrasta las palabras y ordenalas para crear el enunciado correcto: </p>

        <draggable v-model="textAnswer" :key="`draggable-${index}`" :group="`group-${index}`" @start="drag=true" @end="drag=false" @input="emitResponse">
            <span class="custom-span-drag" v-for="element in textAnswer" :key="element.id">{{element.name}}</span>
        </draggable>

    </div>
</template>
  
<script>
import draggable from 'vuedraggable'
  
  export default {
    components: {
      draggable
    },
    props: {
      text: null,
      index: null
    },
    data() {
      return {
        textAnswer: null, 
      };
    },
    methods: {
      Ok() {
          console.log("My array: ", this.myArray)
          let answer = this.myArray.map(obj => obj.name).join(" ").trim();
          console.log("My final response: ", answer)
      },
      emitResponse() {
        let newOrderText = this.textAnswer.map(obj => obj.name).join(" ").trim();
        console.log("Respuesta: ", newOrderText)
        this.$emit('update-response', newOrderText);
      }      
    },
    watch: {
      text: {
        handler(newText) {
          console.log("El nuevo texto es: ", newText);
          this.textAnswer = newText;
        },
        immediate: true
      }
    },
  };
  </script>

  <style scoped>
  .custom-span-drag {
    display: inline-block;
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


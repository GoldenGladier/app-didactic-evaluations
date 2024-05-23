<template>
    <div class="mb-4">
        <p><span v-if="index">{{ index }}.</span> Arrasta los bloques de palabras y ordenalas para crear el enunciado correcto: </p>

        <p class="mt-3 mb-0" :class="{ 'text-success': answer.correcta, 'text-danger': !answer.correcta }">
          <i class="bi bi-check2 icon-check text-success" v-if="answer.correcta"></i> 
          <i class="bi bi-x-lg text-danger" v-else></i>          
          Tu respuesta es <span>{{ answer.correcta ? 'correcta' : 'incorrecta' }}:</span>
        </p>
        <draggable v-if="!answer.correcta" v-model="userAnswer" :key="`draggable-user-answer-${index}`" :group="`group-${index}`" :disabled="true" >
            <span class="custom-span-drag custom-span-danger" v-for="element in userAnswer" :key="element.id">{{element.name}}</span>
        </draggable>

        <p v-if="!answer.correcta" class="mt-3 mb-0 text-success">La respuesta correcta es: </p>
        <draggable v-model="correctAnswer" :key="`draggable-correct-answer-${index}`" :group="`group-${index}`" :disabled="true" >
            <span class="custom-span-drag custom-span-success" v-for="element in correctAnswer" :key="element.id">{{element.name}}</span>
        </draggable>        

    </div>
</template>
  
<script>
import draggable from 'vuedraggable'
  
  export default {
    name: 'SortTextAnswersReview',
    components: {
      draggable
    },
    props: {
      answer: {},
      userAnswer: {},
      correctAnswer: {},
      index: null
    },
    data() {
      return {
        textAnswer: null, 
      };
    },
    methods: {
      createWordFormatArray(array) {
          let newArray = []
          array.forEach((word, index) => {
              const item = {
                  name: word, 
                  index: index
              }
              newArray.push(item);
          });
          return newArray;
      },     
    },
    watch: {
      answer: {
        handler(newAnswer) {
          this.textAnswer = newAnswer;
        },
        immediate: true
      }
    },
  };
  </script>

  <style scoped>
  .icon-check {
    font-size: 20pt;
  }

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

  .custom-span-danger, .custom-span-danger:hover {
    border: 1px solid var(--danger);
    background-color: rgba(255, 200, 200, 0.4);
  }
  .custom-span-success, .custom-span-success:hover {
    border: 1px solid var(--success);
    background-color: rgba(200, 255, 200, 0.4);
  }  
  </style>


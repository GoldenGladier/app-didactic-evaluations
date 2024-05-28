<template>
  <b-container class="custom-master-container custom-card-box">

    <!-- <div class="form-container"> -->
      <b-overlay :show="isLoading" class="width-100">      
        <b-container >  
          <b-row class="justify-content-center">

            <b-col cols="12" class="my-5">
                <h3>The Best Crossword</h3>
                <CreateCrosswordWrapper :exampleWordsList="words" :modeRespondActivity="true"
                 :showAnswers="showAnswers"></CreateCrosswordWrapper>
            </b-col>
            
            <!-- <b-col cols="12" class="my-5">
                <h3>Crossword Puzzle Generator</h3>
                <CrossUlu :words="words"
                 :showAnswers="showAnswers"></CrossUlu>
                <button @click="toggleShowAnswers">Mostrar/Ocultar Respuestas</button>
            </b-col> -->

            <!-- <b-col cols="12" class="my-5">
                <h3>Crossword Puzzle Generator</h3>
                <crossword-generator2 :words="['estrella', 'astronauta', 'nebulosa', 'galaxia', 'satélite', 'cohete', 'orbita', 'planeta']"
                 :showAnswers="showAnswers"></crossword-generator2>
                <button @click="toggleShowAnswers">Mostrar/Ocultar Respuestas</button>
            </b-col> -->

            <!-- <b-col cols="12" class="my-5">
                <crossword-generator :words="['estrella', 'astronauta', 'nebulosa', 'galaxia', 'satélite', 'cohete', 'orbita', 'planeta']" :showAnswers="showAnswers"></crossword-generator>
                <button @click="toggleShowAnswers">Mostrar/Ocultar Respuestas</button>
            </b-col> -->
            <b-col cols="12" class="my-5">
                <h3>Sort Text</h3>
                <SortText />
            </b-col>          
            <b-col cols="12" class="my-5">
                <h3>Sort Items</h3>
                <SortItems />
            </b-col>                 

          </b-row>
        </b-container>
      </b-overlay>
    <!-- </div> -->

  </b-container>
</template>

<script>
// import CrosswordGenerator from '@/components/activities/Games/Crossword.vue';
// import CrossUlu from '@/components/activities/Games/UluCross/CrossUlu.vue';
import CreateCrosswordWrapper from '@/components/activities/Crossword/CreateCrosswordWrapper.vue';
// import CrosswordGenerator2 from '@/components/activities/Games/CrosswordTest/Crossword2.vue';
import SortText from '@/components/activities/SortText.vue';
import SortItems from '@/components/activities/SortItems.vue';

export default {
  components: {
    CreateCrosswordWrapper,
    // CrossUlu,
    // CrosswordGenerator2,
    SortText,
    SortItems
  },
  data() {
    return {
      isLoading: false,
      showAnswers: false,
words: [
    {
        respuesta: 'bucle',
        idPregunta: 1,
        pregunta: 'Estructura que repite una secuencia de instrucciones'
    },
    {
        respuesta: 'recursividad',
        idPregunta: 2,
        pregunta: 'Proceso en el que una función se llama a sí misma'
    },
    {
        respuesta: 'algoritmo',
        idPregunta: 3,
        pregunta: 'Conjunto de pasos ordenados para resolver un problema'
    },
    {
        respuesta: 'pseudocodigo',
        idPregunta: 4,
        pregunta: 'Representación simplificada de un algoritmo'
    },
    {
        respuesta: 'ordenacion',
        idPregunta: 5,
        pregunta: 'Proceso de organizar datos en un orden específico'
    },
    {
        respuesta: 'busqueda',
        idPregunta: 6,
        pregunta: 'Proceso de encontrar un elemento dentro de una estructura de datos'
    },
    {
        respuesta: 'arbol',
        idPregunta: 7,
        pregunta: 'Estructura de datos jerárquica con nodos y conexiones'
    },
    {
        respuesta: 'grafo',
        idPregunta: 8,
        pregunta: 'Conjunto de nodos conectados por aristas'
    },
    {
        respuesta: 'heuristica',
        idPregunta: 9,
        pregunta: 'Método para resolver problemas de manera aproximada y eficiente'
    },
    {
        respuesta: 'backtracking',
        idPregunta: 10,
        pregunta: 'Técnica para encontrar soluciones mediante prueba y error'
    }
]

    }
  },
  methods: {
    toggleShowAnswers() {
      this.showAnswers = !this.showAnswers;
    },
  },  
}
</script>

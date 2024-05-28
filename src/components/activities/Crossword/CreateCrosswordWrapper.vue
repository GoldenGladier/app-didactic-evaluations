<template>
  <div>
    <div id="grid" class="grid-container">

        <!-- Form para agregar palabras y pistas -->
        <b-form @submit.prevent="addWord" class="my-2 px-0">
            <b-row class="px-0">
                <b-col cols="12" md="4">
                    <b-form-group label="Palabra">
                        <b-form-input v-model="newWord.respuesta" required></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="12" md="5">
                    <b-form-group label="Pista">
                        <b-form-input v-model="newWord.pregunta" rows="1" max-rows="5" required></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="12" md="3" class="d-flex align-items-end justify-content-center">
                    <b-button type="submit" variant="success" class="custom-center-flex mb-3">
                        <i class="bi bi-plus-circle" style="font-size: 100%"></i>Agregar palabra
                    </b-button>                  
                </b-col>
                <b-col cols="12" class="custom-center-flex">
                    <b-button variant="warning" class="custom-center-flex" @click="words = exampleWordsList">
                        <i class="bi bi-code" style="font-size: 150%"></i>Ejemplo algoritmos
                    </b-button>  
                </b-col>
            </b-row>
        </b-form>

        <!-- Tabla para mostrar palabras y pistas -->
        <div class="my-3">
            <b-table :items="words" :fields="fields" responsive="sm" class="table-fixed table-align-middle" striped bordered borderless small>
                <template #cell(actions)="data">
                    <b-button size="sm" variant="danger" @click="removeWord(data.index)">
                        <i class="bi bi-trash"></i> Eliminar
                    </b-button>
                </template>
            </b-table>
        </div>

        <div class="my-1">
            <!-- Botón para generar la mejor opción -->
            <span class="d-inline-block" tabindex="0" v-b-tooltip.top :title="(words.length < 2) ? 'Debe agregar mínimo 2 palabras para crear un crucigrama.' : 'Genera el mejor crucigrama según nuestra recomendación, basado en un algoritmo eficiente.'">
                <b-button variant="primary" class="mr-2 my-1" @click="generateBestOption" :disabled="words.length < 2">
                    <i class="bi bi-star-fill"></i> Generar opción recomendada
                </b-button>
            </span>

            <!-- Botón para generar otras opciones -->
            <span class="d-inline-block" tabindex="0" v-b-tooltip.top :title="(words.length < 2) ? 'Debe agregar mínimo 2 palabras para crear un crucigrama.' : 'Genera el mejor crucigrama según nuestra recomendación, basado en un algoritmo eficiente.'">
                <b-button variant="secondary" class="ml-2 my-1" @click="generateOtherOptions" :disabled="words.length < 2">
                    <i class="bi bi-shuffle"></i> Generar otras opciones
                </b-button>
            </span>            

            <b-button v-if="grid.length" variant="light" class="ml-3 my-1" @click="modeRespondActivity = !modeRespondActivity" >
                <span v-if="modeRespondActivity"><i class="bi bi-eye"></i>Ver respuestas</span>
                <span v-else><i class="bi bi-eye-slash"></i>Ocultar respuestas</span>                
            </b-button>      
        </div>           


        <b-row>
            <b-col cols="12" class="d-flex justify-content-center align-items-center p-0 p-md-3">
                <CrosswordBoard :grid="grid" :gridRows="gridRows" :gridCols="gridCols" :answers.sync="answers" :modeRespondActivity="modeRespondActivity" />
            </b-col>

            <!-- Lista de palabras verticales -->
            <b-col v-if="verticalClues.length" cols="12" md="6" class="my-2">
                <h3>Pistas Verticales</h3>
                <div style="display: inline-block">
                    <div  v-for="(clue, index) in verticalClues" :key="'word-vertical-'+index">
                    {{ `${clue.position}. ${clue.clue}` }}
                    </div >
                </div>
            </b-col>
            
            <!-- Lista de palabras horizontales -->
            <b-col v-if="horizontalClues.length" cols="12" md="6" class="my-2">
                <h3>Pistas Horizontales</h3>
                <div style="display: inline-block">
                    <div  v-for="(clue, index) in horizontalClues" :key="'word-horizontal-'+index">
                    {{ `${clue.position}. ${clue.clue}` }}
                    </div >
                </div>
            </b-col>
        </b-row>

    </div>    
  </div>
</template>

<script>
import clg from "crossword-layout-generator";
import { createCrossword } from 'ulu-crossword';

import CrosswordBoard from '@/components/activities/Crossword/CrosswordBoard.vue';

export default {
    name: "CreateCrosswordWrapper",
    components: {
        CrosswordBoard
    },
    props: {
        exampleWordsList: [], 
    },
    data() {
        return {                
            gridRows: 0,
            gridCols: 0,

            grid: [],
            answers: [],
            verticalClues: [],
            horizontalClues: [],
            newWord: {
                respuesta: '',
                pregunta: ''
            },
            words: [],      
            fields: [
                { key: 'respuesta', label: 'Palabra' },
                { key: 'pregunta', label: 'Pista' },
                { key: 'actions', label: 'Acciones' }
            ],
            modeRespondActivity: false,                 
        }
    },
    methods: {
        addWord() {
            if (this.newWord.respuesta && this.newWord.pregunta) {
                this.words.push({
                    respuesta: this.newWord.respuesta.trim(),
                    pregunta: this.newWord.pregunta.trim(),
                    idPregunta: this.words.length,
                });
                this.newWord.respuesta = '';
                this.newWord.pregunta = '';
            }
        },  
        removeWord(index) {
            this.words.splice(index, 1);
        },              
        transformWordsToClues(wordsArray) {
            return wordsArray.map(word => ({
                clue: word.pregunta,
                answer: word.respuesta
            }));
        },  
        generateBestOption(){
            const clues = this.transformWordsToClues(this.words);
            // console.log("Clues: ", clues);
            const layout = clg.generateLayout(clues);        
            this.answers = layout.result;      

            this.gridRows = layout.rows;
            this.gridCols = layout.cols;
            this.grid = layout.table;       

            // console.log("grid: ");
            // console.log(this.grid);
            
            this.verticalClues = this.answers.filter(word => word.orientation === 'down');
            this.horizontalClues = this.answers.filter(word => word.orientation === 'across');
        },
        generateOtherOptions() {
            // console.log("Enviendo las words: ", this.words);
            const gridSize = this.calculateGridSize();
            // console.log("GridSize: ", gridSize);
            
            const layout = createCrossword({ words: this.words, gridSize: gridSize, print: true, tries: 75 });

            if(layout) {
                // console.log("Info layaut: ", layout);

                // console.log("Probando creador de grid: ");
                this.gridRows = gridSize;
                this.gridCols = gridSize;            
                this.grid = this.createGrid(gridSize, layout);
                // console.log(this.grid);
                
                this.answers = this.transformUluToAnswersFormat(layout);
                // console.log("Answers: ", this.answers)
                this.verticalClues = this.answers.filter(word => word.orientation === 'down');
                this.horizontalClues = this.answers.filter(word => word.orientation === 'across');                
            }
            else {
                console.error("No se pudo generar el crucigrama.")
            }
        },
        transformUluToAnswersFormat(layout) {
            return layout.map((item) => {
                const orientation = item.orientacion === "horizontal" ? "across" : "down";
                // const startx = orientation === "across" ? item.x + 1 : item.x;
                // const starty = orientation === "across" ? item.y : item.y + 1;
                const startx = item.x + 1;
                const starty = item.y + 1;                
                return {
                    clue: item.pregunta,
                    answer: item.respuesta,
                    startx: startx,
                    starty: starty,
                    orientation: orientation,
                    position: item.idPregunta + 1
                };
            });
        },  
        createGrid(gridSize, layout) {
            // Inicializar el grid con '-' en todas las posiciones
            const grid = Array.from({ length: gridSize }, () => Array.from({ length: gridSize }, () => '-'));

            // Colocar cada letra en su lugar en el grid
            layout.forEach(word => {
                const x = word.x;
                const y = word.y;
                const wordChars = word.respuesta.split('');
                const orientation = word.orientacion;

                for (let i = 0; i < wordChars.length; i++) {
                    if (orientation === "horizontal") {
                        grid[y][x + i] = wordChars[i];
                    } else {
                        grid[y + i][x] = wordChars[i];
                    }
                }
            });
            return grid;
        },
        calculateGridSize() {
            let longestWordLength = 0;
            this.words.forEach(word => {
                if (word.respuesta.length > longestWordLength) {
                    longestWordLength = word.respuesta.length;
                }
            });    
            return longestWordLength + 4;        
        }
    },
}
</script>

<style scoped>

</style>
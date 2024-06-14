<template>
  <b-container>
    <b-button class="help-button" @click="startTutorial"
      v-b-tooltip.hover.top="'Haz clic aquí para recibir un tutorial sobre cómo crear un crucigrama.'" >
      <i class="bi bi-question-circle"></i>Ayuda
    </b-button>  

    <div id="grid" class="grid-container">
        <h1 v-if="evaluationData">{{ evaluationData.nombre }}</h1>

        <!-- Form para agregar palabras y pistas -->
        <h3>Crear crucigrama</h3>
        <p>Ingresa las palabras y pistas en el formulario para generar tu crucigrama.</p>
        <!-- Sección de Aviso sobre formato de palabras -->
        <b-alert show dismissible variant="info" class="mb-4">
            <i class="bi bi-info-circle-fill"></i>Todas las palabras agregadas serán convertidas a <strong>mayúsculas</strong>, se les quitarán los <strong>espacios</strong>, los <strong>acentos</strong> y los <strong>caracteres especiales</strong> para generar un mejor crucigrama.
        </b-alert>

        <b-form @submit.prevent="addWord" class="my-2 px-0">
            <b-row class="px-0">
                <b-col cols="12" md="4">
                    <b-form-group label="Palabra" label-for="respuesta" class="required-label">
                        <b-form-input v-model="newWord.respuesta" id="respuesta" placeholder="Ingresa una palabra" required></b-form-input>
                    </b-form-group>                 
                </b-col>
                <b-col cols="12" md="5">
                    <b-form-group label="Pista" label-for="pregunta" class="required-label" >
                        <b-form-input v-model="newWord.pregunta" id="pregunta" placeholder="Ingresa una pista para adivinar la palabra" required></b-form-input>
                    </b-form-group>
                </b-col>
                <b-col cols="12" md="3" class="d-flex align-items-end justify-content-center">
                    <b-button type="submit" variant="success" class="custom-center-flex mb-3" id="btn-agregar-palabra">
                        <i class="bi bi-plus-lg"></i>Agregar palabra
                    </b-button>                  
                </b-col>
            </b-row>
        </b-form>

        <!-- Tabla para mostrar palabras y pistas -->
        <div class="my-3" id="lista-palabras">
            <h4>Lista de palabras para crear el crucigrama</h4>
            <b-alert v-if="!words.length" variant="warning" show dismissible> <i class="bi bi-exclamation-triangle-fill"></i>Aún no hay palabras agregadas para crear el crucigrama. Debes agregar mínimo dos palabras para poder crear un crucigrama.</b-alert>            
            <b-table :items="words" :fields="fields" responsive="sm" class="table-fixed table-align-middle" 
                empty-text="Aún no hay palabras agregadas para crear el crucigrama" striped bordered borderless small>
                <template #cell(actions)="data">
                    <b-button size="sm" variant="danger" @click="removeWord(data.index)">
                        <i class="bi bi-trash"></i>Eliminar
                    </b-button>
                </template>
            </b-table>
        </div>

        <div class="my-1" id="btn-container">
            <!-- Botón para generar la mejor opción -->
            <span class="d-inline-block" tabindex="0" v-b-tooltip.top :title="(words.length < 2) ? 'Debes agregar mínimo 2 palabras para crear un crucigrama.' : 'Genera la mejor opción de crucigrama según nuestro algoritmo.'">
                <b-button variant="primary" id="btn-generar-mejor-opcion" class="mr-2 my-1" @click="generateBestOption" :disabled="words.length < 2">
                    <i class="bi bi-star-fill"></i> Generar opción recomendada
                </b-button>
            </span>
            <!-- Botón para generar otras opciones -->
            <span class="d-inline-block" tabindex="0" v-b-tooltip.top :title="(words.length < 2) ? 'Debes agregar mínimo 2 palabras para crear un crucigrama.' : 'Genera otros crucigramas alternativos.'">
                <b-button variant="secondary" id="btn-generar-otras-opciones" class="ml-2 my-1" @click="generateOtherOptions" :disabled="words.length < 2">
                    <i class="bi bi-shuffle"></i> Generar otras opciones
                </b-button>
            </span>            
            <b-button v-if="grid.length" variant="light" id="btn-ver-respuestas" class="ml-3 my-1" @click="modeRespondActivity = !modeRespondActivity" >
                <span v-if="modeRespondActivity"><i class="bi bi-eye"></i>Ver respuestas</span>
                <span v-else><i class="bi bi-eye-slash"></i>Ocultar respuestas</span>                
            </b-button>      
        </div>           


        <b-row id="grid-crucigrama">
            <b-col cols="12" class="d-flex justify-content-center align-items-center p-0 p-md-3">
                <CrosswordBoard :grid="grid" :gridRows="gridRows" :gridCols="gridCols" :answers.sync="answers" :modeRespondActivity="modeRespondActivity" />
            </b-col>

            <!-- Lista de palabras verticales -->
            <b-col v-if="verticalClues.length" cols="12" md="6" class="my-2">
                <h3>Pistas verticales</h3>
                <div style="display: inline-block">
                    <div  v-for="(clue, index) in verticalClues" :key="'word-vertical-'+index">
                    {{ `${clue.position}. ${clue.clue}` }}
                    </div >
                </div>
            </b-col>
            
            <!-- Lista de palabras horizontales -->
            <b-col v-if="horizontalClues.length" cols="12" md="6" class="my-2">
                <h3>Pistas horizontales</h3>
                <div style="display: inline-block">
                    <div  v-for="(clue, index) in horizontalClues" :key="'word-horizontal-'+index">
                    {{ `${clue.position}. ${clue.clue}` }}
                    </div >
                </div>
            </b-col>        
        </b-row>

        <b-row class="justify-content-center">
            <b-col md="6" sm="12" class="custom-center-flex">
                <b-button type="submit" variant="success" class="custom-button-icon" id="save-activities" :disabled="!grid.length" @click="saveActivities">
                    <i class="bi bi-floppy"></i>Guardar crucigama
                </b-button>
            </b-col>          
        </b-row>        

    </div>    
  </b-container>
</template>

<script>
import driverMixin from '@/mixins/driverMixin';
import ActivityService from '@/services/ActivityService';
import clg from "crossword-layout-generator";
import { createCrossword } from 'ulu-crossword';

import CrosswordBoard from '@/components/activities/Crossword/CrosswordBoard.vue';

export default {
    name: "CreateCrosswordWrapper",
    mixins: [driverMixin],
    components: {
        CrosswordBoard
    },
    props: {
        evaluationData: null,
        isLoading: {
            type: Boolean,
            required: true
        },
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
                const normalizedWord = this.newWord.respuesta
                    .replace(/\s+/g, '') // Quitar espacios
                    .toUpperCase() // Convertir a mayúsculas
                    .normalize("NFD") // Normalizar la cadena
                    .replace(/[\u0300-\u036f]/g, '') // Quitar diacríticos (acentos)
                    .replace(/[^A-Z0-9]/g, ''); // Quitar guiones, caracteres especiales y mantener sólo letras y números

                this.words.push({
                    respuesta: normalizedWord,
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
        },

        saveActivities() {
            this.$emit('update:isLoading', true);
            
            const preguntas = this.answers.map(answer => {
                return {
                    clue: answer.clue,
                    answer: answer.answer,
                    startX: answer.startx,
                    startY: answer.starty,
                    orientation: answer.orientation,
                    position: answer.position
                };
            });      

            const activitiesToSave = {
                idEvaluacion: this.evaluationData.id_evaluaciones,
                gridCols: this.gridCols,
                gridRows: this.gridRows,
                answers: preguntas
            }
            console.log("Crucigrama a guardar: ")
            console.log(activitiesToSave)

            ActivityService.addActivitiesCrossword(activitiesToSave)
            .then(() => {
                this.$swal({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'El crucigrama fue guardado correctamente.',
                }).then(() => {
                    this.$router.push('/evaluaciones/mis-evaluaciones');
                });
            })
            .catch(error => {
                console.error('Error al intentar guardar el crucigrama:', error);
                this.$swal({
                    icon: 'error',
                    title: '¡Error!',
                    text: 'Hubo un error al guardar el crucigrama.',
                });
            })
            .finally(() => {
                this.$emit('update:isLoading', false);
            });                
        },

        startTutorial() {
            this.startTour([
                {
                    element: '#respuesta',
                    popover: {
                        title: 'Paso 1: Ingresar Palabras y Pistas',
                        description: 'Ingresa una palabra que formará parte del crucigrama.',
                        position: 'top',
                    },
                },
                {
                    element: '#pregunta',
                    popover: {
                        title: 'Paso 1: Ingresar Palabras y Pistas',
                        description: 'Proporciona una pista clara y concisa que los alumnos verán.',
                        position: 'top',
                    },
                },     
                {
                    element: '#btn-agregar-palabra',
                    popover: {
                        title: 'Paso 1: Ingresar Palabras y Pistas',
                        description: 'Después de ingresar cada palabra y su pista, haz clic en el botón "<i class="bi bi-plus-lg"></i>Agregar palabra".',
                        position: 'top',
                    },
                },           
                {
                element: '#lista-palabras',
                    popover: {
                        title: 'Paso 2: Visualizar la Lista de Palabras',
                        description: 'Cada palabra que ingreses se añadirá a la Lista de palabras. Asegúrate de revisar esta lista para confirmar que todas las palabras y pistas están correctas.',
                        position: 'top',
                    },
                },  
                {
                element: '#btn-container',
                    popover: {
                        title: 'Paso 3: Generar el Crucigrama',
                        description: 'Una vez que hayas ingresado al menos dos palabras, los botones para generar el crucigrama se habilitarán.',
                        position: 'top',
                    },
                },   
                {
                element: '#btn-generar-mejor-opcion',
                    popover: {
                        title: 'Paso 3: Generar el Crucigrama',
                        description: 'Este botón generará la mejor opción de crucigrama según nuestro algoritmo.',
                        position: 'top',
                    },
                }, 
                {
                element: '#btn-generar-otras-opciones',
                    popover: {
                        title: 'Paso 3: Generar el Crucigrama',
                        description: 'Si no te gusta el resultado inicial, haz clic en este botón para explorar otras configuraciones de crucigama posibles hasta encontrar la que más te guste.',
                        position: 'top',
                    },
                },     
                {
                element: '#grid-crucigrama',
                    popover: {
                        title: 'Paso 4: Visualizar el Crucigrama',
                        description: 'El crucigrama generado aparecerá debajo de la lista de palabras. Revisa el diseño y asegúrate de que cumple con tus expectativas.',
                        position: 'top',
                    },
                },      
                {
                element: '#save-activities',
                    popover: {
                        title: 'Paso 5: Guardar el Crucigrama',
                        description: 'Cuando estés satisfecho con el crucigrama, simplemente haz clic en "<i class="bi bi-floppy"></i>Guardar crucigrama".',
                        position: 'top',
                    },
                },                                                                                                                                                          
            ]);
        },         
    },
}
</script>

<style>

</style>
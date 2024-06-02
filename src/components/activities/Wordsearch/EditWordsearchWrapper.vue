<template>
  <b-container class="create-wordsearch-wrapper">
    <b-button class="help-button" @click="startTutorial"
      v-b-tooltip.hover.top="'Haz clic aquí para recibir un tutorial sobre cómo crear una sopa de letras'" >
      <i class="bi bi-question-circle"></i>Ayuda
    </b-button>       
    
    <h1>{{ evaluationData.nombre }}</h1>
    <h3>Editar sopa de letras</h3>
    <p>Utiliza el siguiente formulario para crear tu sopa de letras.</p>

    <!-- Form para agregar palabras -->
    <b-form @submit.prevent="addWord" class="p-0 mb-3">
        <b-row class="align-items-center justify-content-center" >
            <b-col cols="12" md="5" class="px-0 px-md-1" >
                <b-form-group label="Palabra" label-for="input-palabra" class="required-label">
                    <b-form-input
                        v-model="newWord"
                        placeholder="Introduce una palabra"
                        id="input-palabra"                        
                        required
                    ></b-form-input>
                </b-form-group>  
            </b-col>
            <b-col cols="12" md="3" class="mt-md-3 px-0 px-md-1 custom-center-flex justify-content-md-start" >
                <b-button type="submit" variant="success" class="custom-center-flex" id="btn-agregar-palabra" block>
                    <i class="bi bi-plus-lg" style="font-size: 100%"></i>Agregar palabra
                </b-button>
            </b-col>
        </b-row>
    </b-form>    

    <!-- Tabla para mostrar las palabras de la sopa -->
    <b-row class="align-items-center justify-content-center">
        <b-col cols="12" md="5" class="px-0 px-md-1" id="tabla-palabras-sopa-letras">
            <h4>Lista de palabras para crear la sopa de letras</h4>
            <b-table v-if="words.length" :items="formattedWordsForTable" :fields="fields" responsive="sm"
                class="table-fixed table-align-middle" striped bordered borderless small>              
                <template #cell(palabra)="data">
                    {{ data.value.palabra }}
                </template>                
                <template #cell(actions)="data">
                    <!-- {{data.item.palabra.index}} -->
                    <b-button size="sm" variant="danger" @click="removeWord(data.item.palabra.index)">
                        <i class="bi bi-trash"></i>Eliminar
                    </b-button>
                </template>
            </b-table>     
            <b-alert v-else variant="warning" show dismissible> <i class="bi bi-exclamation-triangle-fill"></i>Aún no hay palabras agregadas para crear la sopa de letras. Debes agregar mínimo una palabra para poder crear un sopa de letras.</b-alert>                               
        </b-col>

        <b-col cols="12" class="px-0 px-md-1 d-flex justify-content-center" id="dimensiones">
            <b-form-group label="Columnas" label-for="gridCols" class="required-label mr-5">
                <b-form-spinbutton id="gridCols" v-model="gridCols" :min="longestWordLength" inline></b-form-spinbutton>
            </b-form-group>     
            <b-form-group label="Filas" label-for="gridRows" class="required-label">
                <b-form-spinbutton id="gridRows" v-model="gridRows" :min="longestWordLength" inline></b-form-spinbutton>
            </b-form-group>   
        </b-col>   
        <b-col cols="12" class="custom-center-flex">
            <b-button variant="warning" class="custom-center-flex" @click="generateWordsearch" :disabled="!words.length" id="btn-generar-sopa">
                <i class="bi bi-shuffle"></i>Generar ejemplo de sopa de letras
            </b-button>
        </b-col>             
    </b-row>       

    <!-- Tablero de sopa de letras -->
    <b-row class="my-3">        
        <b-col cols="12" class="p-0 pd-md-3">
            <h3>Ejemplo de tu sopa de letras</h3>
            <WordsearchBoardVue :words="words.map(word => { return word.palabra })" :gridCols="gridCols" :gridRows="gridRows" :puzzle="puzzle" />
        </b-col>
    </b-row>

    <b-row class="justify-content-center">
        <b-col md="6" sm="12" class="custom-center-flex">
            <b-button type="submit" variant="success" class="custom-button-icon" id="save-activities" :disabled="!words.length" @click="saveActivities">
                <i class="bi bi-floppy"></i> Guardar sopa de letras
            </b-button>
        </b-col>          
    </b-row>         

  </b-container>
</template>

<script>
import WordSearch from '@blex41/word-search';
import driverMixin from '@/mixins/driverMixin';
import ActivityService from '@/services/ActivityService';

import WordsearchBoardVue from './WordsearchBoard.vue';

export default {
    name: 'EditWordsearchWrapper',
    mixins: [driverMixin],
    components: {
        WordsearchBoardVue
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
            idEvaluation: null,
            fields: [
                { key: 'palabra', label: 'Palabra', tdClass: 'col-8' },
                { key: 'actions', label: '' }
            ],        
            newWord: null,
            wordsTest: ["GAME", "LEVEL", "QUEST", "BOSS", "PIXEL", "LOOT", "NPC", "HERO", "SPAWN", "GUILD"],
            words: [],
            longestWordLength: 1,
            gridCols: 10,
            gridRows: 10,
            grid: [],
            puzzle: null,
        };
    },
    methods: {
      initData() {
        this.$emit('update:isLoading', true);
        this.idEvaluation = this.$route.params.idEvaluation;
        
        ActivityService.getActivitiesWordsearch(this.idEvaluation)
        .then((response) => {
            console.log("Recivo del servicio: ", response, typeof(response));

            this.gridCols = response.activityInfo.board.columna;
            this.gridRows = response.activityInfo.board.fila;
            this.words = response?.activityInfo?.resultWordSearchEvaluation.map(word => {
                return {
                    palabra: word.palabra,
                    index: word.numPregunta
                };
            });
            this.generateWordsearch();

            console.log("Actividades: ", this.activities);
        })
        .catch(error => {
            console.error('Error al obtener las actividades de la evaluación:', error);
        })
        .finally(() => {
          this.$emit('update:isLoading', false);
        });   
      },
        addWord() {
            if (this.newWord) {
                // Quitar espacios, convertir a mayúsculas y eliminar acentos
                const normalizedWord = this.newWord
                    .replace(/\s+/g, '') // Quitar espacios
                    .toUpperCase() // Convertir a mayúsculas
                    .normalize("NFD") // Normalizar la cadena
                    .replace(/[\u0300-\u036f]/g, ''); // Quitar diacríticos (acentos)
                
                const highestIndex = this.words.reduce((max, word) => {
                    return word.index > max ? word.index : max;
                }, 0);
                const newIndex = highestIndex + 1;
                this.words.push({
                    palabra: normalizedWord,
                    index: newIndex,
                    isNew: true
                });                    

                this.newWord = null;
                this.updateGridDimensions();
                this.generateWordsearch();
            }
        },
        updateGridDimensions() {
            this.longestWordLength = Math.max(...this.words.map(word => word.palabra.length));
            console.log("longestWordLength: ", this.longestWordLength)
            if (this.longestWordLength > this.gridCols) {
                this.gridCols = this.longestWordLength;
            }
            if (this.longestWordLength > this.gridRows) {
                this.gridRows = this.longestWordLength;
            }
        },        
        removeWord(index) {    
            console.log('Buscando palabra con indice:  ', index)
            const wordToRemove = this.words.find(word => word.index === index);

            if (wordToRemove.isNew) {
                this.words = this.words.filter(word => word.index !== index);
                this.generateWordsearch();
            }
            else {
                this.$emit('update:isLoading', true);
                let wordData = {
                    idEvaluacion: this.idEvaluation,
                    numPregunta: index
                }
                console.log("Quiero eliminar la palabra: ", wordData);
                ActivityService.deleteWordFromWordsearch(wordData)
                .then((response) => {
                    console.log("La palabra se elimino correctamente: ", response);
                    this.words = this.words.filter(word => word.index !== index);
                    this.generateWordsearch();
                    this.$swal({
                        icon: 'success',
                        title: '¡Éxito!',
                        text: 'La palabra fue eliminada correctamente.',
                    });
                })
                .catch((error) => {
                    console.error("Ocurrio un error al eliminar la palabra: ", error);
                    this.$swal({
                        icon: 'error',
                        title: 'Error!',
                        text: 'La palabra no pudo ser eliminada correctamente.',
                    })                
                })
                .finally(() => {
                    this.$emit('update:isLoading', false);
                })
            }

        },         
        generateWordsearch() {
            let dictionary = this.words.map(word => {
                return word.palabra
            })
            const options = {
                cols: this.gridCols,
                rows: this.gridRows,
                dictionary: dictionary,
            };

            this.puzzle = new WordSearch(options);
            this.grid = this.puzzle.grid;
            // this.selectedCells = [];
            // this.previewCells = [];
            // this.foundCells = [];
            // this.foundWords = [];
            // this.notFoundCells = [];
            // this.selecting = false;
            // this.startCell = null;

            console.log("Palabras escondidas: ", this.puzzle.words);
        },
        saveActivities() {
            this.$emit('update:isLoading', true);
            
            const palabras = this.words.map( (word, index) => {
                return {
                    idPalabra: index,
                    palabra: word.palabra
                };
            });      

            const activitiesToSave = {
                idEvaluacion: this.evaluationData.id_evaluaciones,
                gridCols: this.gridCols,
                gridRows: this.gridRows,
                palabras: palabras
            }
            console.log("Sopa de letras a guardar: ")
            console.log(activitiesToSave)

            ActivityService.addActivitiesWordsearch(activitiesToSave)
            .then(() => {
                this.$swal({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: 'La sopa de letras fue guardada correctamente.',
                }).then(() => {
                    this.$router.push('/evaluaciones/mis-evaluaciones');
                });
            })
            .catch(error => {
                console.error('Error al intentar guardar la sopa de letras:', error);
                this.$swal({
                    icon: 'error',
                    title: '¡Error!',
                    text: 'Hubo un error al guardar la sopa de letras.',
                });
            })
            .finally(() => {
                this.$emit('update:isLoading', false);
            });    
        },
        startTutorial() {
            this.startTour([
                {
                    element: '#input-palabra',
                    popover: {
                        title: 'Paso 1: Ingresar palabra',
                        description: 'Aquí ingresa la palabra que deseas incluir en la sopa de letras.',
                        position: 'top',
                    },
                },
                {
                    element: '#btn-agregar-palabra',
                    popover: {
                        title: 'Paso 2: Agregar palabra',
                        description: 'Luego haz clic en "Agregar palabra".',
                        position: 'top',
                    },
                },     
                {
                    element: '#tabla-palabras-sopa-letras',
                    popover: {
                        title: 'Paso 3: Palabras agregadas',
                        description: 'Aquí podrás visualizar las palabras que haz agregado para crear tu sopa de letras.',
                        position: 'top',
                    },
                }, 
                {
                element: '#dimensiones',
                    popover: {
                        title: 'Paso 4: Configurar Dimensiones de la Sopa',
                        description: 'Utiliza estos campos para definir las dimensiones de tu sopa de letras. El tamaño mínimo de filas y columnas será la longitud de la palabra más larga que hayas agregado, este se ajustará automáticamente en los campos de entrada si es necesario.',
                        position: 'top',
                    },
                },
                {
                    element: '#btn-generar-sopa',
                    popover: {
                        title: 'Paso 5: Generar la Sopa de Letras',
                        description: 'Una vez que hayas agregado todas las palabras para tu sopa y configurado las dimensiones, haz clic en "<i class="bi bi-shuffle"></i>Generar sopa de letras". La sopa se generará automáticamente con las palabras que has ingresado. Cada alumno recibirá una sopa de letras aleatoria usando las palabras y dimensiones que agregaste.',
                        position: 'top',
                    },
                }, 
                {
                    element: '#save-activities',
                    popover: {
                        title: 'Paso 6: Guardar la Sopa de Letras',
                        description: 'Cuando estés contento con la sopa de letras que has generado, haz clic en "<i class="bi bi-floppy"></i>Guardar sopa de letras".',
                        position: 'top',
                    },
                },                                                                                            
            ]);
        },
  },
  mounted() {
    this.initData();
  },
  computed: {
    formattedWordsForTable() {
        return this.words.map((word, index) => {
            return {
                palabra: word,
                index: index
            };
        });
    },
  }
};
</script>

<style>
:root {
  --green-rgba: rgba(40, 167, 69, 0.3);
  --red-rgba: rgba(220, 53, 69, 0.3);
}

.word-search {
    padding: 0.5rem;
    background: var(--acivity-background-color);
}
.word-search table {
  border-collapse: collapse;
}
.word-search td {
  width: 30px;
  height: 30px;
  text-align: center;
  vertical-align: middle;
  border: 1px solid var(--acivity-border-color);
  background: white;
  cursor: pointer;
}
.word-search .selected {
  background-color: yellow;
}
.word-search .preview {
  background-color: yellow;
}
.word-search .found {
  background-color: var(--green-rgba);
  border: solid 2px var(--green);
}
.word-search .not-found {
  background-color: var(--red-rgba);
  border: solid 2px var(--red);
}
.word-list {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
.word-list .column {
  flex: 1;
  margin: 0 10px;
}
.word-list ul {
  list-style: none;
  padding: 0;
}
.word-list li {
  margin: 5px 0;
}
.word-list .found-word {
  text-decoration: line-through;
}
</style>

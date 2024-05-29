<template>
  <div class="create-wordsearch-wrapper">
    <h3>
        Crear sopa de letras
        <!-- <i class="bi bi-info-circle custom-info-driver-button"
            @click="startTutorial"
            v-b-tooltip.hover.top="'Haz clic aquí para recibir un tutorial sobre cómo crear una sopa de letras'"
        ></i>       -->
    </h3>
    <b-button class="help-button" @click="startTutorial"
      v-b-tooltip.hover.top="'Haz clic aquí para recibir un tutorial sobre cómo crear una sopa de letras'" >
      <i class="bi bi-question-circle"></i>Ayuda
    </b-button>    

    <p class="text-justify">
        Utiliza el siguiente formulario para crear tu sopa de letras.
    </p>

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
                    {{ data.value }}
                </template>                
                <template #cell(actions)="data">
                    <b-button size="sm" variant="danger" @click="removeWord(data.index)">
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
                <i class="bi bi-shuffle"></i>Generar sopa de letras
            </b-button>
        </b-col>             
    </b-row>       

    <!-- Tablero de sopa de letras -->
    <b-row class="my-3">        
        <b-col cols="12">
            <div class="custom-center-flex">
                <WordsearchBoardVue :words="words" :gridCols="gridCols" :gridRows="gridRows" :puzzle="puzzle" />
            </div>  
        </b-col>
    </b-row>

  </div>
</template>

<script>
import WordSearch from '@blex41/word-search';
import driverMixin from '@/mixins/driverMixin';

import WordsearchBoardVue from './WordsearchBoard.vue';

export default {
    name: 'CreateWordsearchWrapper',
    mixins: [driverMixin],
    components: {
        WordsearchBoardVue
    },
  data() {
    return {
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
      selectedCells: [],
      previewCells: [],
      foundCells: [],
      foundWords: [],
      notFoundCells: [],
      selecting: false,
      startCell: null,
      puzzle: null,
    };
  },
    methods: {
        addWord() {
            if (this.newWord) {
                // Quitar espacios, convertir a mayúsculas y eliminar acentos
                const normalizedWord = this.newWord
                    .replace(/\s+/g, '') // Quitar espacios
                    .toUpperCase() // Convertir a mayúsculas
                    .normalize("NFD") // Normalizar la cadena
                    .replace(/[\u0300-\u036f]/g, ''); // Quitar diacríticos (acentos)

                this.words.push(normalizedWord);
                this.newWord = null;
                this.updateGridDimensions();
            }
        },
        updateGridDimensions() {
            this.longestWordLength = Math.max(...this.words.map(word => word.length));
            if (this.longestWordLength > this.gridCols) {
                this.gridCols = this.longestWordLength;
            }
            if (this.longestWordLength > this.gridRows) {
                this.gridRows = this.longestWordLength;
            }
        },        
        removeWord(index) {
            this.words.splice(index, 1);
        },         
        generateWordsearch() {
            const options = {
                cols: this.gridCols,
                rows: this.gridRows,
                dictionary: this.words,
            };

            this.puzzle = new WordSearch(options);
            this.grid = this.puzzle.grid;
            this.selectedCells = [];
            this.previewCells = [];
            this.foundCells = [];
            this.foundWords = [];
            this.notFoundCells = [];
            this.selecting = false;
            this.startCell = null;

            console.log("Palabras escondidas: ", this.puzzle.words);
            console.error("Palabras que no encajan: ", this.puzzle.forbiddenWords);

            if (this.puzzle.forbiddenWords) {
                console.error("Palabras que no encajan: ", this.puzzle.forbiddenWords);
            }
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
                        description: 'Una vez que hayas agregado todas las palabras para tu sopa y configurado las dimensiones, haz clic en "Generar sopa de letras". La sopa se generará automáticamente con las palabras que has ingresado.',
                        position: 'top',
                    },
                },                                                                             
            ]);
        },

    isSelected(row, col) {
      return this.selectedCells.some(cell => cell.row === row && cell.col === col);
    },
    isPreview(row, col) {
      return this.previewCells.some(cell => cell.row === row && cell.col === col);
    },
    isFound(row, col) {
      return this.foundCells.some(cell => cell.row === row && cell.col === col);
    },
    isNotFound(row, col) {
      return this.notFoundCells.some(cell => cell.row === row && cell.col === col);
    },
    isWordFound(word) {
      return this.foundWords.includes(word);
    },
    selectCell(row, col) {
      if (!this.selecting) {
        this.startCell = { row, col };
        this.selectedCells = [{ row, col }];
        this.selecting = true;
      } else {
        const endCell = { row, col };
        this.selectedCells = this.getCellsInLine(this.startCell.row, this.startCell.col, endCell.row, endCell.col);
        this.selecting = false;
        this.handleSelection(this.startCell, endCell);
        this.startCell = null;
      }
    },
    previewSelection(row, col) {
      if (this.selecting && this.startCell) {
        this.previewCells = this.getCellsInLine(this.startCell.row, this.startCell.col, row, col);
      } else {
        this.previewCells = [];
      }
    },
    getCellsInLine(startRow, startCol, endRow, endCol) {
      const cells = [];
      const dRow = endRow - startRow;
      const dCol = endCol - startCol;

      if (dRow !== 0 && dCol !== 0 && Math.abs(dRow) !== Math.abs(dCol)) {
        return cells; // No es una línea recta ni una diagonal estricta
      }

      const steps = Math.max(Math.abs(dRow), Math.abs(dCol));

      for (let i = 0; i <= steps; i++) {
        const row = startRow + Math.round((i * dRow) / steps);
        const col = startCol + Math.round((i * dCol) / steps);
        cells.push({ row, col });
      }

      return cells;
    },
    handleSelection(startCell, endCell) {
      const word = this.puzzle.read({ x: startCell.col, y: startCell.row }, { x: endCell.col, y: endCell.row });
      const reversedWord = this.puzzle.read({ x: endCell.col, y: endCell.row }, { x: startCell.col, y: startCell.row });

      if (this.words.includes(word) || this.words.includes(reversedWord)) {
        const foundWord = this.words.includes(word) ? word : reversedWord;
        console.log('Palabra encontrada:', foundWord);
        this.foundCells.push(...this.selectedCells);
        if (!this.foundWords.includes(foundWord)) {
          this.foundWords.push(foundWord);
        }
      } else {
        console.log('Palabra no válida:', word);
        this.notFoundCells.push(...this.selectedCells);
        setTimeout(() => {
          this.notFoundCells = [];
        }, 1000);
      }

      this.selectedCells = [];
    },
    splitWordsIntoColumns(words, numColumns) {
      const wordsPerColumn = Math.ceil(words.length / numColumns);
      const columns = [];
      for (let i = 0; i < numColumns; i++) {
        columns.push(words.slice(i * wordsPerColumn, (i + 1) * wordsPerColumn));
      }
      return columns;
    }
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

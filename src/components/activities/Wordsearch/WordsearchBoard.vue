<template>
  <div v-if="grid.length">
    <b-button class="help-button" @click="startTutorial"
      v-b-tooltip.hover.top="'Haz clic aquí para recibir un tutorial sobre cómo responder la sopa de letras.'" >
      <i class="bi bi-question-circle"></i>Ayuda
    </b-button>      
    <h3>
        Sopa de letras 
    </h3>

    <div class="word-search" id="word-search" v-if="grid.length">
      <table>
        <tbody>
          <tr v-for="(row, rowIndex) in grid" :key="rowIndex">
            <td
              v-for="(cell, colIndex) in row"
              :key="colIndex"
              :class="{ 
                selected: isSelected(rowIndex, colIndex), 
                preview: isPreview(rowIndex, colIndex), 
                found: isFound(rowIndex, colIndex), 
                'not-found': isNotFound(rowIndex, colIndex) 
              }"
              @click="selectCell(rowIndex, colIndex)"
              @mouseover="previewSelection(rowIndex, colIndex)"
            >
              {{ cell }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="words.length && grid.length" id="lista-palabras-buscar" class="mt-2">
        <p class="lead">Palabras que debes buscar</p>
        <div class="word-list mt-0">
            <div class="column" v-for="(column, colIndex) in splitWordsIntoColumns(words, 3)" :key="colIndex">
                <ul>
                    <li v-for="word in column" :key="word" :class="{ 'found-word': isWordFound(word) }">{{ word }}</li>
                </ul>
            </div>
        </div>
    </div>

  </div>
</template>

<script>
import driverMixin from '@/mixins/driverMixin';

export default {
    name: 'WordsearchBoard',
    mixins: [driverMixin],
    props: {
        words: {
            type: Array,
            default: () => []
        },        
        gridRows: {
            type: Number,
            default: 10
        },
        gridCols: {
            type: Number,
            default: 10
        },
        puzzle: {
            type: Object,
            default: null
        }        
    },
    data() {
        return {       
            grid: [],
            selectedCells: [],
            previewCells: [],
            foundCells: [],
            foundWords: [],
            notFoundCells: [],
            selecting: false,
            startCell: null,
        };
    },
    methods: {
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

            console.log("Word: ", word);
            console.log("Reverse word: ", reversedWord);

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
                    this.previewCells = [];
                }, 1000);
            }

            this.selectedCells = [];
        },
        splitWordsIntoColumns(words, numColumns) {
            const wordsPerColumn = Math.floor(words.length / numColumns);
            const extraWords = words.length % numColumns;
            const columns = [];
            let startIndex = 0;
            for (let i = 0; i < numColumns; i++) {
                const columnWordsCount = wordsPerColumn + (i < extraWords ? 1 : 0);
                const columnWords = words.slice(startIndex, startIndex + columnWordsCount);
                columns.push(columnWords);
                startIndex += columnWords.length;
            }
            return columns;
        },
        startTutorial() {
            this.startTour([
                {
                    element: '#word-search',
                    popover: {
                        title: 'Tablero',
                        description: 'Para seleccionar una palabra primero haz clic en la letra inicial, luego mueve el cursor hasta la letra final y haz clic en ella.',
                        position: 'top',
                    },
                },
                {
                    element: '#lista-palabras-buscar',
                    popover: {
                        title: 'Lista de palabras',
                        description: 'Aquí podrás observar la lista de palabras ocultas en la sopa de letras. Cuando selecciones una palabra correcta esta se tachará de la lista automaticamente.',
                        position: 'top',
                    },
                },     
                                                                                 
            ]);
        },        
    },
    watch: {
        puzzle: {
            handler(newPuzzle) {
                this.grid = newPuzzle.grid;
                this.selectedCells = [];
                this.previewCells = [];
                this.foundCells = [];
                this.foundWords = [];
                this.notFoundCells = [];
                this.selecting = false;
                this.startCell = null;                
                console.log('El objeto puzzle ha cambiado:', newPuzzle);
            },
            deep: true
        }
    }
};
</script>

<style>
:root {
  --green-rgba: rgba(40, 167, 69, 0.3);
  --red-rgba: rgba(220, 53, 69, 0.3);
}

.word-search {
    /* padding: 0.5rem;
    background: var(--acivity-background-color); */
    width: fit-content;
    margin: auto;
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
    color: var(--success);
}
</style>

<template>
    <div id="grid" class="crossword-container">
        <h3 v-if="grid.length" class="font-weight-bold mt-2 mb-4">Crucigrama generado</h3>
        <table class="grid-table my-2">  
            <tbody>
                <tr v-for="(row, rowIndex) in grid" :key="rowIndex">
                    <td v-for="(cell, colIndex) in row" :key="colIndex" class="grid-cell" :class="{'empty-cell': cell == '-'}">
                        <template v-if="modeRespondActivity">
                            <input v-if="cell !== '-'" type="text" maxlength="1" class="grid-input" v-model="userGrid[rowIndex][colIndex]" @input="updateWord(rowIndex, colIndex, $event)" autocapitalize="off" />
                            <span v-if="hasWordAtPosition(rowIndex, colIndex)" class="span-position-word text-danger">{{ getWordPosition(rowIndex, colIndex) }}</span>
                        </template>
                        <template v-else>
                            {{ cell == '-' ? ' ' : cell }}
                            <span v-if="hasWordAtPosition(rowIndex, colIndex)" class="span-position-word text-danger">{{ getWordPosition(rowIndex, colIndex) }}</span>
                        </template>                                
                    </td>
                </tr>
            </tbody>
        </table>  
    </div>    
</template>

<script>

export default {
    name: "CrosswordBoard",
    props: {
        modeRespondActivity: {
            type: Boolean,
            default: true
        },
        grid: Array,
        gridRows: {
            type: Number,
            default: 0
        },
        gridCols: {
            type: Number,
            default: 0
        },
        answers: [],     
    },
    data() {
        return {
            verticalClues: [],
            horizontalClues: [],
            userGrid: [],
        }
    },
    methods: {
        initData() {
            this.userGrid = Array.from({ length: this.gridRows }, () => Array(this.gridCols).fill(''));
        },
        hasWordAtPosition(rowIndex, colIndex) {
            return this.answers.some(word => word.startx-1 === colIndex && word.starty-1 === rowIndex);
        },
        getWordPosition(rowIndex, colIndex) {
            const word = this.answers.find(word => word.startx-1 === colIndex && word.starty-1 === rowIndex);
            return word ? word.position : '';
        },
        updateWord(rowIndex, colIndex, event) {
            this.userGrid[rowIndex][colIndex] = event.target.value.toLowerCase();
            this.answers.forEach(word => {
                if (word.orientation === 'across') {
                    // Verifica si la celda editada está dentro de una palabra horizontal
                    if (word.starty - 1 === rowIndex && colIndex >= word.startx - 1 && colIndex < word.startx - 1 + word.answer.length) {
                        // Actualiza la respuesta actual usando la fila específica en userGrid
                        word.currentAnswer = this.userGrid[rowIndex].slice(word.startx - 1, word.startx - 1 + word.answer.length).join('');
                        console.log("Respuesta actualizada: ", word, word.currentAnswer);
                    }
                } else if (word.orientation === 'down') {
                    // Verifica si la celda editada está dentro de una palabra vertical
                    if (word.startx - 1 === colIndex && rowIndex >= word.starty - 1 && rowIndex < word.starty - 1 + word.answer.length) {
                        // Construye la respuesta actual concatenando valores de las filas en userGrid para esa columna
                        let tempAnswer = '';
                        for (let i = 0; i < word.answer.length; i++) {
                            tempAnswer += this.userGrid[word.starty - 1 + i][colIndex];
                        }
                        word.currentAnswer = tempAnswer;
                        console.log("Respuesta actualizada: ", word, tempAnswer);
                    }
                }
            });
        }       
    },
    watch: {
        grid: {
            handler() {
                this.initData();
            },
            deep: true
        }
    },
}
</script>

<style scoped>

.crossword-container {
    padding: 0px;
    /* background: #F0F0F0; */
    border-radius: 3px;

    overflow-x: auto;
    white-space: nowrap;
}

.empty-cell {
    background-color: #F0F0F0 !important;
}

.grid-table {
    border-collapse: collapse;
}

.grid-cell:not(.empty-cell) {
    background: white;
    border: 1px solid #333;
    width: 40px;
    height: 40px; 
    text-align: center;
    position: relative;
}

.grid-cell:focus-within {
    z-index: 5;
    border: 2px solid var(--primary) !important;
    background-color: rgba(238, 111, 87, 0.05);
}

.span-position-word {
    position: absolute;
    top: -3px;
    left: 2px;
    border: none;
    font-size: 11pt;
}

.grid-input {
    border: none;
    width: 100%;
    height: 100%;
    text-align: center;
    font-size: 15pt;
    padding: 0;
    box-sizing: border-box;
    background-color: transparent; 
    outline: none;
    font-family: -apple-system, BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";    
}
.grid-input:focus {
    outline: none;
    color: var(--primary) !important;
}

@media (max-width: 576px) {
  .grid-cell {
    min-width: 40px;
    min-height: 20px;     
  }
}
</style>
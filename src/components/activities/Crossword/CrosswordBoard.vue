<template>
    <div id="grid" class="crossword-container">
        <!-- <h3 v-if="grid.length" class="font-weight-bold mt-2 mb-4">Crucigrama generado</h3> -->
        <table class="grid-table my-2" v-if="modeRespondActivity && userGrid.length">  
            <tbody>
                <tr v-for="(row, rowIndex) in grid" :key="rowIndex">
                    <td v-for="(cell, colIndex) in row" :key="colIndex" class="grid-cell" :class="{'empty-cell': cell == '-'}">
                        <input v-if="cell !== '-'" type="text" maxlength="1" class="grid-input" v-model="userGrid[rowIndex][colIndex]" @input="updateWord(rowIndex, colIndex, $event)" autocapitalize="off" />
                        <span v-if="hasWordAtPosition(rowIndex, colIndex)" class="span-position-word text-danger">{{ getWordPosition(rowIndex, colIndex) }}</span>                             
                    </td>
                </tr>
            </tbody>
        </table>  

        <table class="grid-table my-2" v-else>  
            <tbody>
                <tr v-for="(row, rowIndex) in grid" :key="rowIndex" >
                    <td v-for="(cell, colIndex) in row"  :key="colIndex" class="grid-cell" :class="getCellClass(rowIndex, colIndex, cell)">
                        {{ cell == '-' ? ' ' : cell }}
                        <span v-if="hasWordAtPosition(rowIndex, colIndex)" class="span-position-word text-danger">{{ getWordPosition(rowIndex, colIndex) }}</span>
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
        colorReviewActived: {
            type: Boolean,
            default: false
        },
        answers: Array,     
    },
    data() {
        return {
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
            let newLetter = event.target.value
                .replace(/\s+/g, '') // Quitar espacios
                .toUpperCase() // Convertir a mayúsculas
                .normalize("NFD") // Normalizar la cadena
                .replace(/[\u0300-\u036f]/g, '') // Quitar diacríticos (acentos)
                .replace(/[^A-Z0-9]/g, ''); // Quitar guiones, caracteres especiales y mantener sólo letras y números
            this.userGrid[rowIndex][colIndex] = newLetter;
            this.answers.forEach(word => {
                if (word.orientation === 'across') {
                    if (word.starty - 1 === rowIndex && colIndex >= word.startx - 1 && colIndex < word.startx - 1 + word.answer.length) {
                        word.currentAnswer = this.userGrid[rowIndex].slice(word.startx - 1, word.startx - 1 + word.answer.length).join('');
                    }
                } else if (word.orientation === 'down') {
                    if (word.startx - 1 === colIndex && rowIndex >= word.starty - 1 && rowIndex < word.starty - 1 + word.answer.length) {
                        let tempAnswer = '';
                        for (let i = 0; i < word.answer.length; i++) {
                            tempAnswer += this.userGrid[word.starty - 1 + i][colIndex];
                        }
                        word.currentAnswer = tempAnswer;
                    }
                }
            });
        },
        getCellClass(rowIndex, colIndex, cell) {
            let isCorrect = false;
            let isIncorrect = false;

            if(this.colorReviewActived){
                for (let word of this.answers) {
                    if (word.orientation === 'across' && rowIndex === word.starty - 1 && colIndex >= word.startx - 1 && colIndex < word.startx - 1 + word.answer.length) {
                        if (word.correct) {
                            isCorrect = true;
                        } else {
                            isIncorrect = true;
                        }
                    } else if (word.orientation === 'down' && colIndex === word.startx - 1 && rowIndex >= word.starty - 1 && rowIndex < word.starty - 1 + word.answer.length) {
                        if (word.correct) {
                            isCorrect = true;
                        } else {
                            isIncorrect = true;
                        }
                    }
                } 

                if (isCorrect) {
                    return 'correct-cell';
                } else if (isIncorrect) {
                    return 'incorrect-cell';
                } else {
                    return 'empty-cell';
                }
            }
            else {
                if(cell == '-'){
                    return 'empty-cell';
                }
                else {
                    return '';
                }
            }

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
    mounted() {
        this.initData();
    },
}
</script>

<style scoped>

.crossword-container {
    padding: 0px;
    border-radius: 3px;
    overflow-x: auto;
    white-space: nowrap;
}

.empty-cell {
    background-color: #F0F0F0 !important;
}

.correct-cell {
  border-color: var(--success) !important;
  background-color: var(--green-rgba) !important;
}

.incorrect-cell {
  border-color: var(--danger) !important;
  background-color: var(--red-rgba) !important;
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
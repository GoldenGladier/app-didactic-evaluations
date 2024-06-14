<template>
  <div class="mt-3">
    <div v-if="!answerReviewActive">
        <p>Usa las pistas proporcionadas para completar el crucigrama. Escribe las respuestas correctas en las casillas correspondientes.</p>
        <b-row id="grid-crucigrama">
            <b-col cols="12" class="d-flex justify-content-center align-items-center p-0 p-md-3">
                <CrosswordBoard :grid="grid" :gridRows="gridRows" :gridCols="gridCols" :answers.sync="answers" :modeRespondActivity="true" />
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

        <b-button type="submit" variant="primary" @click="sendAnswers()">
            <i class="bi bi-send-check"></i> Envíar respuestas
        </b-button>
    </div>


    <div v-else>   
        <h4>Revisión de respuestas</h4>
        <p>¡Felicitaciones por completar el crucigrama! En este resumen, podrás ver las palabras que lograste encontrar correctamente resaltadas en <span class="text-success">verde</span>, mientras que las que no lograste encontrar se mostrarán en <span class="text-danger">rojo</span>.</p>
        <b-row id="grid-crucigrama">
            <b-col cols="12" class="d-flex justify-content-center align-items-center p-0 p-md-3">
                <CrosswordBoard :grid="grid" :gridRows="gridRows" :gridCols="gridCols" :answers.sync="answers" :modeRespondActivity="false" :colorReviewActived="true" />
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
      
        <b-button type="submit" variant="primary" @click="logout()">
            <i class="bi bi-house-door"></i> Salir al inicio
        </b-button>
    </div>
  </div>
</template>

<script>
import { BButton } from 'bootstrap-vue';
import store from '@/store/auth';
import ActivityService from '@/services/ActivityService.js';

import CrosswordBoard from '@/components/activities/Crossword/CrosswordBoard.vue';

export default {
  components: {
    BButton, CrosswordBoard
  },
  props: {
    activities: {
      type: Object ,
      required: true
    },
    infoEvaluation: {
      type: Object,
      default: null
    }
  },
    data() {
        return {
            responses: {},
            answerReviewActive: false,

            gridRows: 0,
            gridCols: 0,

            grid: [],
            answers: [],  
            verticalClues: [],
            horizontalClues: [],      
            devMode: false,      
        };
    },
    methods: {
        initData() {
            // console.log("Activities: ", this.activities);
            this.gridRows = this.activities.board.fila;
            this.gridCols = this.activities.board.columna;

            // console.log("gridRows: ", this.gridRows);
            // console.log("gridCols: ", this.gridCols);
            // console.log("grid: ", this.grid);

            this.answers = this.activities.resultWordSearchEvaluation.map((word) => {
                return {
                    answer: word.answers[0].answer,
                    clue: word.clue,      
                    orientation: word.answers[0].orientation,                  
                    position: word.position,
                    startx: word.answers[0].startX,
                    starty: word.answers[0].startY,
                }
            }); 

            this.verticalClues = this.answers.filter(word => word.orientation === 'down');
            this.horizontalClues = this.answers.filter(word => word.orientation === 'across');          
            this.grid = Array.from({ length: this.gridRows }, () => Array(this.gridCols).fill('-'));
            
            this.answers.forEach(word => {
                const x = word.startx - 1;
                const y = word.starty - 1;
                const wordChars = word.answer.split('');
                const orientation = word.orientation;

                for (let i = 0; i < wordChars.length; i++) {
                    if (orientation === "across") {
                        this.grid[y][x + i] = wordChars[i];
                    } else {
                        this.grid[y + i][x] = wordChars[i];
                    }
                }
            });  
            // console.log("answers: ", this.answers);

        },
        activefeedback(feedback) {
            this.gridRows = feedback.boardData.fila;
            this.gridCols = feedback.boardData.columna;

            this.answers = feedback.DataAnswers.map((word) => {
                // console.log("Word: ", word);
                return {
                    answer: word.answer,
                    clue: word.clue,      
                    orientation: word.orientation,                  
                    position: word.num_pregunta,
                    startx: word.startx,
                    starty: word.starty,
                    correct: word.correcta
                }
            });            
            
            this.verticalClues = this.answers.filter(word => word.orientation === 'down');
            this.horizontalClues = this.answers.filter(word => word.orientation === 'across');          
            this.grid = Array.from({ length: this.gridRows }, () => Array(this.gridCols).fill('-'));    
            
            this.answers.forEach(word => {
                // console.log("Iniciando palabra: ", word)
                const x = word.startx - 1;
                const y = word.starty - 1;
                const wordChars = word.answer.split('');
                const orientation = word.orientation;

                for (let i = 0; i < wordChars.length; i++) {
                    if (orientation === "across") {
                        this.grid[y][x + i] = wordChars[i];
                    } else {
                        // console.log("Intentando meter: ", y + i, x, wordChars[i])
                        this.grid[y + i][x] = wordChars[i];
                    }
                }
            });      
            this.answerReviewActive = true;
        },
        sendAnswers() {
            this.$emit('updateLoading', true);

            const dataAnswers = {
                idEvaluacion: this.infoEvaluation.id_evaluaciones,
                answers: this.answers.map(answer => {
                    return {
                        position: answer.position,
                        answer: answer.currentAnswer ? answer.currentAnswer : ''
                    }
                })
            };
            // console.log("Data Answers: ", dataAnswers);
            // console.log("dataAnswers: ", dataAnswers);

            ActivityService.solveActivityCrossword(dataAnswers)
            .then(response => {
                // console.log("sendAnswers status: ", response);
                let text = 'Tus respuestas han sido enviadas correctamente. ';
                text += this.infoEvaluation?.retroalimentacion_activa ? '' : 'Tu profesor te informará acerca de tus resultados.';
                this.$swal({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: text,
                }).then(() => {
                    if (this.infoEvaluation?.retroalimentacion_activa) {
                        // console.log("Retroalimentación recibida: ", response); 
                        this.activefeedback(response);
                        this.answerReviewActive = true;
                    } else {
                        this.logout();
                    }
                });
            })
            .catch(error => {
                console.error('Error test:', error);
                let message = 'Algo salió mal, intenta más tarde...'
                if (error.status === 409) {
                    message = 'Ya has respondido esta evaluación, no es posible responder nuevamente.'
                }
                this.$swal({
                    icon: 'error',
                    title: '¡Error!',
                    text: message,
                });
            })
            .finally(() => {
                this.$emit('updateLoading', false);
            });
        },
        logout() {
            console.log("Cerrar sesión");
            store.commit('logout');
            this.$router.push('/home');
        }
    },
    created() {
        this.initData();
    }
};
</script>

<style scoped>
.response-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1rem;
}

.response-option {
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  padding: 0.5rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  justify-content: center;
}

.response-option.selected {
  background-color: var(--primary-rgba-15-color);
  border-color: var(--primary);
}
</style>

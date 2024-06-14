<template>
  <div class="solve-wordsearch-wrapper">
        <div v-if="!answerReviewActive">
            <h3>Resolver sopa de letras</h3>

            <b-row class="my-3">        
                <b-col cols="12 p-0 pd-md-3">
                    <WordsearchBoardVue ref="WordsearchBoardVue" :words="words" :gridCols="gridCols" :gridRows="gridRows" :puzzle="puzzle" />
                </b-col>
            </b-row>
            
            <b-button type="submit" variant="primary" @click="sendAnswers()">
                <i class="bi bi-send-check"></i> Envíar respuestas
            </b-button>
        </div>
        <div v-else>   
            <h4>Revisión de respuestas</h4>
            <p>¡Felicitaciones por completar el desafío de búsqueda de palabras! En este resumen, podrás ver las palabras que lograste encontrar correctamente resaltadas en <span class="text-success">verde</span>, mientras que las que no lograste encontrar se mostrarán en <span class="text-danger">rojo</span>.</p>
            <b-row class="my-3">        
                <b-col cols="12 p-0 pd-md-3">
                    <WordsearchBoardVue ref="WordsearchBoardVue" :words="words" :gridCols="gridCols" :gridRows="gridRows" :puzzle="puzzle" 
                        :answers="answers" :answerReviewActive="true" />
                </b-col>
            </b-row>
        
            <b-button type="submit" variant="primary" @click="logout()">
                <i class="bi bi-house-door"></i> Salir al inicio
            </b-button>
        </div>    
  </div>
</template>

<script>
import WordSearch from '@blex41/word-search';
import WordsearchBoardVue from '@/components/activities/Wordsearch/WordsearchBoard.vue';

import ActivityService from '@/services/ActivityService';
import store from '@/store/auth';

export default {
  name: 'SolveWordsearchWrapper',
  components: { WordsearchBoardVue },
  props: {
    activities: {
      type: Object,
      required: true        
    },
    infoEvaluation: {
      type: Object,
      default: null
    }    
  },
    data() {
        return {
            words: [],
            longestWordLength: 1,
            gridCols: 10,
            gridRows: 10,
            grid: [],
            puzzle: null,
            answers: [],
            answerReviewActive: false
        };
    },
    methods: {
        initData() {
            this.gridCols = this.activities.board.columna;
            this.gridRows = this.activities.board.fila;

            this.words = this.activities.resultWordSearchEvaluation.map(word => word.palabra);
            this.generateWordsearch();
        },
        generateWordsearch() {
            const options = {
                cols: this.gridCols,
                rows: this.gridRows,
                dictionary: this.words,
            };

            this.puzzle = new WordSearch(options);
            if (this.puzzle.words.length < this.words.length) {
                let attempts = 0;
                const maxAttempts = 15;
                if (attempts === maxAttempts) {
                    this.gridCols++;
                    this.gridRows++;
                    options.gridCols = this.gridCols;
                    options.gridRows = this.gridRows;
                    attempts = 0;
                }
                while (this.puzzle.words.length < this.words.length && attempts < maxAttempts) {
                    console.log("No caben las palabras escondidas:", this.puzzle.words);
                    this.puzzle = new WordSearch(options);
                    attempts++;
                }
            }
            this.grid = this.puzzle.grid;

            console.log("grid: ", this.grid);
            console.log("Palabras escondidas: ", this.puzzle.words);
        },   
        sendAnswers() {
            this.$emit('updateLoading', true);

            console.log("Respuestas encontradas: ", this.$refs.WordsearchBoardVue.foundWords);
            this.answers = this.$refs.WordsearchBoardVue.foundWords;

            let palabras = this.activities.resultWordSearchEvaluation.filter(word => this.answers.includes(word.palabra)).map(word => {
                if(this.answers.includes(word.palabra)) {
                    return {
                        numPregunta: word.numPregunta,
                        palabra: word.palabra
                    } 
                }           
                else return {}    
            });

            const dataAnswers = {
                idEvaluacion: this.infoEvaluation.id_evaluaciones,
                palabras: palabras
            };
            console.log("Data Answers: ", dataAnswers);

            ActivityService.solveActivityWordsearch(dataAnswers)
            .then(response => {
                console.log("sendAnswers status: ", response);
                let text = 'Tus respuestas han sido enviadas correctamente. ';
                text += this.infoEvaluation?.retroalimentacion_activa ? '' : 'Tu profesor te informará acerca de tus resultados.';
                this.$swal({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: text,
                }).then(() => {
                    if (this.infoEvaluation?.retroalimentacion_activa) {
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
/* Estilos específicos para este componente */
</style>

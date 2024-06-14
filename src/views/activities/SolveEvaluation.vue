<template>
  <b-container class="custom-master-container custom-card-box custom-center-flex">
    <b-overlay :show="isLoading" class="width-100">   
        <b-container v-if="infoEvaluation" class="evaluation-data">
            <h1 v-if="answerReviewActive" class="title-bold-primary">Resultados</h1>
            <h1 v-if="infoEvaluation?.nombre" class="title-bold">{{ infoEvaluation.nombre }}</h1>
            <h2 v-if="infoEvaluation?.subtitulo" class="subtitle-light">{{ infoEvaluation.subtitulo }}</h2>
            <p v-if="infoEvaluation?.descripcion" class="mt-4">{{ infoEvaluation.descripcion }}</p>
            <hr class="my-4">

            <SortTextController v-if="dinamicSelected == 'Ordena el enunciado'" :infoEvaluation="infoEvaluation" :sentences="activities.sentence" @updateLoading="updateLoading" :answerReviewActive.sync="answerReviewActive" />
            <SolveSortItemsWrapper v-else-if="dinamicSelected == 'Ordena los ítems'" :infoEvaluation="infoEvaluation" :activities="activities.sentence" @updateLoading="updateLoading" :answerReviewActive.sync="answerReviewActive" />
            <SolveMultipleChoiceWrapper v-else-if="dinamicSelected == 'Opción múltiple'" :infoEvaluation="infoEvaluation" :activities="activities" @updateLoading="updateLoading" />
            <SolveCrosswordWrapper v-else-if="dinamicSelected == 'Crucigrama'" :infoEvaluation="infoEvaluation" :activities="activities" @updateLoading="updateLoading" />
            <SolveWordsearchWrapper v-else-if="dinamicSelected == 'Sopa de letras'" :infoEvaluation="infoEvaluation" :activities="activities" @updateLoading="updateLoading" />
        </b-container>
        <b-container v-if="error === 'Código invalido'">
            <b-row>
                <b-col cols="12" xm="12" md="6" class="my-2 ">
                    <img src="/img/bad-url.png" alt="No Time Available">
                </b-col>
                <b-col cols="12" xm="12" md="6" class="my-2 custom-center-flex">
                    <p class="lead">
                        El PIN o la URL que has ingresado es inválido. Por favor, verifica esta información con tu profesor e inténtalo nuevamente.
                    </p>        
                </b-col>
            </b-row>
        </b-container>        
        <b-container v-else-if="error === 'Evaluación inactiva'">
            <b-row>
                <b-col cols="12" xm="12" md="6" class="my-2 ">
                    <img src="/img/no-time.png" alt="No Time Available">
                </b-col>
                <b-col cols="12" xm="12" md="6" class="my-2 custom-center-flex">
                    <p class="lead">
                        Lo sentimos, la evaluación que has solicitado no está disponible en este momento. Puede que aún no esté activa o que ya haya concluido. Por favor, verifica las fechas de activación y desactivación con tu profesor, y vuelve a intentarlo más tarde.
                    </p>        
                </b-col>
            </b-row>
        </b-container>
        <b-container v-else-if="error === 'El usuario ya respondió la evaluación'">
            <b-row>
                <b-col cols="12" xm="12" md="6" class="my-2 ">
                    <img src="/img/check.png" alt="No Time Available">
                </b-col>
                <b-col cols="12" xm="12" md="6" class="my-2 custom-center-flex">
                    <p class="lead">
                        Ya has respondido previamente a esta evaluación. No es necesario que la completes de nuevo.
                    </p>        
                </b-col>
            </b-row>
        </b-container>        
        
    </b-overlay>
  </b-container>
</template>

<script>
import EvaluationService from '@/services/EvaluationService.js'

import SortTextController from '@/components/activities/SortTextController.vue'
import SolveSortItemsWrapper from '@/components/activities/SortItems/SolveSortItemsWrapper.vue'
import SolveMultipleChoiceWrapper from '@/components/activities/MultipleChoice/SolveMultipleChoiceWrapper.vue'
import SolveCrosswordWrapper from '@/components/activities/Crossword/SolveCrosswordWrapper.vue'
import SolveWordsearchWrapper from '@/components/activities/Wordsearch/SolveWordsearchWrapper.vue'

export default {
    components: {
        SortTextController,
        SolveSortItemsWrapper,
        SolveMultipleChoiceWrapper,
        SolveCrosswordWrapper,
        SolveWordsearchWrapper
    },
    data() {
        return {
            isLoading: false,
            pin: null,
            infoEvaluation: null,
            activities: null,
            dinamicsList: [],
            dinamicSelected: null, 
            answerReviewActive: false,      
            error: null,     
        }
    },
    methods: {
        init_data() {            
            if(this.$store.state.auth.isLoggedIn){
                this.isLoading = true;
                this.pin = this.$route.params.pinEvaluation
                console.log("Pin: ", this.pin)
                EvaluationService.joinEvaluation(this.pin)
                .then((response) => {
                    console.log("Join to evaluation: ", response)
                    this.infoEvaluation = response.infoEvaluation;
                    this.activities = response.dataEvaluation;

                    EvaluationService.getDinamics()
                    .then(response => {
                        console.log("Dinámicas: ", response);
                        this.dinamicsList = response;
                        const idToFind = this.infoEvaluation.id_dinamica;
                        const foundElement = this.dinamicsList.find(element => element.id_dinamicas === idToFind);
                        if (foundElement) {
                            this.dinamicSelected = foundElement.dinamica;
                            console.log('Elemento dinámica encontrado:', foundElement);
                        } else {
                            console.log('Elemento dinámica no encontrado');
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);    
                    })
                    .finally(() => { this.isLoading = false });                                 
                })
                .catch((error) => {
                    console.error("Ocurrió un error al intentar unirse a la evaluación: ", error)
                    if(error === 'Código invalido'){
                        console.log("El PIN es invalido, por favor revisa que el PIN sea el mismo que proporciono tu profesor.")
                        this.error = 'Código invalido';

                        // this.$swal({
                        //     icon: 'error',
                        //     title: '¡PIN incorrecto!',
                        //     text: 'El PIN es inválido. Verifica con tu profesor e intenta nuevamente.',
                        // }).then(() => {
                        //     this.$router.push({ path: `/join-to-activity/${this.pin}` });        
                        // });                           
                    }        
                    else if(error == 'Evaluación inactiva') {
                        console.log("La evaluación está inactiva.")
                        this.error = 'Evaluación inactiva';
                    }     
                    else if(error == 'El usuario ya respondió la evaluación.') {
                        console.log("El usuario ya respondió la evaluación.")
                        this.error = 'El usuario ya respondió la evaluación';                        
                    }                                                 
                })
                .finally(() => { this.isLoading = false });                                 
            }
            else{
                this.$router.push({ name: 'JoinToAssessment' });
            }            
        },    
        updateLoading(isLoading) {
            this.isLoading = isLoading;
        },
    },
    created() {
        this.init_data();
    },
}
</script>

<style>
.title-bold-primary {
    color: var(--primary);
    font-size: 26px;
    font-weight: 500;    
}
.title-bold {
    /* color: var(--primary); */
    font-size: 26px;
    font-weight: 500;
}
.subtitle-light {
    font-weight: 400;   
}
</style>
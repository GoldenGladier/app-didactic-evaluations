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
            <SolveSortItemsWrapper v-else-if="dinamicSelected == 'Ordena los items'" :infoEvaluation="infoEvaluation" :activities="activities.sentence" @updateLoading="updateLoading" :answerReviewActive.sync="answerReviewActive" />
            <SolveMultipleChoiceWrapper v-else-if="dinamicSelected == 'Opción multiple'" :infoEvaluation="infoEvaluation" :activities="activities" @updateLoading="updateLoading" />
            <SolveCrosswordWrapper v-else-if="dinamicSelected == 'Crucigrama'" :infoEvaluation="infoEvaluation" :activities="activities" @updateLoading="updateLoading" />
            <!-- Sopa de letras -->
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

export default {
    components: {
        SortTextController,
        SolveSortItemsWrapper,
        SolveMultipleChoiceWrapper,
        SolveCrosswordWrapper
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
                        console.log("Dinamicas: ", response);
                        this.dinamicsList = response;
                        const idToFind = this.infoEvaluation.id_dinamica;
                        const foundElement = this.dinamicsList.find(element => element.id_dinamicas === idToFind);
                        if (foundElement) {
                            this.dinamicSelected = foundElement.dinamica;
                            console.log('Elemento dinamica encontrado:', foundElement);
                        } else {
                            console.log('Elemento dinamica no encontrado');
                        }
                    })
                    .catch(error => {
                        console.error('Error:', error);    
                    })
                    .finally(() => { this.isLoading = false });                                 
                })
                .catch((error) => {
                    console.error("Ocurrio un error al intentar unirse a la evaluación: ", error)
                    if(error === 'Codigo invalido'){
                        console.log("El PIN es invalido, por favor revisa que el PIN sea el mismo que proporciono tu profesor.")
                        this.$swal({
                            icon: 'error',
                            title: '¡PIN incorrecto!',
                            text: 'El PIN es inválido. Verifica con tu profesor e intenta nuevamente.',
                        }).then(() => {
                            this.$router.push({ path: `/join-to-activity/${this.pin}` });        
                        });                           
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
<template>
    <div class="mt-3">
        <div v-if="!answerReviewActive">
            <SortText v-for="(sentence, index) in sentences" :key="index" :index="index" :text="createWordFormatArray(sentence)" 
                @update-response="updateResponse(index, $event)" />

            <b-button type="submit" variant="primary" @click="sendAnswers()">
                <i class="bi bi-send-check"></i>Envíar respuestas
            </b-button>
        </div>
    
        <div v-else>
            <SortTextAnswersReview v-for="(answer, index) in answerReview.answers" :key="index+1" :index="index+1" :answer="answer" 
                :userAnswer="createWordFormatArray(answer.oracion_usuario)" :correctAnswer="createWordFormatArray(answer.oracion)" />
            <b-button type="submit" variant="primary" @click="logout()">
                <i class="bi bi-house-door"></i>Salir al inicio
            </b-button>                                
        </div>
    </div>
</template>
  
<script>
import SortText from './SortText.vue';
import SortTextAnswersReview from './Answers/SortTextAnswersReview.vue';

import ActivityService from '@/services/ActivityService.js';
import store from '@/store/auth';

export default {
    components: {
        SortText, SortTextAnswersReview
    },
    props: {
        sentences: {
            type: Object,
            required: true
        },
        infoEvaluation: {
            type: Object,
            default: null
        },
        answerReviewActive: {
            type: Boolean,
        }
    },
    data() {
        return {
            responses: {},            
            answerReview: {},
        };
    },
    methods: {
        initData() {
            console.log("Init data")
            Object.keys(this.sentences).forEach(key => {
                const wordsArray = this.sentences[key];
                const answer = wordsArray.join(" ").trim();
                this.$set(this.responses, key, answer);
            });                 
        },
        createWordFormatArray(array) {
            let newArray = []
            array.forEach((word, index) => {
                const item = {
                    name: word, 
                    index: index
                }
                newArray.push(item);
            });
            return newArray;
        },
        updateResponse(index, response) {
            this.$set(this.responses, index, response);
        },
        sendAnswers() {
            this.$emit('updateLoading', true);

            let data = {
                idEvaluacion: this.infoEvaluation.id_evaluaciones,
                sentence: this.responses
            };

            console.log("Data: ", data);
            ActivityService.respondActivityOrderStatement(data)
            .then(response => {
                console.log("sendAnswers status: ", response);
                let text = 'Tus respuestas han sido enviadas correctamente. ';
                text += this.infoEvaluation?.retroalimentacion_activa ? '' : 'Tu profesor te informará acerca de tus resultados.';
                this.$swal({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: text,
                }).then(() => {
                    if(this.infoEvaluation?.retroalimentacion_activa) {
                        this.answerReview = response;
                    }
                    else {
                        this.logout();
                    }
                });                   
            })
            .catch(error => {
                console.error('Error test:', error);
                let message = 'Algo salio mal, intenta más tarde...'
                if(error.status === 409){
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
            console.log("Close sesion");
            store.commit('logout');   
            this.$router.push('/home');
        },        
    },
    created() {
        this.initData();
    },
    watch: {
        sentences: {
            handler() {
                this.initData();
            },
            deep: true
        },
        answerReview: {
            handler() {
                if(Object.keys(this.answerReview).length > 0){
                    this.$emit('update:answerReviewActive', true);
                }
                else {
                    this.$emit('update:answerReviewActive', false);
                }
            },
            deep: true
        }
    }
};
</script>

<style scoped>
.custom-span-drag {
    display: block;
    margin: 0.2rem;
    padding: 0.4rem 0.6rem;
    border-radius: 0.4rem;
    border: 1px solid #ccc;
    cursor: pointer;
}
.custom-span-drag:hover {
    background: #f9e1dc;
}  
</style>


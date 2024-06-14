<template>
  <div class="mt-3">
    <div v-if="!answerReviewActive">
        <h4>Arrastra cada respuesta para ponerlas en el orden adecuado</h4>
        <SortItems
            v-for="(activity) in activities"
            :key="activity.numPregunta"
            :numQuestion="activity.numPregunta"
            :question="activity.instructionShow.instruccion"
            :items="activity.items"
            :initialOrder="activity.items.map(item => item.orden)"
            @update-response="updateResponse(activity.numPregunta, $event)"
            class="mb-5"
        />

        <b-button type="submit" variant="primary" @click="sendAnswers()">
            <i class="bi bi-send-check"></i>Envíar respuestas
        </b-button>
    </div>

    <div v-else>
        <h4>Revisión de respuestas</h4>
        <FeedbackSortItems
            v-for="(feedback, index) in feedbackData"
            :key="index"
            :numQuestion="feedback.num_pregunta"
            :question="feedback.descripcion"
            :correcta="feedback.correcta"
            :respuestasCorrectas="feedback.respuestasCorrectas"
            :respuestasUsuario="feedback.respuestasUsuario"
            class="mb-5"
        />
        <b-button type="submit" variant="primary" @click="logout()">
            <i class="bi bi-house-door"></i>Salir al inicio
        </b-button>                                
    </div>
  </div>
</template>

<script>
import SortItems from '@/components/activities/SortItems/SortItems.vue';
import FeedbackSortItems from '@/components/activities/SortItems/FeedbackSortItems.vue';
import store from '@/store/auth';

import ActivityService from '@/services/ActivityService.js';

export default {
  components: {
    SortItems, FeedbackSortItems
  },
  props: {
    activities: {
      type: Object, // Cambiado a Object
      required: true
    },
    infoEvaluation: {
      type: Object,
      default: null
    },
  },
  data() {
    return {
      responses: {},
      answerReviewActive: false,
      feedbackData: [],
    };
  },
  methods: {
    initData() {
      console.log("Init data");
      // Iterar sobre las claves (numPregunta) del objeto activities
      Object.keys(this.activities).forEach(numPregunta => {
        const activity = this.activities[numPregunta];
        // Inicializa la respuesta con el orden inicial de los elementos
        this.$set(this.responses, activity.numPregunta, activity.items.map(item => item.orden));
      });
    },
    updateResponse(numPregunta, order) {
    // Actualiza el orden de los elementos y el número de pregunta
        this.$set(this.responses, numPregunta, { numPregunta: numPregunta, answer: order });
    },

    sendAnswers() {
        this.$emit('updateLoading', true);

        const data = {
            idEvaluacion: this.infoEvaluation.id_evaluaciones,
            DataResponse: this.responses
        };
        console.log("Data: ", data);

        ActivityService.solveActivitySortItems(data)
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
                    console.log("Retroalimentación recibida: ", response);
                    this.feedbackData = response.DataAnswers;                    
                    this.answerReviewActive = true;
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
      console.log("Cerrar sesión");
      store.commit('logout');   
      this.$router.push('/home');
    }
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
    // answerReview: {
    //   handler() {
    //     if (Object.keys(this.answerReview).length > 0) {
    //       this.$emit('update:answerReviewActive', true);
    //     } else {
    //       this.$emit('update:answerReviewActive', false);
    //     }
    //   },
    //   deep: true
    // }
  }
};
</script>

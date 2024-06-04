<template>
  <div class="mt-3">
    <div v-if="!answerReviewActive">
      <h4>Selecciona la respuesta correcta para cada pregunta</h4>
      <div v-for="(activity) in activities" :key="`activity-${activity.idQuestionDb}`" class="mb-5">
        <div class="question mt-4">
          <p>{{ `${activity.idPregunta + 1}. ${activity.pregunta}` }}</p>
          <div class="response-container">
            <div
              v-for="(option) in formatOptions(activity.respuestas)"
              :key="`option-${option.value.idOpcion}`"
              class="response-option"
              :class="{ selected: isSelected(activity.idQuestionDb, option.value) }"
              @click="toggleSelection(activity.idQuestionDb, option.value)"
            >
              {{ option.text }}
            </div>
          </div>
        </div>
      </div>

      <b-button type="submit" variant="primary" @click="sendAnswers()">
        <i class="bi bi-send-check"></i> Envíar respuestas
      </b-button>
      <!-- <b-button type="submit" variant="primary" @click="activefeedback()">
        <i class="bi bi-send-check"></i> Feedback
      </b-button>         -->
    </div>


    <div v-else>
      <h4>Revisión de Respuestas</h4>
      <div v-for="(feedback) in feedbackData" :key="`feedback-${feedback.idQuestionDb}`" class="mb-5">
        <FeedbackMultipleChoiceQuestion :feedback="feedback" />
      </div>    
      
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
import FeedbackMultipleChoiceQuestion from './FeedbackMultipleChoiceQuestion.vue';

export default {
  components: {
    BButton, FeedbackMultipleChoiceQuestion
  },
  props: {
    activities: {
      type: Array,
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
      feedbackData: [],
        activityInfo: [
            {
                idQuestionDb: 17,
                idPregunta: 0,
                pregunta: "Mi nombre es...",
                numeroRespuestas: 3,
                respuestas: [
                    {
                        idOpcion: 0,
                        texto: "Daniel",
                        correcta: 0,
                        idRespuestaDb: 12
                    },
                    {
                        idOpcion: 1,
                        texto: "Omar",
                        correcta: 1,
                        idRespuestaDb: 13
                    },
                    {
                        idOpcion: 2,
                        texto: "Laurita",
                        correcta: 0,
                        idRespuestaDb: 14
                    },
                    {
                        idOpcion: 3,
                        texto: "Un colado",
                        correcta: 0,
                        idRespuestaDb: 15
                    },
                    {
                        idOpcion: 4,
                        texto: "Otro colado más #5",
                        correcta: 0,
                        idRespuestaDb: 16
                    }
                ]
            }
        ],
        DataUserAnswers: [
            {
                id_pregunta: 17,
                num_pregunta: 0,
                answer: "Omar",
                correcta: 1,
                idOpcion: 4,
                idRespuestaDb: 13
            }
        ]     
    };
  },
  methods: {
    activefeedback(feedback){
      // Agrupar idOpcion por num_pregunta
      const userAnswersGrouped = feedback.DataUserAnswers.reduce((acc, answer) => {
          if (!acc[answer.num_pregunta]) {
              acc[answer.num_pregunta] = [];
          }
          acc[answer.num_pregunta].push(answer.idOpcion);
          return acc;
      }, {});

      console.log("userAnswersGrouped: ", userAnswersGrouped);

      // Recorrer activityInfo y marcar isSelected
      this.feedbackData = feedback.activityInfo.map(question => {
          const correctAnswers = question.respuestas
              .filter(respuesta => respuesta.correcta)
              .map(respuesta => respuesta.idOpcion);

          const userSelectedAnswers = userAnswersGrouped[question.idPregunta] || [];

          const isCorrect = correctAnswers.length === userSelectedAnswers.length &&
                            correctAnswers.every(idOpcion => userSelectedAnswers.includes(idOpcion));

          return {
              ...question,
              questionIsCorrect: isCorrect,
              respuestas: question.respuestas.map(respuesta => {
                  return {
                      ...respuesta,
                      correcta: !!respuesta.correcta,
                      isSelected: userSelectedAnswers.includes(respuesta.idOpcion)
                  };
              })
          }; 
      });
      
      console.log("feedbackData: ", this.feedbackData);
    },
    formatOptions(respuestas) {
      return respuestas.map(respuesta => ({
        text: respuesta.texto,
        value: respuesta
      }));
    },
    isSelected(idPregunta, option) {
      return this.responses[idPregunta]?.includes(option);
    },
    toggleSelection(idPregunta, option) {
      const index = this.responses[idPregunta].indexOf(option);
      if (index > -1) {
        this.responses[idPregunta].splice(index, 1);
      } else {
        this.responses[idPregunta].push(option);
      }
      this.updateResponse(idPregunta, this.responses[idPregunta]);
    },
    updateResponse(idPregunta, selectedOptions) {
      this.$set(this.responses, idPregunta, selectedOptions);
    },
    sendAnswers() {
      this.$emit('updateLoading', true);
      const dataAnswers = {
        idEvaluacion: this.infoEvaluation.id_evaluaciones,
        answersUser: Object.keys(this.responses).map(idPregunta => {
          const question = this.activities.find(activity => activity.idQuestionDb === parseInt(idPregunta));
          return {
            idQuestionDb: question.idQuestionDb,
            idPregunta: question.idPregunta,
            pregunta: question.pregunta,
            respuestaSeleccionada: this.responses[idPregunta]
          };
        })
      };
      console.log("Data Answers: ", dataAnswers);

      ActivityService.solveActivityMultipleChoice(dataAnswers)
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
              console.log("Retroalimentación recibida: ", response); 
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
    this.activities.forEach(activity => {
      this.$set(this.responses, activity.idQuestionDb, []);
    });
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

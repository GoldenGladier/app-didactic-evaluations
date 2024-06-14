<template>
  <b-container>
    <h2>Crear preguntas de opción múltiple</h2>
    <b-row class="custom-center-flex">
      <b-col cols="12" md="8" class="px-0 px-md-3" v-for="(question, index) in questions" :key="question.key">
        <CreateMultipleChoiceQuestion
          :ref="'question' + index"
          :questionIndex="index"
          :question="question"
          @removeQuestion="removeQuestion(question.key)"
          class="my-3"
        ></CreateMultipleChoiceQuestion>
      </b-col>
      <b-col cols="12" md="8" class="px-0 px-md-3">
        <b-card class="mb-4 custom-button" @click="addNewQuestion" id="add-activity">
          <i class="bi bi-plus-lg"></i>Agregar pregunta de opción múltiple
        </b-card>
      </b-col>
    </b-row>

    <b-button type="submit" variant="success" class="mt-3" id="save-activities" @click="saveActivities" :disabled="!questions.length">
      <i class="bi bi-floppy"></i>Guardar preguntas
    </b-button>
  </b-container>
</template>

<script>
import CreateMultipleChoiceQuestion from '@/components/activities/MultipleChoice/CreateMultipleChoiceQuestion.vue';
import ActivityService from '@/services/ActivityService';

export default {
  name: 'EditMultipleChoiceQuestionWrapper',
  components: {
    CreateMultipleChoiceQuestion,
  },
  props: {
    evaluationData: null,
    isLoading: {
        type: Boolean,
        required: true
    },    
  },
  data() {
    return {
      questions: [],
      idEvaluation: null
    };
  },
  methods: {
    initData() {
        this.$emit('update:isLoading', true);
        this.idEvaluation = this.$route.params.idEvaluation;

        ActivityService.getActivitiesMultipleChoice(this.idEvaluation)
        .then((response) => {
            let newData = response.activityInfo?.map((question => {
                return {
                    question: question.pregunta,
                    options: question.respuestas.map((answer => {
                        return {
                            text: answer.texto,
                            isCorrect: answer.correcta ? true : false
                        }
                    }))
                }
            })) 
            this.questions = newData;
            console.log("New data from server: ", newData);
        })
        .catch(error => {
            console.error('Error al intentar obtener las preguntas:', error);
        })
        .finally(() => {
            this.$emit('update:isLoading', false);
        });          
    },
    addNewQuestion() {
      this.questions.push({
        key: Math.random().toString(36).substr(2, 9), // Generar una clave única para la pregunta
        question: '',
        options: [
          { text: '', isCorrect: false },
          { text: '', isCorrect: false },
          { text: '', isCorrect: false },
          { text: '', isCorrect: false },
        ],
      });
    },
    removeQuestion(questionKey) {
      const index = this.questions.findIndex(question => question.key === questionKey);
      if (index !== -1) {
        this.questions.splice(index, 1);
      }
    },
    validateQuestions() {
      const validationErrors = [];

      this.questions.forEach((question, index) => {
        if (!question.question.trim()) {
          validationErrors.push(`La pregunta ${index + 1} está vacía.`);
        }

        question.options.forEach((option, optionIndex) => {
          if (!option.text.trim()) {
            validationErrors.push(`La opción ${optionIndex + 1} de la pregunta ${index + 1} está vacía.`);
          }
        });

        const hasCorrectAnswer = question.options.some(option => option.isCorrect);
        if (!hasCorrectAnswer) {
          validationErrors.push(`La pregunta ${index + 1} no tiene ninguna respuesta correcta marcada.`);
        }
      });
      return validationErrors;
    },
    saveActivities() {
      this.$emit('update:isLoading', true);

      let validationErrors = this.validateQuestions();
      if (validationErrors.length > 0) {
        this.$emit('update:isLoading', false);
        this.$swal({
          icon: 'warning',
          title: '¡Parece que hay datos incompletos!',
          text: validationErrors.join('\n'),
        }); 
        return;
      }

      let preguntas = this.questions.map((question, indexQuestion) => {
        return {
          idPregunta: indexQuestion,
          pregunta: question.question,
          numeroRespuestas: question.options.length,
          respuestas: question.options.map((answer, answerIndex) => {
            return {
              idOpcion: answerIndex,
              texto: answer.text,
              status: answer.isCorrect 
            };
          })
        };
      });

      let activitiesToSave = {
        idEvaluacion: this.evaluationData.id_evaluaciones,
        preguntas: preguntas
      }
      console.log("ActivitiesToSave: ", activitiesToSave)

      ActivityService.addActivitiesMultipleChoice(activitiesToSave)
      .then(() => {
          this.$swal({
              icon: 'success',
              title: '¡Éxito!',
              text: 'Las preguntas se guardarón correctamente.',
          }).then(() => {
              this.$router.push('/evaluaciones/mis-evaluaciones');
          });
      })
      .catch(error => {
          console.error('Error al intentar guardar las preguntas:', error);
      })
      .finally(() => {
          this.$emit('update:isLoading', false);
      });       

    },
  },
  mounted() {
    this.initData();
  },
};
</script>
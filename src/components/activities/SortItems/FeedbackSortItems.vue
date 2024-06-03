<template>
  <div class="mt-3">
    <p>{{ `${numQuestion}. ${question}` }}</p>
    <div v-if="correcta">
      <p class="text-success"><i class="bi bi-check2 icon-check text-success"></i>Tu respuesta es correcta.</p>
      <div v-for="(respuesta, index) in respuestasCorrectas" :key="index + '-correct-user-answer'" class="correct-answer">
        {{ respuesta.texto }}
      </div>
    </div>
    <div v-else>
      <p class="text-danger"><i class="bi bi-x-lg text-danger" ></i>Tu respuesta es incorrecta.</p>
      <div v-for="(respuesta, index) in respuestasUsuario" :key="index + '-incorrect-user-answer'" class="user-answer text-danger">
        {{ respuesta.texto }}
      </div>
      <p class="text-success mt-3">Las respuestas correctas son:</p>
      <div v-for="(respuesta, index) in respuestasCorrectas" :key="index + '-correct-answer'" class="correct-answer text-success">
        {{ respuesta.texto }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FeedbackItems',
  props: {
    numQuestion: {
      type: Number,
      required: true
    },
    question: {
      type: String,
      required: true
    },
    correcta: {
      type: Boolean,
      required: true
    },
    respuestasCorrectas: {
      type: Array,
      required: true
    },
    respuestasUsuario: {
      type: Array,
      required: true
    }
  }
};
</script>

<style scoped>
.correct-answer {
  margin: 0.2rem;
  padding: 0.4rem 0.6rem;
  border-radius: 0.4rem;
  border: 1px solid #28a745;
  background-color: #d4edda;
}

.user-answer {
  margin: 0.2rem;
  padding: 0.4rem 0.6rem;
  border-radius: 0.4rem;
  border: 1px solid #dc3545;
  background-color: #f8d7da;
}
</style>

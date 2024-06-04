<template>
    <div class="question">
        <p>{{ feedback.pregunta }}</p>

        <div v-if="feedback.questionIsCorrect">
            <p class="text-success"><i class="bi bi-check-lg"></i> Tus respuestas son correctas.</p>
        </div>
        <div v-else>
            <p class="text-danger"><i class="bi bi-x-lg"></i> Tus respuestas son incorrectas.</p>
        </div>

        <div class="response-container">
            <div v-for="respuesta in feedback.respuestas" :key="`selected-${respuesta.idOpcion}`" class="response-option" :class="{'correct-answer': respuesta.isSelected && respuesta.correcta, 'incorrect-answer': respuesta.isSelected && !respuesta.correcta}">
                {{ respuesta.texto }}
            </div>
        </div>

        <div v-if="!feedback.questionIsCorrect">
            <p class="text-success mt-4">Las respuestas correctas son:</p>
            <div class="response-container">           
                <div v-for="respuesta in feedback.respuestas" :key="`correct-${respuesta.idOpcion}`" class="response-option" :class="{'correct-answer': respuesta.correcta}">
                    {{ respuesta.texto }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'FeedbackMultipleChoiceQuestion',
    props: {
        feedback: {
            type: Object,
            required: true
        }
    }
}
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

.correct-answer {
  border-color: var(--success);
  background-color: var(--green-rgba);
}

.incorrect-answer {
  border-color: var(--danger);
  background-color: var(--red-rgba);
}

</style>

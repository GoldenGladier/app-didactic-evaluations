<template>
  <b-container>
    <b-form-group label="Ingrese su pregunta:">
      <b-form-input v-model="question" placeholder="¿Cuál es la capital de Uruguay?"></b-form-input>
    </b-form-group>

    <b-form-group label="Opciones:">
      <div v-for="(option, index) in options" :key="index" class="mb-2">
        <b-input-group>
          <b-input-group-prepend>
            <b-input-group-text>
              <b-form-checkbox v-model="option.isCorrect"></b-form-checkbox>
            </b-input-group-text>
          </b-input-group-prepend>
          <b-form-input v-model="option.text" :placeholder="'Opción ' + (index + 1)"></b-form-input>
          <b-input-group-append>
            <b-button @click="removeOption(index)" variant="danger"><i class="bi bi-trash font-size-normal nm"></i></b-button>
          </b-input-group-append>
        </b-input-group>
      </div>
    </b-form-group>

    <b-button @click="addOption" variant="primary">Agregar Opción</b-button>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      question: '',
      options: [
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
        { text: '', isCorrect: false },
      ],
    };
  },
  methods: {
    addOption() {
      this.options.push({ text: '', isCorrect: false });
    },
    removeOption(index) {
      this.options.splice(index, 1);
    },
  },
};
</script>

<style scoped>
.mb-2 {
  margin-bottom: 0.5rem;
}
.custom-choice-answer {
  display: flex;
  align-items: center;
  padding: 0.5rem;
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}
.custom-choice-answer.answer-active {
  border-right: 1px solid var(--primary) !important;
  background-color: rgba(238, 111, 87, 0.05);
}
</style>

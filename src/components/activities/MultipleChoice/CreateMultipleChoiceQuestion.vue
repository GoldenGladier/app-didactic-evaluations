<template>
  <b-card style="position: relative" class="pt-3">
    <b-button class="help-button" @click="startTutorial"
      v-b-tooltip.hover.top="'Haz clic aquí para recibir un tutorial sobre cómo crear una pregunta de opción múltiple.'">
      <i class="bi bi-question-circle"></i>Ayuda
    </b-button>    

    <b-button @click="removeQuestion" variant="danger" size="sm" class="close-button custom-close-button" v-b-tooltip.hover title="Eliminar actividad" :id="'remove-activity'">
      <b-icon icon="x-lg"></b-icon>
    </b-button>

    <h5>Pregunta {{ questionIndex + 1 }}:</h5>
    <b-form-group>
      <b-form-input v-model="question.question" placeholder="Ingresa la pregunta" class="input-question"></b-form-input>
    </b-form-group>

    <b-form-group label="Opciones:">
      <div v-for="(option, index) in question.options" :key="index" class="mb-2 custom-center-flex">
        <b-input-group :class="{'answer-active': option.isCorrect}">
          <b-input-group-prepend>
            <b-input-group-text class="check-answer-active">
              <b-form-checkbox v-model="option.isCorrect"></b-form-checkbox>
            </b-input-group-text>
          </b-input-group-prepend>
          <b-form-input v-model="option.text" :placeholder="'Opcion ' + (index + 1)" class="input-answer"></b-form-input>
        </b-input-group>
        <b-button @click="removeOption(index)" variant="danger" size="sm" class="custom-close-button btn-delete-option mx-1" :id="'btn-delete-item-' + index" v-b-tooltip.hover title="Eliminar opción">
          <b-icon icon="x-lg"></b-icon>
        </b-button>
      </div>
    </b-form-group>

    <b-button @click="addOption" variant="primary" class="btn-agregar-otra-opcion"><i class="bi bi-plus-lg"></i>Agregar otra opción</b-button>
  </b-card>
</template>

<script>
import driverMixin from '@/mixins/driverMixin';

export default {
  name: 'CreateMultipleChoiceQuestion',
  props: {
    question: {
      type: Object,
      required: true,
    },
    questionIndex: {
      type: Number,
      required: true,
    }
  },
  mixins: [driverMixin],
  methods: {
    addOption() {
      this.question.options.push({ text: '', isCorrect: false });
    },
    removeOption(index) {
      this.question.options.splice(index, 1);
    },
    removeQuestion() {
      this.$emit('removeQuestion', this.question.key);
    },
    startTutorial() {
      this.startTour([
        {
          element: '.input-question',
          popover: {
            title: 'Pregunta',
            description: 'Escribe tu pregunta en el campo proporcionado.',
            position: 'top',
          },
        },
        {
          element: '.input-answer',
          popover: {
            title: 'Agregar opciones de respuesta',
            description: 'Debajo del campo de la pregunta, encontrarás varios campos para las opciones de respuesta. Escribe la respuesta en el campo de texto.',
            position: 'top',
          },
        },
        {
          element: '.check-answer-active',
          popover: {
            title: 'Marcar respuestas correctas',
            description: 'Marca el checkbox si la opción es la respuesta correcta <i class="bi bi-check2-square nm"></i>.',
            position: 'top',
          },
        },
        {
          element: '.btn-agregar-otra-opcion',
          popover: {
            title: 'Agregar más opciones',
            description: 'Si necesitas más opciones de respuesta, haz clic en el botón "<i class="bi bi-plus-lg nm"></i>Agregar otra opción". Esto añadirá un nuevo campo de respuesta.',
            position: 'top',
          },
        },
        {
          element: '.btn-delete-option',
          popover: {
            title: 'Eliminar Opciones',
            description: 'Si deseas eliminar una opción, haz clic en el icono de <i class="bi bi-x-lg nm"></i> al lado de la opción correspondiente.',
            position: 'top',
          },
        },
      ]);
    }
  },
};
</script>

<style scoped>
.mb-2 {
  margin-bottom: 0.5rem;
}
.answer-active {
  border: 1px solid var(--primary) !important;
  background-color: rgba(238, 111, 87, 0.05);
  border-radius: 0.25rem;
}
.answer-active .input-answer {
  background-color: rgba(238, 111, 87, 0.01);
  border: none;
  border-left: 1px solid var(--primary) !important;
}
.answer-active .check-answer-active {
  background-color: rgba(238, 112, 87, 0.20);
  border: none;
}
</style>

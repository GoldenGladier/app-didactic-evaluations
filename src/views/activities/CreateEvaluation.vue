<template>
  <b-container class="custom-master-container custom-card-box custom-center-flex">

    <b-overlay :show="isLoading" class="width-100">      
      <b-container>  
        <h1 class="text-center mb-4">Crear evaluación</h1>
        <b-form @submit.prevent="create()">

          <b-row class="justify-content-center">          
            <b-col bg="6" md="6" sm="12" class="custom-mini-form">
              <b-form-group label="Título" label-for="title" class="mt-1 required-label">
                <b-form-input
                  id="title"
                  type="text"
                  v-model="title"                    
                  placeholder="Ingresa el título de la actividad"
                  maxlength="100"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group label="Subtítulo" label-for="subtitle" class="mt-1">
                <b-form-input
                  id="subtitle"
                  type="text"
                  v-model="subtitle"                    
                  placeholder="Ingresa el subtítulo de la actividad"
                  maxlength="200"                  
                ></b-form-input>
              </b-form-group>
              <b-form-group label="Descripción o instrucciones" label-for="description" class="mt-1">  
                <b-form-textarea
                  id="description"
                  v-model="description"
                  placeholder="Ingresa una descripción o instrucciones de la actividad..."
                  rows="3"
                  maxlength="500"
                ></b-form-textarea>     
              </b-form-group>
              <b-form-checkbox v-model="feedback" id="feedback" name="check-button" class="custom-checkbox-switch mb-4 mb-md-0" size="lg" switch >             
                Los alumnos podrán ver sus resultados al finalizar la evaluación, incluyendo las respuestas correctas a sus errores.
              </b-form-checkbox>      
            </b-col>

            <b-col bg="6" md="6" sm="12" class="custom-mini-form mt-4 mt-md-0">             
              <b-form-group label="Fecha de activación de la actividad" label-for="activationDate" class="required-label"> 
                <b-form-datepicker id="activationDate" v-model="activationDate" locale="es" class="mb-2" requerid></b-form-datepicker>
              </b-form-group>
              <b-form-group label="Hora de activación de la actividad" label-for="subtitle" class="mt-1 required-label">
                <!-- <b-time v-model="activationTime" locale="es" @context="onContext" class="mb-2"></b-time> -->
                <b-form-timepicker v-model="activationTime" class="mb-2" requerid></b-form-timepicker>
              </b-form-group>
                        
              <b-form-group label="Fecha de finalización de la actividad" label-for="deactivationDate" class="required-label"> 
                <b-form-datepicker id="deactivationDate" v-model="deactivationDate" locale="es" class="mb-2" requerid></b-form-datepicker>
              </b-form-group>
              <b-form-group label="Hora de finalización de la actividad" label-for="subtitle" class="mt-1 required-label" requerid>
                <b-form-timepicker v-model="deactivationTime" class="mb-2"></b-form-timepicker>
              </b-form-group>                           
            </b-col>

          </b-row>
          <hr class="mt-4 mb-4">
          <b-row class="justify-content-center">  
            <b-col cols="12">
              <p class="lead mt-4">
                Selecciona una opción:
              </p>
            </b-col>            

            <b-col v-for="dinamic in dinamicsList" :key="dinamic.id_dinamicas" bg="6" md="6" sm="12" class="custom-card-item">
              <div :class="{'custom-card-item-content': true, 'active': (idDinamic === dinamic.id_dinamicas)}" @click="idDinamic = dinamic.id_dinamicas" class="d-flex align-items-center">
                <b-img v-bind:src="getImage(dinamic)" alt="Responsive image" class="custom-img-evaluation mr-2"></b-img>
                <div class="text-content mr-1">
                  <h4>{{dinamic.dinamica}}</h4>                   
                  <p class="text-justify mb-1">{{dinamic.descripcion}}</p>
                </div>
              </div>              
            </b-col>                

          </b-row>
          
          <b-button type="submit" variant="primary" class="mt-3"><i class="bi bi-floppy"></i>Crear evaluación</b-button>

        </b-form>
      </b-container>
    </b-overlay>
  </b-container>       
</template>
    
    
<script>
import EvaluationService from '@/services/EvaluationService';
import SortText from '@/assets/dinamics/Sort-text.png';
import SortItems from '@/assets/dinamics/Sort-items.png';
import MultipleChoice from '@/assets/dinamics/MultipleChoice.png';
import Crossword from '@/assets/dinamics/Crossword.png';
import Wordsearch from '@/assets/dinamics/Wordsearch.png';
import BadImage from '@/assets/dinamics/Bad-image.png';

export default {
  name: 'CreateEvaluation',
  data() {
    return {
      isLoading: false,
      title: '',
      subtitle: '',
      description: '',
      feedback: false,
      activationDate: null,
      activationTime: null,
      deactivationDate: null,
      deactivationTime: null,
      idDinamic: 1,

      dinamicsList: [],

      mostrarSubcontenedores: false,
      mostrarSubcontenedores2: false,
      mostrarSubcontenedores3: false,
      contenedorSeleccionado: 0, // Índice del contenedor seleccionado (por defecto, el primero)
        subcontenedorSeleccionado: 0, // Índice del subcontenedor seleccionado (por defecto, el primero)
      imagePaths: {
        'Ordena el enunciado': SortText,
        'Ordena los items': SortItems,
        'Opción múltiple': MultipleChoice,
        'Crucigrama': Crossword,
        'Sopa de letras': Wordsearch,
        'default': BadImage
      }    
    };
  },
  created() {             
    EvaluationService.getDinamics()
    .then(response => {
      console.log("Dinámicas: ", response);
      this.dinamicsList = response
    })
    .catch(error => {
      console.error('Error:', error);
      this.$swal({
        icon: 'error',
        title: '¡Error!',
        text: error,
      });     
    });           
  },
  methods: {
    create() {
      console.log("Horas", this.activationTime, 'desactivacion', this.deactivationTime);
      if (this.activationDate > this.deactivationDate || 
          (this.activationDate === this.deactivationDate && this.activationTime >= this.deactivationTime)) {
        this.$swal({
          icon: 'error',
          title: 'Error',
          text: 'La fecha y hora de activación deben ser anteriores a la fecha y hora de finalización.',
        });
        return; // Detener la ejecución del método si hay un error
      }

      this.isLoading = true
      let newEvaluation = {
        title: this.title,
        subtitle: this.subtitle,
        description: this.description,
        feedback: this.feedback,
        activationDate: this.activationDate,
        activationTime: this.activationTime,
        deactivationDate: this.deactivationDate,
        deactivationTime: this.deactivationTime,          
        idDinamic: this.idDinamic.toString(),
      }
      console.log("Se quiere crear la evaluación: ", newEvaluation);

      EvaluationService.create(newEvaluation)
      .then(response => {
        this.isLoading = false
        console.log("Creando evaluación response.data: ", response);
        let idEvaluation = response.evaluation.id_evaluaciones;
      
        this.$swal({
          icon: 'success',
          title: '¡Éxito!',
          text: 'La evaluación se ha creado correctamente',
        }).then(() => {
          this.$router.push(`/evaluaciones/${idEvaluation}/crear-actividades`);
        });            
        
      })
      .catch(error => {
        console.error('Error:', error);
        this.isLoading = false
        this.$swal({
          icon: 'error',
          title: '¡Error!',
          text: error,
        });     
      });           
    },

    getIcon(clasification) {
      let icon = ''
      if(clasification == "ORDER"){
        icon = 'text-paragraph'
      }
      else if(clasification == "LISTOFITEMS"){
        icon = 'list-ol'
      }
      else if(clasification == "QUESTIONANSWER"){
        icon = 'question-lg'
      }

      return icon
    },
    getImage(clasification) {
      return this.imagePaths[clasification.dinamica] || this.imagePaths['default'];
    },              
  },
  mounted() {
    // Establecer fechas y horas por defecto
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);

    this.activationDate = now.toISOString().split('T')[0]; // Fecha actual
    this.activationTime = now.toTimeString().split(' ')[0].slice(0, 5); // Hora actual
    this.activationTime = now.toTimeString().split(' ')[0].slice(0, 5) + ':00';

    this.deactivationDate = tomorrow.toISOString().split('T')[0]; // Fecha de mañana
    this.deactivationTime = '23:59'; // 11:59 PM
  },      
};
</script>
    
<style>

.custom-mini-form {
  width: 100%;
  padding: 0 2rem;
}
.custom-checkbox-switch .custom-control-label {
  text-align: left;
  color: #2c3e50;
  font-size: 1rem !important; 
  padding-top: 0.2rem;
}

.custom-card-item {  
  display: block;
  margin-bottom: 1rem;
}

.custom-card-item-content {
  padding: 0.5rem;
  border-radius: 0.4rem;
  border: 1px solid #ccc;
  cursor: pointer;
}

.custom-card-item-content.active {
  border: 1px solid var(--primary) !important;
  background-color: rgba(238, 111, 87, 0.05);
}

.custom-card-item-content {
  display: flex;
  align-items: center;
}

.custom-img-evaluation {
  flex: 0 0 25%; 
  max-width: 25%; 
}

.text-content {
  flex: 1; 
}    
</style>
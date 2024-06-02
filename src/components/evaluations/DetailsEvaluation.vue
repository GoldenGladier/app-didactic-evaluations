<template>  
    <b-container class="p-1 p-md-3">  
      <b-overlay :show="isLoading" class="width-100">      
        <h1 class="text-center mb-4">Detalles de la evaluación</h1>
        <b-form @submit.prevent="update()">

          <b-row class="justify-content-center">          
            <b-col bg="6" md="6" sm="12" class="custom-mini-form">
              <b-form-group label="Titulo" label-for="title" class="mt-1 required-label">
                <b-form-input
                  id="title"
                  type="text"
                  v-model="title"                    
                  placeholder="Ingresa el titulo de la actividad"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group label="Subtitulo" label-for="subtitle" class="mt-1">
                <b-form-input
                  id="subtitle"
                  type="text"
                  v-model="subtitle"                    
                  placeholder="Ingresa el subtitulo de la actividad"                  
                ></b-form-input>
              </b-form-group>
              <b-form-group label="Descripción o instrucciones" label-for="description" class="mt-1">  
                <b-form-textarea
                  id="description"
                  v-model="description"
                  placeholder="Ingresa una descripción o instrucciones de la actividad..."
                  rows="3"
                ></b-form-textarea>     
              </b-form-group>
              <b-form-checkbox v-model="feedback" id="feedback" name="check-button" class="custom-checkbox-switch mb-4 mb-md-0" size="lg" switch >             
                Los alumnos podrán ver sus resultados al finalizar la evaluación   
              </b-form-checkbox>      
            </b-col>
            <b-col bg="6" md="6" sm="12" class="custom-mini-form">             
              <b-form-group label="Fecha de activación de la actividad" label-for="activationDate" class="required-label"> 
                <b-form-datepicker id="activationDate" v-model="activationDate" locale="es" class="mb-2" requerid></b-form-datepicker>
              </b-form-group>
              <b-form-group label="Hora de activación de la actividad" label-for="subtitle" class="mt-1 required-label">
                <b-form-timepicker v-model="activationTime" class="mb-2" requerid></b-form-timepicker>
              </b-form-group>
                        
              <b-form-group label="Fecha de finalización de la actividad" label-for="deactivationDate" class="required-label"> 
                <b-form-datepicker id="deactivationDate" v-model="deactivationDate" locale="es" class="mb-2" requerid></b-form-datepicker>
              </b-form-group>
              <b-form-group label="Hora de finalización de la actividad" label-for="subtitle" class="mt-1 required-label">
                <b-form-timepicker v-model="deactivationTime" class="mb-2" requerid></b-form-timepicker>
              </b-form-group>                           
            </b-col>

          </b-row>
          <hr class="mt-4 mb-4">
          <b-row class="justify-content-center">  
            <b-col cols="12">
              <p class="mt-2">
                Selecciona el tipo de evaluación que deseas crear...
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
          
          <b-button type="submit" variant="success" class="mt-2 mb-3">
            <i class="bi bi-floppy"></i>
            Guardar cambios
          </b-button>

        </b-form>
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
      name: "DetailsEvaluation",
      props: {
        evaluationData: null,
        dinamicsList: [],
      },
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
          idDinamic: null,   
          id_evaluaciones: null,

          imagePaths: {
            'Ordena el enunciado': SortText,
            'Ordena los items': SortItems,
            'Opción multiple': MultipleChoice,
            'Crucigrama': Crossword,
            'Sopa de letras': Wordsearch,
            'default': BadImage
          }            
        };
      },
      created() {             
        if(this.evaluationData){
          this.initData()
        }
      },
      methods: {
        initData() {
          this.isLoading = true;
          this.title = this.evaluationData.nombre;
          this.subtitle = this.evaluationData.subtitulo;
          this.description = this.evaluationData.descripcion;
          this.feedback = this.evaluationData.retroalimentacion_activa == 1 ? true : false;
          this.activationDate = this.evaluationData.fecha_activacion;
          this.activationTime = this.evaluationData.hora_activacion;
          this.deactivationDate = this.evaluationData.fecha_desactivacion;
          this.deactivationTime = this.evaluationData.hora_desactivacion;        
          this.idDinamic = this.evaluationData.id_dinamica;  
          this.id_evaluaciones = this.evaluationData.id_evaluaciones;  
          this.isLoading = false;
        },        
        update() {
          this.isLoading = true
          let newDataEvaluation = {
            title: this.title,
            subtitle: this.subtitle,
            description: this.description,
            feedback: this.feedback,
            activationDate: this.activationDate,
            activationTime: this.activationTime,
            deactivationDate: this.deactivationDate,
            deactivationTime: this.deactivationTime,          
            idDinamic: this.idDinamic,
          }
          console.log("Se quiere actualizar la evaluación: ", newDataEvaluation);

          EvaluationService.update(this.id_evaluaciones, newDataEvaluation)
          .then(response => {
            console.log("Creando evaluación response.data: ", response);
          
            this.$swal({
              icon: 'success',
              title: '¡Éxito!',
              text: 'Los cambios en los detalles de la evaluación se guardarón correctamente.',
            }).then(() => {
              this.$router.replace({ name: 'EditEvaluation', params: { idEvaluation: this.$route.params.idEvaluation, tabId: 'details' } });   
            });                        
          })
          .catch(error => {
            console.error('Error:', error);
            this.$swal({
              icon: 'error',
              title: '¡Error!',
              text: error,
            });     
          })
          .finally(() => {
            this.isLoading = false
          });           
        },
        getImage(clasification) {
          // console.log("Clasificación: ", clasification.dinamica);
          return this.imagePaths[clasification.dinamica] || this.imagePaths['default'];
        },       
      },
      watch: {
        evaluationData() {
          this.initData()
        }
      }
    };
</script>
    
<style>

.custom-mini-form {
  padding: 0 2rem;
}
.custom-checkbox-switch .custom-control-label {
  text-align: left;
  color: #2c3e50;
  font-size: 1rem !important; 
  /* margin-top: 2rem; 
  margin-bottom: 2rem; */
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
  border: 1px solid var(--primary);
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
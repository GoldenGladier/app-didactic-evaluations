<template>
  <b-container class="custom-master-container custom-card-box custom-center-flex">

    <b-overlay :show="isLoading" class="width-100">      
      <b-container>  
        <h1 class="text-center mb-4">Crear Evaluación</h1>
        <b-form @submit.prevent="create()">

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
                  placeholder="Ingresa el subtitle de la actividad"                  
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
              <b-form-checkbox v-model="feedback" id="feedback" name="check-button" class="custom-checkbox-switch" size="lg" switch >             
                Los alumnos podrán ver sus resultados al finalizar la evaluación   
              </b-form-checkbox>      
            </b-col>

            <b-col bg="6" md="6" sm="12" class="custom-mini-form">             
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
                Selecciona el tipo de evaluación que deseas crear:
              </p>
            </b-col>
            
            <!-- <b-col v-for="dinamic in dinamicsList" :key="dinamic.id_dinamicas" bg="6" md="6" sm="12" class="custom-card-item">
              <div :class="{'custom-card-item-content': true, 'active': (idDinamic === dinamic.id_dinamicas)}" @click="idDinamic = dinamic.id_dinamicas" >
                <h4><b-icon :icon="getIcon(dinamic.clasification.clasificacion)" /> {{dinamic.dinamica}}</h4>                
                <b-img v-bind:src="require('@/assets/dinamics/Crossword.png')" alt="Responsive image" class="custom-img mb-3"></b-img>
                <p>{{dinamic.descripcion}}</p>
              </div>              
            </b-col>         -->

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
          
          <b-button type="submit" variant="primary" class="mt-3"><i class="bi bi-floppy"></i>Crear Evaluación</b-button>

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
          idDinamic: '',

          dinamicsList: [],

          mostrarSubcontenedores: false,
          mostrarSubcontenedores2: false,
          mostrarSubcontenedores3: false,
          contenedorSeleccionado: 0, // Índice del contenedor seleccionado (por defecto, el primero)
            subcontenedorSeleccionado: 0, // Índice del subcontenedor seleccionado (por defecto, el primero)
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
        EvaluationService.getDinamics()
        .then(response => {
          console.log("Dinamicas: ", response);
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
          console.log("Clasificación: ", clasification.dinamica);
          return this.imagePaths[clasification.dinamica] || this.imagePaths['default'];
        },       
    
   
      },
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
  border: 1px solid var(--primary) !important;
  background-color: rgba(238, 111, 87, 0.05);
}

    .custom-master-container {
      min-height: 100%;
    }


   .contenedor-principal {
    width: 50%;
    margin: 0 auto;
    text-align: center;
    padding: 20px;
   
    }

    .contenedor:hover {
      background-color: #759eca; /* Azul más oscuro al pasar el cursor */
    }

    .contenedor {
      border: 1px solid #ccc;
      padding: 20px;
      border-radius: 10px;
      cursor: pointer;
      transition: background-color 0.3s ;
    }
    
    .contenedor h2 {
      margin-top: 0;
    }
    
    .subcontenedores {
      display: flex;
      flex-direction: column;
      margin-top: 20px;
      border-radius: 10px;
    }
    
    .subcontenedor {
      margin-bottom: 10px;
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 5px;
      cursor: pointer;
    }
    
    .subcontenedor h3 {
      margin-top: 0;
      margin-bottom: 10px;
    }
    
    .boton-redondo-azul {
        background-color: #fff; /* Color de fondo blanco */
      color: #000; /* Color del texto negro */
      padding: 10px 20px; /* Ajuste de relleno */
      border: 1px solid #ccc; /* Borde gris claro */
      border-radius: 5px; /* Bordes redondeados */
      cursor: pointer; /* Cursor en forma de puntero */
      transition: background-color 0.3s; /* Animación de hover */
    }
    
    .boton-redondo-azul:hover {
      background-color: #0056b3; /* Azul más oscuro al pasar el cursor */
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
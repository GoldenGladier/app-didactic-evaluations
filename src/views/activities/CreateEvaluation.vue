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
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group label="Descripción o instrucciones" label-for="description" class="mt-1">  
                <b-form-textarea
                  id="description"
                  v-model="description"
                  placeholder="Ingresa una descripción o instrucciones de la actividad..."
                  rows="3"
                ></b-form-textarea>     
                <!-- max-rows="6"            -->
              </b-form-group>
              <b-form-checkbox v-model="feedback" id="feedback" name="check-button" class="custom-checkbox-switch" size="lg" switch >             
                Los alumnos podrán ver sus resultados al finalizar la evaluación   
              </b-form-checkbox>      
            </b-col>
            <b-col bg="6" md="6" sm="12" class="custom-mini-form">             
              <b-form-group label="Fecha de activación de la actividad" label-for="activationDate"> 
                <b-form-datepicker id="activationDate" v-model="activationDate" locale="es" class="mb-2"></b-form-datepicker>
              </b-form-group>
              <b-form-group label="Hora de activación de la actividad" label-for="subtitle" class="mt-1">
                <!-- <b-time v-model="activationTime" locale="es" @context="onContext" class="mb-2"></b-time> -->
                <b-form-timepicker v-model="activationTime" class="mb-2"></b-form-timepicker>
              </b-form-group>
                        
              <b-form-group label="Fecha de finalización de la actividad" label-for="deactivationDate"> 
                <b-form-datepicker id="deactivationDate" v-model="deactivationDate" locale="es" class="mb-2"></b-form-datepicker>
              </b-form-group>
              <b-form-group label="Hora de finalización de la actividad" label-for="subtitle" class="mt-1">
                <b-form-timepicker v-model="deactivationTime" class="mb-2"></b-form-timepicker>
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
              <div :class="{'custom-card-item-content': true, 'active': (idDinamic === dinamic.id_dinamicas)}" @click="idDinamic = dinamic.id_dinamicas" >
                <h4><b-icon :icon="getIcon(dinamic.clasification.clasificacion)" /> {{dinamic.dinamica}}</h4>                
                <p>{{dinamic.descripcion}}</p>
              </div>              
            </b-col>            

            <!-- <b-col bg="6" md="6" sm="12" class="custom-card-item">
              <div class="custom-card-item-content">
                <h4><b-icon icon="text-paragraph" /> Ordena el enunciado</h4>                
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>              
            </b-col>
            <b-col bg="6" md="6" sm="12" class="custom-card-item">
              <div class="custom-card-item-content">                
                <h4><b-icon icon="list-ol" /> Ordena los items</h4>                
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>   
            </b-col>
            <b-col bg="6" md="6" sm="12" class="custom-card-item">
              <div class="custom-card-item-content">                
                <h4><b-icon icon="question-lg" /> Pregunta y respuesta</h4>                
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry.</p>
              </div>   
            </b-col> -->

          </b-row>
          
          <b-button type="submit" variant="primary" class="mt-3" >Crear Evaluación</b-button>

        </b-form>
      </b-container>
    </b-overlay>


  <!-- <div class="container">
        <p class="text-center mb-3"> A continuación se muestran las dinámicas de evaluación que puedes seleccionar para crear.</p>
        <div class="contenedor-principal">
          <div class="contenedor" @click="toggleContenedor">
            <h3 class="text-center mb-3" >Pregunta-Respuesta</h3>
          </div>
      
          <div class="subcontenedores" v-if="mostrarSubcontenedores">
            <div class="subcontenedor" @click="abrirSubcontenedor1">
              <h4 class="text-center mb-3">Gato</h4>
              <b-button id="Gato" variant="info" class="mr-2" @click="abrirBotonSubcontenedor1">Crear</b-button>
            </div>
            <div class="subcontenedor" @click="abrirSubcontenedor2">
              <h4 class="text-center mb-3">Conecta 4</h4>
              <b-button id="conecta4" variant="info" class="mr-2" @click="abrirBotonSubcontenedor2">Crear</b-button>
            </div>
          </div>
        </div>

        <div class="contenedor-principal">
          <div class="contenedor" @click="toggleContenedor2">
            <h3 class="text-center mb-3">Ordenamiento</h3>
          </div>
      
          <div class="subcontenedores" v-if="mostrarSubcontenedores2">
            <div class="subcontenedor" @click="abrirSubcontenedorOrd1">
              <h4 class="text-center mb-3">Ordena los items</h4>
              <b-button id="Ordenaritems" variant="info" class="mr-2" @click="abrirBotonSubcontenedorOrd1">Crear</b-button>
            </div>
              
            </div>
    
          </div>
          <div class="contenedor-principal">
          <div class="contenedor" @click="toggleContenedor3">
            <h3 class="text-center mb-3">Relación de columnas</h3>
          </div>
      
          <div class="subcontenedores" v-if="mostrarSubcontenedores3">
            <div class="subcontenedor" @click="abrirSubcontenedorCol1">
              <h4 id="meroma" class="text-center mb-3">Memorama</h4>
              <b-button variant="info" class="mr-2" @click="abrirBotonSubcontenedorCol1">Crear</b-button>
            </div>
            <div class="subcontenedor" @click="abrirSubcontenedorCol2">
              <h4 class="text-center mb-3">Conecta los items</h4>
              <b-button id="conecta-items" variant="info" class="mr-2" @click="abrirBotonSubcontenedorCol2">Crear</b-button>
            </div>
          </div>
        </div>
        </div> -->
  </b-container>       
</template>
    
    
<script>
import EvaluationService from '@/services/EvaluationService';

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

        toggleContenedor() {
          this.mostrarSubcontenedores = !this.mostrarSubcontenedores;
        },
        abrirSubcontenedor1() {
        },
        abrirSubcontenedor2() {
          
        },
        abrirBotonSubcontenedor1(){
        },
        abrirBotonSubcontenedor2(){
        },
    
    
        //esto es lo de Ordenamiento
        toggleContenedor2() {
          this.mostrarSubcontenedores2 = !this.mostrarSubcontenedores2;
        },
        abrirSubcontenedorOrd1() {
        },
        abrirBotonSubcontenedorOrd1(){
        },
    
        //esto es lo de Relacion de columnas 
        toggleContenedor3() {
          this.mostrarSubcontenedores3 = !this.mostrarSubcontenedores3;
        },
        abrirSubcontenedorCol1() {
        },
        abrirSubcontenedorCol2() {
        },
        abrirBotonSubcontenedorCol1(){
        },
        abrirBotonSubcontenedorCol2(){
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
  border: 1px solid var(--primary);
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
    </style>
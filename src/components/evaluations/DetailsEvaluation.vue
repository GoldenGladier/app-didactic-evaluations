<template>  
    <b-container>  
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
              <div :class="{'custom-card-item-content': true, 'active': (idDinamic == dinamic.id_dinamicas)}" @click="idDinamic = dinamic.id_dinamicas" >
                <h4><b-icon :icon="getIcon(dinamic.clasification.clasificacion)" /> {{dinamic.dinamica}}</h4>                
                <p>{{dinamic.descripcion}}</p>
              </div>              
            </b-col>            

          </b-row>
          
          <b-button type="submit" variant="success" class="mt-3" >Guardar cambios</b-button>

        </b-form>
    </b-container>
</template>
    
    
<script>
// import EvaluationService from '@/services/EvaluationService';

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
          idDinamic: '',   
        };
      },
      created() {             
        if(this.evaluationData){
          this.initData()
        }
      },
      methods: {
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

          // EvaluationService.create(newEvaluation)
          // .then(response => {
          //   this.isLoading = false
          //   console.log("Creando evaluación response.data: ", response);
          //   let idEvaluation = response.evaluation.id_evaluaciones;
          
          //   this.$swal({
          //     icon: 'success',
          //     title: '¡Éxito!',
          //     text: 'Los cambios en los detalles de la evaluación se guardarón correctamente.',
          //   }).then(() => {
          //     this.$router.push(`/evaluaciones/${idEvaluation}/crear-actividades`);
          //   });                        
          // })
          // .catch(error => {
          //   console.error('Error:', error);
          //   this.isLoading = false
          //   this.$swal({
          //     icon: 'error',
          //     title: '¡Error!',
          //     text: error,
          //   });     
          // });           
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
        initData() {
          this.title = this.evaluationData.nombre;
          this.subtitle = this.evaluationData.subtitulo;
          this.description = this.evaluationData.descripcion;
          this.feedback = this.evaluationData.retroalimentacion_activa == 1 ? true : false;
          this.activationDate = this.evaluationData.fecha_activacion;
          this.activationTime = this.evaluationData.hora_activacion;
          this.deactivationDate = this.evaluationData.fecha_desactivacion;
          this.deactivationTime = this.evaluationData.hora_desactivacion;        
          this.idDinamic = this.evaluationData.id_dinamica;  
        }
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
</style>
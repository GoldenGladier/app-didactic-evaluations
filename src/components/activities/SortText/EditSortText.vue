<template>
  <b-container>

    <b-overlay :show="isLoading" class="width-100">      
      <b-container>  
        <h1 class="text-center mb-4">Editar actividades de la evaluación</h1>

        <b-form @submit.prevent="updateActivities()">

          <b-row class="justify-content-center">          
            <b-col v-for="(activity, index) in activities" :key="index" bg="10" md="8" sm="12">
              <!-- {{activity}} -->
              <b-form-group :label="'Actividad ' + (index + 1)" :label-for="'description' + index" class="mt-1 required-label">  

                <div class="d-flex">
                  <b-form-textarea
                    :id="'description' + index"
                    v-model="activities[index].oracion"
                    placeholder="El enunciado que ingreses así será mostrado a los alumnos de forma desordenada"
                    rows="2"
                    class="mr-2"
                    @input="markChanges()"
                    required
                  ></b-form-textarea>
                  <b-button @click="removeActivity(activities[index].id_ordenamiento, index)" variant="danger" size="sm" class="custom-close-button" v-b-tooltip.hover title="Eliminar actividad">
                    <b-icon icon="x-lg"></b-icon>
                  </b-button>
                </div>
              </b-form-group>              

            </b-col>
            <b-col bg="10" md="8" sm="12" class="custom-button">
              <b-card class="mt-3 custom-button" @click="addNewActivity()" id="add-activity">
                <b-icon icon="plus"></b-icon> <span class="button-text">Agregar otra actividad</span>
              </b-card>                
            </b-col>
          </b-row>   

          <hr class="mt-4 mb-4">
          
          <b-button type="submit" variant="success" class="custom-button-iconmt-3" :disabled="cambiosSinGuardar" >
            <i class="bi bi-floppy"></i> <span class="button-text">Guardar actividades de la evaluación</span>
          </b-button>

        </b-form>
      </b-container>
    </b-overlay>

  </b-container>       
</template>    

<script>
  import ActivityService from '@/services/ActivityService';

  export default {
    name: "DetailsActivities",
    props: {
      evaluationData: null
    },
    data() {
      return {
        isLoading: false,
        idEvaluation: null,
        activities: [],
        activitiesListData: [],
        cambiosSinGuardar: false
      };
    },
    methods: {
      init_data() {
        this.isLoading = true;
        this.idEvaluation = this.$route.params.idEvaluation;
        ActivityService.getActivities(this.idEvaluation).catch(error => {
          if (error.message === "No hay actividades asociadas a la evaluación.") {
            console.log("No hay actividades asociadas a la evaluación.");
            return []; 
          } else {
            throw error;
          }
        })
        .then(response => { 
          this.activitiesListData = response;
          this.activities = JSON.parse(JSON.stringify(this.activitiesListData));          
        }).catch(error => {
          console.error('Error:', error);
        }).finally(() => {
          this.isLoading = false;
        })             
      },
      addNewActivity() {
        const nextQuestionNumber = this.activities.length + 1;
        const idEvaluaciones = this.evaluationData.id_evaluaciones ? this.evaluationData.id_evaluaciones : null
        this.activities.push({ oracion: '', id_evaluacion: idEvaluaciones, num_pregunta: nextQuestionNumber });
        this.cambiosSinGuardar = true;
      },
      removeActivity(id_ordenamiento, index) {
        this.isLoading = true
        if(id_ordenamiento){
          ActivityService.deleteActivityOrderStatement(id_ordenamiento)
          .then(response => {
            console.log("Elimine la actividad: ", response);
            this.$router.replace({ name: 'EditEvaluation', params: { idEvaluation: this.$route.params.idEvaluation, tabId: 'activities' } });     
          })
          .catch(error => {
            console.error('Error al intentar eliminar la actividad:', error);  
            this.isLoading = false
          });           
        }
        else{
          this.activities.splice(index, 1);
          this.isLoading = false
        }
      },      
      updateActivities(){
        this.isLoading = true;
        this.activities.forEach((activity) => {
          const newActivity = {
            letter: activity.oracion,
            idEvaluacion: activity.id_evaluacion,
            idDinamica:  this.evaluationData.id_dinamica,
            questionNumber: activity.num_pregunta,
          }
          console.log("Nueva actividad: ", newActivity)
          ActivityService.addActivityOrderStatement(newActivity)
          .then(response => {
            console.log("Guarde la actividad: ", response);
          })
          .catch(error => {
            console.error('Error al intentar guardar la actividad:', error);  
          });  
        });
        
        this.$swal({
          icon: 'success',
          title: '¡Éxito!',
          text: 'Las actividades se guardarón correctamente',
        })
        .then(() => {
          this.$router.replace({ name: 'EditEvaluation', params: { idEvaluation: this.$route.params.idEvaluation, tabId: 'activities' } });   
        });   
        this.isLoading = false;
      },
      markChanges() {
        // Verificar si alguna actividad ha sido modificada
        if(this.activities.length == this.activitiesListData.length){
          for (let i = 0; i < this.activities.length; i++) {
            if (this.activities[i].oracion !== this.activitiesListData[i].oracion) {
              // Si la oración de alguna actividad ha cambiado, marcar que ha habido cambios sin guardar
              console.log("encontre una diferencia entre: ", this.activities[i].oracion, this.activitiesListData[i].oracion);
              this.cambiosSinGuardar = false;
              return; 
            }
          }
        }
        else{
          console.log("Poniendo true")
          this.cambiosSinGuardar = true;
        }
        // Si no se encuentra ninguna actividad modificada, marcar que no hay cambios sin guardar
        this.cambiosSinGuardar = false;
      }      
    },
    created() {
      this.init_data();
    },
    watch: {
      activitiesListData() {
        this.activities = JSON.parse(JSON.stringify(this.activitiesListData));
      }
    }
  };
</script>
  
<style scoped>

</style>
  


  
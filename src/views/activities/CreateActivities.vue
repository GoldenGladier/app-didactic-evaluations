<template>
  <b-container class="custom-master-container custom-card-box custom-center-flex">

    <b-overlay :show="isLoading" class="width-100">      
      <b-container>  
        <h1 class="text-center mb-4">Crear actividades de la evaluación</h1>

        <b-form @submit.prevent="createActivities()">

          <b-row class="justify-content-center">          
            <b-col v-for="(activity, index) in activities" :key="index" bg="10" md="8" sm="12">

              <b-form-group :label="'Actividad ' + (index + 1)" label-for="'description' + index" class="mt-1 required-label">  

                <div class="d-flex">
                  <b-form-textarea
                    :id="'description' + index"
                    v-model="activities[index].letter"
                    placeholder="El enunciado que ingreses así será mostrado a los alumnos de forma desordenada"
                    rows="2"
                    class="mr-2"
                    required
                  ></b-form-textarea>
                  <b-button @click="removeActivity(index)" variant="danger" size="sm" class="custom-close-button" v-b-tooltip.hover title="Eliminar actividad">
                    <b-icon icon="x-lg"></b-icon>
                  </b-button>
                </div>

                <!-- <b-form-textarea
                  :id="'description' + index"
                  v-model="activities[index].description"
                  placeholder="El enunciado que ingreses así será mostrado a los alumnos de forma desordenada"
                  rows="2"
                ></b-form-textarea>      -->
                <!-- max-rows="6"            -->
              </b-form-group>              

            </b-col>
          </b-row>

          <!-- <b-button @click="createActivities()" variant="primary" class="custom-button-icon">
            <b-icon icon="journals"></b-icon> <span class="button-text">Guardar actividades de la evaluación</span>
          </b-button> -->
          <b-button type="submit" variant="success" class="custom-button-iconmt-3" >
            <b-icon icon="journals"></b-icon> <span class="button-text">Guardar actividades de la evaluación</span>
          </b-button>

          <hr class="mt-4 mb-4">
          
          <b-button @click="addNewActivity()" :disabled="activities.length <= 0" variant="warning" class="custom-button-icon" >
            <b-icon icon="plus"></b-icon> <span class="button-text">Agregar otra actividad</span>
          </b-button>

        </b-form>
      </b-container>
    </b-overlay>

  </b-container>       
</template>    

<script>
  import EvaluationService from '@/services/EvaluationService';
  import ActivityService from '@/services/ActivityService';

  export default {
    name: "CreateActivities",
    components: {
      
    },
    data() {
      return {
        isLoading: false,
        idEvaluation: null,
        evaluationData: null,
        activities: [],
      };
    },
    methods: {
      addNewActivity() {
        this.activities.push({ letter: '' });
      },
      removeActivity(index) {
        this.activities.splice(index, 1);
      },      
      createActivities(){
        this.isLoading = true;
        this.activities.forEach((activity, index) => {
          const newActivity = {
            letter: activity.letter,
            questionNumber: index,
            idEvaluacion: this.evaluationData.id_evaluaciones,
            idDinamica: this.evaluationData.id_dinamica,
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
        }).then(() => {
          this.$router.push('/evaluaciones/mis-evaluaciones');        
        });   
        this.isLoading = false;
      }
    },
    mounted() {
      this.idEvaluation = this.$route.params.idEvaluation;
      EvaluationService.getEvaluationById(this.idEvaluation)
      .then(response => {
        console.log("Datos de evaluation: ", response);
        this.evaluationData = response
      })
      .catch(error => {
        console.error('Error:', error);
        this.$swal({
          icon: 'error',
          title: '¡Error!',
          text: error,
        });     
      });  

      this.addNewActivity();
    }
  };
</script>
  
<style scoped>

</style>
  


  
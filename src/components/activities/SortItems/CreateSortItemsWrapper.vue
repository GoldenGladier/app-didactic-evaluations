<template>
  <b-overlay :show="isLoading" class="width-100">
    <b-button class="help-button" @click="startTutorial"
      v-b-tooltip.hover.top="'Haz clic aquí para recibir un tutorial sobre cómo agregar o quitar una actividad de ordenar los items de esta evaluación.'" >
      <i class="bi bi-question-circle"></i>Ayuda
    </b-button>        
    <b-container>
      <h1 v-if="evaluationData">{{ evaluationData.nombre }}</h1>
      <h1 class="text-center mb-4">Crear actividades de ordenar los items</h1>
      <p class="text-justify">Aquí configura las actividades de ordenar items que necesites. Cuando tus alumnos resuelvan esta evaluación, verán los items en desorden y deberán acomodarlos en el mismo orden que tú los pusiste.</p>

      <b-form @submit.prevent="saveActivities()">
        <b-row class="justify-content-center">
          <b-col v-for="(activity, index) in activities" :key="index" md="8" sm="12">
            <CreateSortItemActivity
              :index="index"
              :activity="activity"
              :id="'activity-'+index"
              @update-activity="updateActivity"
              @remove-activity="removeActivity"              
            />
          </b-col>
          <b-col md="8" sm="12">
            <b-card class="mb-4 custom-button" @click="addNewActivity()" id="add-activity">
              <!-- <b-button @click="addNewActivity()" variant="warning" class="custom-button-icon"> -->
                <i class="bi bi-plus-lg"></i> <span class="button-text">Agregar actividad</span>
              <!-- </b-button>   -->
            </b-card>           
          </b-col>
        </b-row>        

        <b-row class="justify-content-center">
          <b-col md="6" sm="12" class="custom-center-flex">
            <b-button type="submit" variant="success" class="custom-button-icon" id="save-activities">
              <i class="bi bi-floppy"></i> <span class="button-text">Guardar actividades de la evaluación</span>
            </b-button>
          </b-col>          
        </b-row>        

      </b-form>
    </b-container>
  </b-overlay>
</template>

<script>
import driverMixin from '@/mixins/driverMixin';
import EvaluationService from '@/services/EvaluationService';
import ActivityService from '@/services/ActivityService';
import CreateSortItemActivity from '@/components/activities/SortItems/CreateSortItemActivity.vue';

export default {
  name: "CreateSortItemsWrapper",
  mixins: [driverMixin],
  components: {
    CreateSortItemActivity
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
      this.activities.push({ question: '', items: [''] });
    },
    updateActivity(index, activity) {
      this.activities.splice(index, 1, activity);
    },    
    removeActivity(index) {     
      this.activities.splice(index, 1);
    },
    saveActivities() {
      this.isLoading = true;
      // Validar que todas las actividades tengan descripción y todas las respuestas tengan texto
      const isValid = this.activities.every(activity => {
          if (!activity.question || activity.question.trim() === '') {
              return false;
          }
          return activity.items.every(item => {
              if (!item || item.trim() === '') {
                  return false;
              }
              return true;
          });
      });

      if (isValid) {
        const preguntas = this.activities.map((activity, index) => ({
            idPregunta: index + 1,
            descripcion: activity.question,
            respuestas: activity.items.map((item, indexItem) => ({
                id: indexItem,
                texto: item 
            }))
        }));

        const activitiesToSave = {
          idEvaluacion: this.evaluationData.id_evaluaciones,
          preguntas: preguntas
        }
        console.log("Actividades a guardar: ")
        console.log(activitiesToSave)

        ActivityService.addActivitiesSortItems(activitiesToSave)
        .then(() => {
          this.$swal({
            icon: 'success',
            title: '¡Éxito!',
            text: 'Las actividades se guardaron correctamente',
          }).then(() => {
            this.$router.push('/evaluaciones/mis-evaluaciones');
          });
        })
        .catch(error => {
          console.error('Error al intentar guardar la actividad:', error);
          this.$swal({
            icon: 'error',
            title: '¡Error!',
            text: 'Hubo un error al guardar las actividades',
          });
        })
        .finally(() => {
          this.isLoading = false;
        });                

      } else {
        this.isLoading = false;
        this.$swal({
          icon: 'error',
          title: '¡Error!',
          text: 'Parece que aún te faltan datos por ingresar en una de las actividades.',
        });          
      }
    },
    startTutorial() {
      this.startTour([
          {
              element: '#add-activity',
              popover: {
                  title: 'Agregar atem',
                  description: 'Haz clic en el botón de agregar actividad (<i class="bi bi-plus-lg nm"></i>) para añadir una nueva actividad de ordena los items.',
                  position: 'top',
              },
          },
          {
              element: '#activity-0',
              popover: {
                  title: 'Actividad de ordena los items',
                  description: 'Aquí puedes configurar una pregunta de ordenar los items. Si quieres saber más puedes dar clic en su botón de ayuda (<i class="bi bi-question-circle nm"></i>).',
                  position: 'top',
              },
          },     
          {
              element: '#remove-activity',
              popover: {
                  title: 'Eliminar actividad',
                  description: 'Haz clic en este botón (<i class="bi bi-x-lg nm"></i>) de cada actividad si deseas eliminarla de la evaluación.',
                  position: 'top',
              },
          },           
          {
          element: '#save-activities',
              popover: {
                  title: 'Guardar actividades',
                  description: 'Haz clic en este botón (<i class="bi bi-floppy nm"></i>) para guardar las actividades de esta evaluación',
                  position: 'top',
              },
          },                                                                            
      ]);
    },        
  },
  mounted() {
    this.idEvaluation = this.$route.params.idEvaluation;
    EvaluationService.getEvaluationById(this.idEvaluation)
      .then(response => {
        this.evaluationData = response;
        this.addNewActivity();
      })
      .catch(error => {
        console.error('Error:', error);
        this.$swal({
          icon: 'error',
          title: '¡Error!',
          text: error,
        });
      });
  }
};
</script>

<style scoped>
.width-100 {
  width: 100%;
}
.custom-button-icon {
  display: flex;
  align-items: center;
}
.help-button {
  position: absolute;
  top: 0px;
  left: 10px;
}
</style>

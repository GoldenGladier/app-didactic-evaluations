<template>
    <b-overlay :show="isLoading" class="width-100">
        <b-button class="help-button" @click="startTutorial"
            v-b-tooltip.hover.top="'Haz clic aquí para recibir un tutorial sobre cómo agregar o quitar una actividad de ordenar los ítems de esta evaluación.'" >
            <i class="bi bi-question-circle"></i>Ayuda
        </b-button>        
        <b-container>
            <h1 v-if="evaluationData">{{ evaluationData.nombre }}</h1>
            <h1 class="text-center mb-4">Editar actividades de ordenar los ítems</h1>
            <p class="text-justify">Aquí configura las actividades de ordenar ítems que necesites. Cuando tus alumnos resuelvan esta evaluación, verán los ítems en desorden y deberán acomodarlos en el mismo orden que tú los pusiste.</p>

            <b-form @submit.prevent="saveActivities()">
                <b-row class="justify-content-center">              
                    <b-col md="8" sm="12">
                        <b-alert v-if="!activities.length" variant="warning" show dismissible> <i class="bi bi-exclamation-triangle-fill"></i>Parece ser que aún no hay actividades en esta evaluación.</b-alert>                          
                    </b-col>                          
                    <b-col v-for="(activity, indexActivity) in activities" :key="activity.idPregunta" md="8" sm="12">
                        <EditSortItemsActivity
                        :index="activity.idPregunta"
                        :activity="activity"
                        :idEvaluation="idEvaluation"
                        :isLoading.sync="isLoading"
                        :id="'activity-'+activity.idPregunta"
                        @update-activity="updateActivity(indexActivity, activity)"
                        @remove-activity="removeActivity(activity)"              
                        />
                    </b-col>
                    <b-col md="8" sm="12">
                        <b-card class="mb-4 custom-button" @click="addNewActivity()" id="add-activity">
                            <i class="bi bi-plus-lg"></i>Agregar actividad
                        </b-card>           
                    </b-col>
                </b-row>        

                <b-row class="justify-content-center">
                    <b-col md="6" sm="12" class="custom-center-flex">
                        <b-button type="submit" variant="success" class="custom-button-icon" id="save-activities">
                        <i class="bi bi-floppy"></i>Guardar actividades de la evaluación
                        </b-button>
                    </b-col>          
                </b-row>        

            </b-form>
        </b-container>
    </b-overlay>
</template>

<script>
import driverMixin from '@/mixins/driverMixin';
import ActivityService from '@/services/ActivityService';
import EditSortItemsActivity from '@/components/activities/SortItems/EditSortItemsActivity.vue';

export default {
    name: "EditSortItemsWrapper",
    mixins: [driverMixin],
    components: {
        EditSortItemsActivity
    },
    props: {       
        evaluationData: null,
    },
    data() {
        return {
            isLoading: false,
            idEvaluation: null,
            activities: [],
        };                
    },
    methods: {
        addNewActivity() {
            let newIdPregunta = 1;
            if (this.activities.length > 0) {
                newIdPregunta = this.activities[this.activities.length - 1].idPregunta + 1;
            }            
            this.activities.push({ 
                idPregunta: newIdPregunta, 
                question: '', 
                items: [{
                    texto: '',
                    id: 0,
                    isNew: true
                }],
                isNew: true 
            });
        },
        updateActivity(index, activity) {
            this.activities.splice(index, 1, activity);
        },    
        removeActivity(activity) {     
            console.log("Quiero eliminar a la pregunta: ", activity);

            const itemToRemove = this.activities.find(question => question.idPregunta === activity.idPregunta);
            if (itemToRemove.isNew) {
                this.activities = this.activities.filter(question => question.idPregunta !== activity.idPregunta);
            }      
            else{
                let deleteQuestionData = {
                    idEvaluacion: Number(this.idEvaluation),
                    numPregunta: activity.idPregunta,
                }
                console.log("Voy a eliminar la pregunta: ", deleteQuestionData);

                this.isLoading = true;
                ActivityService.deleteQuestionByNumQuestion(deleteQuestionData)
                .then((response) => {
                    console.log("Pregutna eliminada: ", response);
                    this.activities = this.activities.filter(question => question.idPregunta !== activity.idPregunta);
                    this.$swal({
                        icon: 'success',
                        title: '¡Éxito!',
                        text: 'La pregunta fue eliminada exitosamente.',
                    }) 
                })
                .catch((error) => {
                    console.error("Ocurrio un error al eliminar la pregunta: ", error);
                    this.$swal({
                        icon: 'error',
                        title: '¡Error!',
                        text: 'Ocurrio un error al intentar eliminar la pregunta.',
                    });          
                })
                .finally(() => {
                    this.isLoading = false;
                })         
            }                 
        },
        saveActivities() {
            this.isLoading = true;
            const preguntas = this.activities.map((activity) => ({
                idPregunta: activity.idPregunta,
                descripcion: activity.question,
                respuestas: activity.items.map((item, indexItem) => ({
                    id: indexItem,
                    texto: item.texto 
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
        },
        startTutorial() {
            this.startTour([
                {
                    element: '#add-activity',
                    popover: {
                        title: 'Agregar atem',
                        description: 'Haz clic en el botón de agregar actividad (<i class="bi bi-plus-lg nm"></i>) para añadir una nueva actividad de ordena los ítems.',
                        position: 'top',
                    },
                },
                {
                    element: '#activity-0',
                    popover: {
                        title: 'Actividad de ordena los ítems',
                        description: 'Aquí puedes configurar una pregunta de ordenar los ítems. Si quieres saber más puedes dar clic en su botón de ayuda (<i class="bi bi-question-circle nm"></i>).',
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
    this.isLoading = true;
    this.idEvaluation = this.$route.params.idEvaluation;
    
    ActivityService.getActivitiesSortItems(this.idEvaluation)
    .then((response) => {
        console.log("Recibo del servicio: ", response, typeof(response));
        let formatActivities = response.sortItemsActivities.map(activity => {
            return {
                idPregunta: activity.numPregunta,
                question: activity.descripcion,
                items: activity.respuestas
                    .sort((a, b) => a.id - b.id)
                    .map((ordenItem) => {
                        return { 
                            texto: ordenItem.texto,
                            id: ordenItem.id 
                        }
                    })
            }
        });
        this.activities = formatActivities;
        // this.activities = response.sortItemsActivities;
        console.log("Actividades: ", this.activities);
    })
    .catch(error => {
        console.error('Error al obtener las actividades de la evaluación:', error);
    })
    .finally(() => {
        this.isLoading = false;
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

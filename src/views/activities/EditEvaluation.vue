<template>
  <b-container class="custom-master-container custom-card-box custom-center-flex">

    <b-overlay :show="isLoading" class="width-100">      
      <b-container>  
        <h1 class="text-center mb-4">Editar evaluación</h1>

        <div>
            <b-tabs fill>
                <b-tab title="Detalles de la evaluación" class="custom-tab-border" active>
                    <DetailsEvaluation :evaluationData="evaluationData" :dinamicsList="dinamicsList" />
                </b-tab>
                <b-tab title="Actividades de la evaluación" class="custom-tab-border">
                    <DetailsActivities :evaluationData="evaluationData" :activitiesListData="activitiesListData" />
                </b-tab>
            </b-tabs>
        </div>

      </b-container>
    </b-overlay>

  </b-container>       
</template>
    
    
<script>
  import EvaluationService from '@/services/EvaluationService';
  import ActivityService from '@/services/ActivityService';
  import DetailsEvaluation from '@/components/evaluations/DetailsEvaluation.vue';
  import DetailsActivities from '@/components/evaluations/DetailsActivities.vue';

    export default {
      components: {
        DetailsEvaluation, DetailsActivities
      },
      data() {
        return {        
          isLoading: false,
          idEvaluation: null,
          evaluationData: null,
          dinamicsList: [],   
          activitiesListData: [],   
        };
      },
      created() {           
        this.isLoading = true  
        this.idEvaluation = this.$route.params.idEvaluation

        Promise.all([
          EvaluationService.getEvaluationById(this.idEvaluation),
          EvaluationService.getDinamics(),      
          ActivityService.getActivities(this.idEvaluation),          
        ]).then(responses => {
          const [evaluationResponse, dinamicsResponse, activitiesResponse] = responses;
          console.log("Todos los datos de editar evaluación: ", responses);

          console.log("Datos de evaluation: ", evaluationResponse);
          this.evaluationData = evaluationResponse;

          console.log("Dinamicas: ", dinamicsResponse);
          this.dinamicsList = dinamicsResponse;

          console.log("Actividades: ", activitiesResponse, typeof activitiesResponse);
          this.activitiesListData = activitiesResponse;

          this.isLoading = false 
        }).catch(error => {
          console.error('Error:', error);
          this.isLoading = false 
        });     
      },
    }
</script>
    
<style>
.custom-tab-border {
  border: solid 1px #dee2e6;
  border-top: none;
  padding: 1rem 0;
}
</style>
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
                    <p>Actividades de la evaluación</p>
                </b-tab>
            </b-tabs>
        </div>

      </b-container>
    </b-overlay>

  </b-container>       
</template>
    
    
<script>
    import EvaluationService from '@/services/EvaluationService';
    import DetailsEvaluation from '@/components/evaluations/DetailsEvaluation.vue';

    export default {
      components: {
        DetailsEvaluation
      },
      data() {
        return {        
          isLoading: false,
          idEvaluation: null,
          evaluationData: null,
          dinamicsList: [],   
        };
      },
      created() {           
        this.isLoading = true  
        this.idEvaluation = this.$route.params.idEvaluation

        Promise.all([
          EvaluationService.getEvaluationById(this.idEvaluation),
          EvaluationService.getDinamics(),                
        ]).then(responses => {
          const [evaluationResponse, dinamicsResponse] = responses;

          console.log("Datos de evaluation: ", evaluationResponse);
          this.evaluationData = evaluationResponse;

          console.log("Dinamicas: ", dinamicsResponse);
          this.dinamicsList = dinamicsResponse;

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
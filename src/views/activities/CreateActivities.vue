<template>
  <b-container class="custom-master-container custom-card-box custom-center-flex">
    <b-overlay :show="isLoading" class="width-100">      
      <!-- Tipo actividad: {{ evaluationData }} -->

      <CreateSortText v-if="idDinamica == 1" />
      <CreateSortItemsWrapper v-else-if="idDinamica == 2" />

    </b-overlay>
  </b-container>       
</template>    

<script>
import EvaluationService from '@/services/EvaluationService';
import CreateSortText from '@/components/activities/SortText/CreateSortText.vue';
import CreateSortItemsWrapper from '@/components/activities/SortItems/CreateSortItemsWrapper.vue';
  // import ActivityService from '@/services/ActivityService';

export default {
    name: "CreateActivities",
    components: {
      CreateSortText,
      CreateSortItemsWrapper,  
    },
    data() {
      return {
        isLoading: false,
        idEvaluation: null,
        evaluationData: null,
        idDinamica: null,
      };
    },
    methods: {

    },
    mounted() {
      this.idEvaluation = this.$route.params.idEvaluation;

      EvaluationService.getEvaluationById(this.idEvaluation)
      .then(response => {
        console.log("Datos de evaluation: ", response);
        this.evaluationData = response;
        this.idDinamica = this.evaluationData.id_dinamica;
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

</style>
  


  
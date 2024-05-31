<template>
  <b-container class="custom-master-container custom-card-box custom-center-flex">
    <b-overlay :show="isLoading" class="width-100">      
      <!-- Tipo actividad: {{ evaluationData }} -->

      <CreateSortText v-if="idDinamica == 1" />
      <CreateSortItemsWrapper v-else-if="idDinamica == 2" />
      <CreateCrosswordWrapper v-else-if="idDinamica == 5" :evaluationData="evaluationData" :isLoading.sync="isLoading" />
      <CreateWordsearchWrapper v-else-if="idDinamica == 6" :evaluationData="evaluationData" :isLoading.sync="isLoading" />
      <b-alert v-else-if="idDinamica != null" show variant="danger"><i class="bi bi-exclamation-triangle-fill"></i>Error al configurar editor de actividades</b-alert>

    </b-overlay>
  </b-container>       
</template>    

<script>
import EvaluationService from '@/services/EvaluationService';
import CreateSortText from '@/components/activities/SortText/CreateSortText.vue';
import CreateSortItemsWrapper from '@/components/activities/SortItems/CreateSortItemsWrapper.vue';

import CreateCrosswordWrapper from '@/components/activities/Crossword/CreateCrosswordWrapper.vue';
import CreateWordsearchWrapper from '@/components/activities/Wordsearch/CreateWordsearchWrapper.vue';

export default {
    name: "CreateActivities",
    components: {
      CreateSortText,
      CreateSortItemsWrapper, 
      
      CreateCrosswordWrapper,
      CreateWordsearchWrapper,
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
  


  
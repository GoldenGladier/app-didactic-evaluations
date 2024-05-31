<template>
    <b-overlay :show="isLoading" class="width-100">      
  <!-- <div> -->
      <EditSortText v-if="idDinamica == 1" :evaluationData="evaluationData" />
      <EditSortItemsWrapper v-else-if="idDinamica == 2" :evaluationData="evaluationData" :isLoading.sync="isLoading" />
      <EditCrosswordWrapper v-else-if="idDinamica == 5" :evaluationData="evaluationData" :isLoading.sync="isLoading" />
      <EditWordsearchWrapper v-else-if="idDinamica == 6" :evaluationData="evaluationData" :isLoading.sync="isLoading" />
    
      <b-alert v-else show variant="danger"><i class="bi bi-exclamation-triangle-fill"></i>Error al configurar editor de actividades</b-alert>
  <!-- </div>       -->
    </b-overlay>
</template>    

<script>
import EditSortText from '@/components/activities/SortText/EditSortText.vue';
import EditSortItemsWrapper from '@/components/activities/SortItems/EditSortItemsWrapper.vue';
import EditCrosswordWrapper from '@/components/activities/Crossword/EditCrosswordWrapper.vue';
import EditWordsearchWrapper from '@/components/activities/Wordsearch/EditWordsearchWrapper.vue';

export default {
    name: "DetailsActivities",
    components: {
      EditSortText,
      EditSortItemsWrapper,  
      EditCrosswordWrapper,
      EditWordsearchWrapper
    },
    props: {
      evaluationData: {}
    },
    data() {
      return {
        isLoading: false,
        idEvaluation: null,
        idDinamica: null,
      };
    },
    watch: {
      evaluationData: {
        handler() {
          this.idDinamica = this.evaluationData.id_dinamica; 
        },
        deep: true
      }
    }
  };
</script>



  
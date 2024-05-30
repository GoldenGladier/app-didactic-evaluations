<template>
  <div>
      <EditSortText v-if="idDinamica == 1" :evaluationData="evaluationData" />
      <CreateSortItemsWrapper v-else-if="idDinamica == 2" />
  </div>          
</template>    

<script>
import EditSortText from '@/components/activities/SortText/EditSortText.vue';
import CreateSortItemsWrapper from '@/components/activities/SortItems/CreateSortItemsWrapper.vue';

export default {
    name: "DetailsActivities",
    components: {
      EditSortText,
      CreateSortItemsWrapper,  
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



  
<template>
  <div>
      <EditSortText v-if="idDinamica == 1" :evaluationData="evaluationData" />
      <EditSortItemsWrapper v-else-if="idDinamica == 2" :evaluationData="evaluationData" />
      <b-alert v-else show variant="danger"><i class="bi bi-exclamation-triangle-fill"></i>Error al configurar editor de actividades</b-alert>
  </div>          
</template>    

<script>
import EditSortText from '@/components/activities/SortText/EditSortText.vue';
import EditSortItemsWrapper from '@/components/activities/SortItems/EditSortItemsWrapper.vue';

export default {
    name: "DetailsActivities",
    components: {
      EditSortText,
      EditSortItemsWrapper,  
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



  
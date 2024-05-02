<template>
  <b-container class="custom-master-container custom-card-box">

    <!-- <div class="form-container"> -->
      <b-overlay :show="isLoading" class="width-100">      
        <b-container >  
          <b-row class="justify-content-center">
              <SortText />
              <SortItems />
          </b-row>
        </b-container>
      </b-overlay>
    <!-- </div> -->

  </b-container>
</template>

<script>
import SortText from '@/components/activities/SortText.vue';
import SortItems from '@/components/activities/SortItems.vue';

export default {
  components: {
    SortText,
    SortItems
  },
  data() {
    return {
      isLoading: false,
    }
  },
}
</script>

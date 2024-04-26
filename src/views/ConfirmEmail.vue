<template>
  <div class="confirm-email confirm-email">
    <b-container class="custom-card-box">  
        <b-row class="loading-container">
            <b-col v-if="isLoading && state == 'confirming'" cols="12" sm="8" >    
                <div>
                    <b-img v-bind:src="require('@/assets/alert-email.png')" alt="Responsive image" class="custom-img mb-3"></b-img>
                </div>                
                <h3 class="text-center mb-3">Confirmando correo electrónico...</h3>
                <b-spinner></b-spinner>
            </b-col>
            <b-col v-else-if="state == 'good-email'" cols="12" sm="8">    
                <div>
                    <b-img v-bind:src="require('@/assets/good-email.png')" alt="Responsive image" class="custom-img mb-3"></b-img>
                </div>                
                <h3 class="text-center mb-3">¡Correo electrónico confirmado exitosamente!</h3>
            </b-col>
            <b-col v-else-if="state == 'bad-email'" cols="12" sm="8">    
                <div>
                    <b-img v-bind:src="require('@/assets/bad-email.png')" alt="Responsive image" class="custom-img mb-3"></b-img>
                </div>                
                <h3 class="text-center mb-3">No se pudo confirmar el correo electrónico.</h3>
            </b-col>                        
        </b-row>
    </b-container>
  </div>    
</template>

<script>
import AuthService from '@/services/AuthService';

export default {
  data() {
    return {
        isLoading: true,    
        state: 'confirming'
    };
  },
  created() {
    if(this.$route.params.token) {
      AuthService.confirmEmail(this.$route.params.token)
      .then(response => {
        console.log("Email confirmado exitosamente: ", response);
        this.state = 'good-email'
        this.isLoading = false
      })
      .catch(error => {
        console.error('Error:', error);
        this.state = 'bad-email'
        this.isLoading = false
      });        
    }
    else {
      this.state = 'bad-email'
      this.isLoading = false
    }
  },
}
</script>

<style scoped>
.confirm-email {
    height: auto;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.custom-card-box {  
    display: flex;
    justify-content: center;
    align-content: center;
    min-height: 50vh;
}

.loading-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.custom-img {
  max-width: 10rem;
}
</style>
<template>
  <div class="form-container">
    <b-overlay :show="isLoading" class="width-100">      
      <b-container class="custom-form custom-card-box">  
        <b-row class="justify-content-center">
          <b-col v-if="resetLinkValid" cols="12" sm="12" >

            <h1 class="text-center mb-3">Crear una nueva contraseña</h1>
            <b-form @submit.prevent="resetPassword()">
              <b-form-group label="Nueva contraseña" label-for="password" class="mt-1">
                <b-form-input
                  id="password"
                  type="password"
                  v-model="password"                  
                  placeholder="Ingresa tu nueva contraseña"
                  required
                ></b-form-input>
              </b-form-group>
              <b-form-group label="Confirmar contraseña" label-for="password-confirm" class="mt-1">
                <b-form-input
                  id="password-confirm"
                  type="password"
                  v-model="confirmPassword"                  
                  placeholder="Confirma tu nueva contraseña"
                  required
                ></b-form-input>
              </b-form-group>              
              <b-button type="submit" variant="primary" class="mt-2" block>Guardar nueva contraseña</b-button>
            </b-form>
   
          </b-col>
          
          <b-col v-else cols="12" sm="10" >
            <div><b-img v-bind:src="require('@/assets/bad-link.png')" alt="Responsive image" class="custom-img mb-3"></b-img></div>             
            <h1 class="text-center mb-3">Este link ya no es valido para crear una nueva contraseña.</h1>
          </b-col>          
        </b-row>
      </b-container>
    </b-overlay>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService';

export default {
  data() {
    return {
      isLoading: false,
      resetLinkValid: false,
      password: '',
      confirmPassword: '',
    };
  },
  methods: {
    resetPassword() {
      this.isLoading = true;
      
      const data = {
        password: this.password,
        confirmPassword: this.confirmPassword
      }

      AuthService.resetPassword(data, this.$route.params.token)
      .then(response => {
        console.log("El reset password recibio la data: ", response);
        this.isLoading = false
        this.$swal({
            icon: 'success',
            title: '¡Contraseña actualizada!',
            text: 'Ahora puedes iniciar sesión con tu nueva contraseña.',
        }).then(() => {
          this.$router.push('/login');        
        });              
      })
      .catch(error => {
        console.error('Error:', error);
        this.isLoading = false
        this.$swal({
          icon: 'error',
          title: '¡Error!',
          text: error,
        });     
      });      
    }
  },
  created() {
    this.resetLinkValid = this.$route.params.token ? true : false
  },  
}
</script>

<style scoped>
.form-container {
  height: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-form {
  max-width: 400px;
}

.custom-text-info {
  color: black; 
  font-style: italic; 
  font-size: 14px; 
}
a .custom-text-info {
  color: var(--primary-color);
}

a:hover {
  text-decoration: none;
}

.icon-text-info {
  font-size: 17px;
}

.custom-img {
  max-width: 10rem;
}
</style>
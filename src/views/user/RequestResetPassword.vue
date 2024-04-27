<template>
  <div class="form-container">
    <b-overlay :show="isLoading" class="width-100">      
      <b-container class="custom-form custom-card-box">  
        <b-row class="justify-content-center">
          <b-col cols="12" sm="10" >
            <h1 class="text-center mb-3">Recuperar contraseña</h1>
            <p>Ingresa el correo electrónico con el que te registraste y te enviaremos un correo para que puedas recuperar tu contraseña.</p>
            <b-form @submit.prevent="requestResetPassword()">
              <b-form-group label="Correo electrónico" label-for="email" class="mt-1">
                <b-form-input
                  id="email"
                  type="email"
                  v-model="email"
                  required
                  placeholder="Ingresa el correo electrónico"
                ></b-form-input>
              </b-form-group>
              <b-button type="submit" variant="primary" class="mt-2" block>Enviar correo</b-button>
            </b-form>
              
            <hr class="my-4">

            <RouterLink to="/login">
              <div class="custom-text-info">
                <b-icon icon="door-open-fill" class="icon-text-info"></b-icon> Iniciar Sesión
              </div>
            </RouterLink>       
            <h3 class="mt-3 custom-text-info">
              ¿No tienes una cuenta?              
              <RouterLink to="/register">
                  <b-icon icon="person-plus-fill" class="icon-text-info"></b-icon> Registrate
              </RouterLink>    
            </h3>     
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
      email: '',
    };
  },
  methods: {
    requestResetPassword() {
      this.isLoading = true;
        const data = {
            email: this.email,
        }
        AuthService.requestResetPassword(data)
        .then(response => {
            this.isLoading = true
            console.log("Solicitud de reset password: ", response);
            this.isLoading = false
            this.$swal({
                icon: 'success',
                title: '¡Correo enviado!',
                text: 'Revisa tu correo y crea una nueva contraseña.',
            })  
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
</style>
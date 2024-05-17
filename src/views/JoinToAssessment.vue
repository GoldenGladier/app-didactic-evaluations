<template>
  <b-container class="custom-master-container custom-card-box custom-center-flex">
    <b-overlay :show="isLoading" class="width-100">   
      <b-container class="login-form">
        <b-row class="justify-content-center">
          <b-col cols="12" sm="8" >
            <h2 class="text-center mb-3">Unirse a actividad</h2>
            <b-form @submit.prevent="joinToAssessment">
              <b-form-group label="Pin" label-for="pin" class="required-label">
                <b-form-input
                  id="pin"
                  type="text"
                  v-model="pin"                
                  placeholder="Ingresa el Pin de la actividad"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group v-if="!isLoggedIn" label="Nombre" label-for="name" class="required-label">
                <b-form-input
                  id="name"
                  type="text"
                  v-model="name"                
                  placeholder="Ingresa tu nombre"
                  required
                ></b-form-input>
              </b-form-group>              

              <b-form-group v-if="!isLoggedIn" label="Apellidos" label-for="lastname" class="required-label">
                <b-form-input
                  id="lastname"
                  type="text"
                  v-model="lastname"                
                  placeholder="Ingresa tus apellidos"
                  required
                ></b-form-input>
              </b-form-group>               

              <b-button type="submit" variant="primary" class="mt-2 mb-2" block :disabled="!pin">Siguiente</b-button>
            </b-form>
          </b-col>
        </b-row>
      </b-container>      

  <!-- <div class="login-container">
    
  </div> -->
    </b-overlay>
  </b-container>
</template>

<script>
import AuthService from '@/services/AuthService.js'
import store from '@/store/auth';

export default {
  data() {
    return {
      isLoading: false,
      pin: '',
      name: '',
      lastname: '',
    };
  },
  methods: {
    init_data() {
      this.pin = this.$route.params.pin ? this.$route.params.pin : '';
      if(this.isLoggedIn) {
        this.name = this.username
      }
    },
    joinToAssessment() {
      if(this.$store.state.auth.isLoggedIn) {
        console.log('PIN de actividad:', this.pin);
        console.log('Nombre de usuario registrado:', this.name);
      }
      else{
        console.log('PIN de actividad:', this.pin);
        console.log('Nombre de invitado:', this.name);
        const data = {
          userName: this.name.trim() + ' ' + this.lastname.trim(),
        }
        AuthService.newGuestUser(data)
        .then((response) => {
          console.log("Resultado user guest: ", response)
          const guest = response.guestUser;
          
          const guestToken = guest.token;
          let guestUser = guest.guestUser;

          const nameParts = guestUser.nombre.split(' ');
          guestUser.nombre = nameParts[0];
          guestUser.apellido_paterno = nameParts[1] ? nameParts[1] : '';
          guestUser.apellido_materno = nameParts[2] ? nameParts[2] : '';

          guestUser.isGuestUser = true;
          store.commit('setUser', guestUser);  
          store.commit('setToken', guestToken);                    
        })
        .catch(error => {
          console.error('Error al crear un usuario invitado: ', error);
        });
      }
    }
  },
  mounted() {
    this.init_data();
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn;
    },
    user() {
      return this.$store.state.auth.user;
    },
    username() {
      return this.user.nombre + ' ' + this.user.apellido_paterno + ' ' + (this.user.apellido_materno ? this.user.apellido_materno : '')
    }    
  }
}
</script>

<style scoped>
.login-container {
  height: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  max-width: 700px;
  /* width: 100%; */
  /* padding: 20px; */
  border-radius: 5px;  
  /* background: tomato; */
}

.login-form input {
    margin-bottom: 0.4rem;
}
label {
    margin-bottom: 0.3rem;
}

.form-group {
  margin-bottom: 0;
}

.custom-text-info {
  color: black; /* Color del texto */
  text-decoration: underline; /* Subrayado */
  font-style: italic; /* Itálico */
  font-size: 14px; /* Tamaño del texto */
}
</style>
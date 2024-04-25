<template>
  <div class="login-container">
    <b-overlay :show="isLoading" class="width-100">      
      <b-container class="login-form custom-card-box">
        <b-row class="justify-content-center">
          <b-col cols="12" sm="8" >
            <h2 class="text-center mb-3">Crear cuenta</h2>
            <b-form @submit.prevent="register()">
              <b-form-group label="Nombre" label-for="nombre">
                <b-form-input
                  id="nombre"
                  type="text"
                  v-model="nombre"                
                  placeholder="Ingrese su nombre"
                  required
                ></b-form-input>
              </b-form-group>

              <!-- <b-form-group label="Apellido Paterno" label-for="apellidoPaterno">
                <b-form-input
                  id="apellidoPaterno"
                  type="text"
                  v-model="apellidoPaterno"                
                  placeholder="Ingrese su apellido paterno"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Apellido Materno" label-for="apellidoMaterno">
                <b-form-input
                  id="apellidoMaterno"
                  type="text"
                  v-model="apellidoMaterno"                
                  placeholder="Ingrese su apellido materno"
                  required
                ></b-form-input>
              </b-form-group>             -->

              <b-form-group label="Apellidos" label-for="apellidos">
                <b-form-input
                  id="apellidos"
                  type="text"
                  v-model="apellidos"                
                  placeholder="Ingrese sus apellidos"
                  required />
              </b-form-group>

              <b-form-group label="Correo electrónico" label-for="email" >
                <b-form-input
                  id="email"
                  type="email"
                  v-model="email"
                  required
                  placeholder="Ingrese su correo electrónico"
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Contraseña" label-for="password" >
                <b-form-input
                  id="password"
                  type="password"
                  v-model="password"
                  required
                  placeholder="Ingrese su contraseña"
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Confirmar contraseña" label-for="password-confirm" >
                <b-form-input
                  id="password-confirm"
                  type="password"
                  v-model="passwordConfirm"
                  required
                  placeholder="Confirmar su contraseña"
                ></b-form-input>
              </b-form-group>            

              <b-button type="submit" variant="primary" class="mt-2 mb-3" block>Registrarse</b-button>
            </b-form>
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
      nombre: '',
      apellidos: '',
      email: '',
      password: '',
      passwordConfirm: ''
    };
  },
  methods: {
    register() {
      this.isLoading = true;
      let apellidos = this.apellidos.trim();
      let bothSurnames = apellidos.split(' ');

      let fathersLastname = bothSurnames[0]
      let mothersLastname = bothSurnames.length > 1 ? bothSurnames[1] : null;

      let newUserData = {
        name: this.nombre,
        firstName: fathersLastname,
        lastName: mothersLastname,
        email: this.email,
        password: this.password,
        confirmPassword: this.passwordConfirm
      } 
      console.log('Datos del nuevo usuario:', newUserData);

      AuthService.register(newUserData)
      .then(response => {
        console.log("El server devolvio la data: ", response);
        this.isLoading = false
        this.$swal({
          icon: 'success',
          title: '¡Éxito!',
          text: 'El usuario se ha creado correctamente',
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
      })
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
  max-width: 400px;
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
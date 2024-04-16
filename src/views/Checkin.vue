<template>
  <div class="login-container">
    <b-container class="login-form custom-card-box">
      <b-row class="justify-content-center">
        <b-col cols="12" sm="8" >
          <h2 class="text-center mb-3">Crear cuenta</h2>
          <b-form @submit.prevent="checkin">
            <b-form-group label="Nombre" label-for="nombre">
              <b-form-input
                id="nombre"
                type="text"
                v-model="nombre"                
                placeholder="Ingrese su nombre"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Apellidos" label-for="apellidos">
              <b-form-input
                id="apellidos"
                type="text"
                v-model="apellidos"                
                placeholder="Ingrese sus apellidos"
                required
              ></b-form-input>
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

            <b-button type="submit" variant="primary" class="mt-2 mb-3" block>Iniciar sesión</b-button>
          </b-form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nombre: '',
      apellidos: '',
      email: '',
      password: '',
      passwordConfirm: ''
    };
  },
  methods: {
    checkin() {
      // Aquí puedes agregar la lógica para el registro de usuario
      let newUserData = {
        nombre: this.nombre,
        apellidos: this.apellidos,
        email: this.email,
        password: this.password,
        passwordConfirm: this.passwordConfirm
      } 
      console.log('Datos de nuevo usuario:', newUserData);
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
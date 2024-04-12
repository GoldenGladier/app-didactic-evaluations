<template>
  <div class="login-container">
    <b-container class="login-form custom-card-box">
      <b-row class="justify-content-center">
        <b-col cols="12" sm="8" >
          <h2 class="text-center mb-3">Iniciar sesión</h2>
          <b-form @submit.prevent="login">
            <b-form-group label="Correo electrónico" label-for="email" class="mt-1">
              <b-form-input
                id="email"
                type="email"
                v-model="email"
                required
                placeholder="Ingrese su correo electrónico"
              ></b-form-input>
            </b-form-group>

            <b-form-group label="Contraseña" label-for="password" class="mt-1">
              <b-form-input
                id="password"
                type="password"
                v-model="password"
                required
                placeholder="Ingrese su contraseña"
              ></b-form-input>
            </b-form-group>

            <b-button type="submit" variant="primary" class="mt-2" block>Iniciar sesión</b-button>
          </b-form>
            <hr class="my-4">

          <h3 class="custom-text-info">Recuperar contraseña</h3>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      // Aquí puedes agregar la lógica para el inicio de sesión
      console.log('Correo electrónico:', this.email);
      console.log('Contraseña:', this.password);
      // Por ejemplo, puedes enviar los datos a un servidor para autenticar al usuario
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
  width: 100%;
  padding: 20px;
  border-radius: 5px;  
}

.custom-text-info {
  color: black; /* Color del texto */
  text-decoration: underline; /* Subrayado */
  font-style: italic; /* Itálico */
  font-size: 14px; /* Tamaño del texto */
}
</style>
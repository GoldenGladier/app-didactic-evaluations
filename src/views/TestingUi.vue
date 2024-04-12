<template>
  <div class="testing-ui custom-card-box">
    <!-- Título -->
    <h1 class="mb-4">Testing UI con Bootstrap Vue</h1>
    
    <!-- Botones -->
    <b-button @click="showAlert" variant="primary" class="mr-2">Botón Primario</b-button>
    <b-button variant="secondary" class="mr-2">Botón Secundario</b-button>
    <b-button variant="success" class="mr-2">Éxito</b-button>
    <b-button variant="danger" class="mr-2">Error</b-button>
    <b-button variant="warning" class="mr-2">Advertencia</b-button>
    <b-button variant="info" class="mr-2">Información</b-button>
    
    <!-- Dropdown -->
    <b-dropdown text="Dropdown">
      <b-dropdown-item>Action</b-dropdown-item>
      <b-dropdown-item>Another action</b-dropdown-item>
      <b-dropdown-item>Something else</b-dropdown-item>
      <b-dropdown-divider></b-dropdown-divider>
      <b-dropdown-item active>Active action</b-dropdown-item>
    </b-dropdown>
    
    <!-- Formulario -->
    <b-form @submit.prevent="submitForm">
      <b-form-group label="Nombre:" label-for="name-input">
        <b-form-input id="name-input" v-model="formData.name"></b-form-input>
      </b-form-group>
      <b-form-group label="Correo electrónico:" label-for="email-input">
        <b-form-input type="email" id="email-input" v-model="formData.email"></b-form-input>
      </b-form-group>
      <b-button type="submit" variant="primary">Enviar</b-button>
    </b-form>
    
    <!-- Tooltip -->
    <b-button v-b-tooltip.hover title="¡Hazme clic!">Botón con Tooltip</b-button>
       
    <!-- Loader -->
    <b-spinner class="mt-4"></b-spinner>
    
    <!-- Barra de carga -->
    <b-progress :value="progressValue" class="mt-4"></b-progress>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: '',
        email: ''
      },
      progressValue: 75
    };
  },
  methods: {
    showAlert() {
      alert('¡Hola! Has hecho clic en el botón.');
    },
    submitForm() {
      alert(`¡Has enviado el formulario!\nNombre: ${this.formData.name}\nCorreo electrónico: ${this.formData.email}`);
    }
  }
};
</script>

<style scoped>
.testing-ui {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}
</style>
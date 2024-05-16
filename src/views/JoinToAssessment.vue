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

              <b-button type="submit" variant="primary" class="mt-2 mb-2" block>Siguiente</b-button>
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
export default {
  data() {
    return {
      pin: '',
    };
  },
  methods: {
    joinToAssessment() {
      // Aquí puedes agregar la lógica para unirse a la actividad
      console.log('PIN de actividad:', this.pin);
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
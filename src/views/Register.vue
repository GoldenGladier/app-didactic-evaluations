<template>
  <div class="login-container">
    <b-overlay :show="isLoading" class="width-100">      
      <b-container class="login-form custom-card-box">
        <b-row class="justify-content-center">
          <b-col cols="12" sm="10" >
            <h2 class="text-center mb-3">Crear cuenta</h2>
            <b-form @submit.prevent="register">
              <b-form-group label="Nombre" label-for="nombre" class="required-label">
                <b-form-input
                  id="nombre"
                  type="text"
                  v-model="nombre"                
                  placeholder="Ingrese su nombre"
                  required
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Apellidos" label-for="apellidos" class="required-label">
                <b-form-input
                  id="apellidos"
                  type="text"
                  v-model="apellidos"                
                  placeholder="Ingrese sus apellidos"
                  required
                />
              </b-form-group>

              <b-form-group label="Correo electrónico" label-for="email" class="required-label">
                <b-form-input
                  id="email"
                  type="email"
                  v-model="email"
                  required
                  placeholder="Ingrese su correo electrónico"
                ></b-form-input>
              </b-form-group>

              <b-form-group label="Contraseña" label-for="password" class="required-label">
                <b-input-group>
                  <b-form-input
                    id="password"
                    :type="showPassword ? 'text' : 'password'"
                    v-model="password"
                    required
                    placeholder="Ingrese su contraseña"
                    @input="validatePassword"
                    :state="passwordState"
                    aria-describedby="password-feedback"
                    class="mb-0"
                    maxLength="15"
                  ></b-form-input>      
                  <b-input-group-append>
                    <b-button @click="toggleShowPassword" class="silent-button simple-gray-button" :class="{'btn-invalid': (passwordState == false), 'btn-valid': (passwordState == true)}">
                      <b-icon :icon="showPassword ? 'eye-slash' : 'eye'"></b-icon>
                    </b-button>
                  </b-input-group-append>
                  <b-form-invalid-feedback id="password-feedback" class="mb-2">
                    La contraseña debe tener entre 8 y 15 caracteres, incluir letras mayúsculas y minúsculas, al menos un número y un carácter especial (# $ & %).
                  </b-form-invalid-feedback>                              
                </b-input-group>
              </b-form-group>

              <b-form-group label="Confirmar contraseña" label-for="password-confirm" class="mt-2 required-label">
                <b-input-group>
                  <b-form-input
                    id="password-confirm"
                    :type="showPasswordConfirm ? 'text' : 'password'"
                    v-model="passwordConfirm"
                    required
                    placeholder="Confirmar su contraseña"
                    class="mb-0"
                    @input="validatePasswordConfirm"
                    :state="passwordConfirmState"
                    aria-describedby="password-confirm-feedback"
                    maxLength="15"
                  ></b-form-input>
                  <b-input-group-append>
                    <b-button @click="toggleShowPasswordConfirm" class="silent-button simple-gray-button" :class="{'btn-invalid': (passwordConfirmState == false), 'btn-valid': (passwordConfirmState == true)}">
                      <b-icon :icon="showPasswordConfirm ? 'eye-slash' : 'eye'"></b-icon>
                    </b-button>
                  </b-input-group-append>
                  <b-form-invalid-feedback id="password-confirm-feedback" class="mb-2">
                    Las contraseñas no coinciden.
                  </b-form-invalid-feedback>                  
                </b-input-group>
              </b-form-group>            

              <b-button type="submit" variant="primary" class="mt-2 mb-3" block :disabled="!isFormValid">
                <b-icon icon="person-plus" class="sidebar-icon" />Registrarse
              </b-button>

              <hr class="my-4">

              <h3 class="mt-2 custom-text-info">
                ¿Ya tienes una cuenta?              
                <RouterLink to="login">
                    <b-icon icon="door-open-fill" class="icon-text-info"></b-icon> Inicia sesión
                </RouterLink>    
              </h3>                 
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
      passwordConfirm: '',
      passwordState: null,
      passwordConfirmState: null,
      showPassword: false,
      showPasswordConfirm: false,
    };
  },
  computed: {
    isFormValid() {
      return (
        this.passwordState === true &&
        this.passwordConfirmState === true &&
        this.password === this.passwordConfirm &&
        this.nombre.trim() !== '' &&
        this.apellidos.trim() !== '' &&
        this.email.trim() !== ''
      );
    },
  },
  methods: {
    validatePassword() {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#&$%])[A-Za-z\d#&$%]{8,15}$/;
      this.passwordState = passwordRegex.test(this.password);
      this.validatePasswordConfirm();
    },
    validatePasswordConfirm() {
      this.passwordConfirmState = this.password === this.passwordConfirm;
    },
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    },
    toggleShowPasswordConfirm() {
      this.showPasswordConfirm = !this.showPasswordConfirm;
    },
    register() {
      if (!this.isFormValid) {
        this.$swal({
          icon: 'error',
          title: '¡Error!',
          text: 'Por favor, completa todos los campos correctamente.',
        });
        return;
      }

      this.isLoading = true;
      let apellidos = this.apellidos.trim();
      let bothSurnames = apellidos.split(' ');

      let fathersLastname = bothSurnames[0];
      let mothersLastname = bothSurnames.length > 1 ? bothSurnames[1] : '';

      let newUserData = {
        name: this.nombre,
        firstName: fathersLastname,
        lastName: mothersLastname,
        email: this.email,
        password: this.password,
        confirmPassword: this.passwordConfirm
      };
      console.log('Datos del nuevo usuario:', newUserData);

      AuthService.register(newUserData)
        .then(response => {
          console.log("El server devolvio la data: ", response);
          this.isLoading = false;
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
          this.isLoading = false;
          this.$swal({
            icon: 'error',
            title: '¡Error!',
            text: error,
          });     
        });
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
  max-width: 500px;
  border-radius: 5px;  
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

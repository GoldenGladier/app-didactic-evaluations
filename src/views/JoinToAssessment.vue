<template>
  <b-container class="custom-master-container custom-card-box custom-center-flex">
    <b-overlay :show="isLoading" class="width-100">   
      <b-container class="login-form">
        <b-row class="justify-content-center">
          <b-col cols="12" sm="8" >
            <h2 class="text-center mb-3">Unirse a actividad</h2>
            <b-form @submit.prevent="joinToAssessment">

              <b-form-group label="Nombre" label-for="name" class="required-label">
                <b-form-input
                  :disabled="isLoggedIn"
                  id="name"
                  type="text"
                  v-model="name"
                  placeholder="Ingresa tu nombre"
                  required
                  @input="validateName"
                  :state="nameState"
                  aria-describedby="name-feedback"
                ></b-form-input>
                <b-form-invalid-feedback id="name-feedback" class="mb-2">
                  El nombre no debe contener números ni solo espacios.
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group label="Apellidos" label-for="lastname" class="required-label">
                <b-form-input
                  :disabled="isLoggedIn"
                  id="lastname"
                  type="text"
                  v-model="lastname"
                  placeholder="Ingresa tus apellidos"
                  required
                  @input="validateLastname"
                  :state="lastnameState"
                  aria-describedby="lastname-feedback"
                ></b-form-input>
                <b-form-invalid-feedback id="lastname-feedback" class="mb-2">
                  Los apellidos no deben contener números ni solo espacios.
                </b-form-invalid-feedback>
              </b-form-group>

              <b-form-group label="Pin de acceso a la evaluación" label-for="pin" class="required-label">
                <b-form-input
                  id="pin"
                  type="text"
                  v-model="pin"
                  placeholder="Ingresa el pin de acceso"
                  :disabled="!showInputPin"
                  required
                  @input="validatePin"
                  :state="pinState"
                  aria-describedby="pin-feedback"
                ></b-form-input>
                <b-form-invalid-feedback id="pin-feedback" class="mb-2">
                  El PIN no debe contener solo espacios.
                </b-form-invalid-feedback>
              </b-form-group>

              <b-button type="submit" variant="primary" class="mt-4 mb-2" block :disabled="!isFormValid"><i class="bi bi-arrow-right"></i>Siguiente</b-button>
              <b-button v-if="isLoggedIn" type="submit" variant="outline-primary" class="mt-2 mb-2" block @click="logout()"><i class="bi bi-person-fill-x"></i>No soy yo</b-button>

            </b-form>
          </b-col>
        </b-row>
      </b-container>
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
      showInputPin: true,
      nameState: null,
      lastnameState: null,
      pinState: null,
    };
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn;
    },
    user() {
      return this.$store.state.auth.user;
    },
    username() {
      return this.user.nombre;
    },
    userLastname() {
      return (this.user.apellido_paterno + ' ' + (this.user.apellido_materno ? this.user.apellido_materno : '')).trim();
    },
    isFormValid() {
      return this.nameState === true && this.lastnameState === true && this.pinState === true;
    }
  },
  methods: {
    init_data() {
      this.pin = this.$route.params.pin ? this.$route.params.pin : '';
      this.validatePin();
      if (this.$route.params.pin) {
        this.showInputPin = false;
      }
      if (this.isLoggedIn) {
        this.name = this.username;
        this.validateName();
        this.lastname = this.userLastname;
        this.validateLastname();
      }
    },
    validateName() {
      const nameRegex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+( [a-zA-ZÀ-ÿ\u00f1\u00d1]+)*$/;
      this.nameState = nameRegex.test(this.name.trim());
    },
    validateLastname() {
      const lastnameRegex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+( [a-zA-ZÀ-ÿ\u00f1\u00d1]+)*$/;
      this.lastnameState = lastnameRegex.test(this.lastname.trim());
    },
    validatePin() {
      this.pinState = this.pin.trim() !== '';
    },
    joinToAssessment() {
      if (this.$store.state.auth.isLoggedIn) {
        console.log('PIN de actividad:', this.pin);
        console.log('Nombre de usuario registrado:', this.name);
        this.$router.push({ path: `/evaluaciones/unirse/${this.pin}` });
      } else {
        console.log('PIN de actividad:', this.pin);
        console.log('Nombre de invitado:', this.name);
        const data = {
          userName: this.name.trim() + ' ' + this.lastname.trim(),
        };
        AuthService.newGuestUser(data)
          .then((response) => {
            console.log("Resultado user guest: ", response);
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
            this.$router.push({ path: `/evaluaciones/unirse/${this.pin}` });
          })
          .catch(error => {
            console.error('Error al crear un usuario invitado: ', error);
          });
      }
    },
    logout() {
      this.isLoading = true;
      console.log("Close sesion");
      store.commit('logout');
      window.location.reload();
      // this.$router.push('/login');
    },
  },
  mounted() {
    this.init_data();
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
  color: black; /* Color del texto */
  text-decoration: underline; /* Subrayado */
  font-style: italic; /* Itálico */
  font-size: 14px; /* Tamaño del texto */
}
</style>

<template>
    <b-container class="custom-master-container custom-card-box custom-center-flex">
        <b-overlay :show="isLoading" class="width-100">      
            <b-container class="login-form">
                <b-row class="justify-content-center">
                <b-col cols="12" sm="10" >
                  <h2 class="text-center mb-3">Editar datos de tu cuenta</h2>
                  <b-form @submit.prevent="editUser()">

                    <b-form-group label="Correo electrónico" label-for="email" class="mb-0">
                        <b-form-input
                        id="email"
                        type="email"
                        v-model="email"
                        required
                        placeholder="Ingrese su correo electrónico"
                        disabled
                        ></b-form-input>            
                    </b-form-group>      
                    <div v-if="!verifiedEmail" class="d-flex justify-content-center align-items-center text-danger cursor-pointer mb-3"
                      v-b-tooltip.hover title="Da clic para saber más..." @click="emailConfirmationModal()">  
                        <i class="bi bi-envelope-exclamation" style="font-size: 18pt;"></i> 
                        <span>
                          Correo electrónico no verificado.
                        </span>
                      <!-- <p class="text-danger">                      
                        <i class="bi bi-envelope-exclamation" style="font-size: 25pt; display: block;"></i> 
                        Parece que aún no has verificado tu correo electrónico. Por favor, revisa tu bandeja de entrada (incluyendo la carpeta de spam) para encontrar el correo de verificación. Haz clic en el siguiente botón si necesitas que te lo reenviemos.                      
                      </p> -->
                      <!-- <b-button type="submit" variant="warning" class="mt-1 mb-5" >
                        <i class="bi bi-envelope-arrow-up" ></i>
                        Reenviar correo de verificación
                      </b-button> -->
                    </div>
                    <div v-else class="d-flex justify-content-center align-items-center text-success mb-3">
                      <i class="bi bi-envelope-check" style="font-size: 18pt;"></i> 
                      <span>
                        Correo electrónico verificado.  
                      </span>                                          
                    </div>

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
                        required />
                    </b-form-group>

                    <b-button type="submit" variant="success" class="mt-2 mb-3" :disabled="!dataChanged">
                      <i class="bi bi-floppy"></i>
                      Guardar datos
                    </b-button>
                
                    </b-form>
                </b-col>
                </b-row>
            </b-container>

        </b-overlay>        
    </b-container>
</template>

<script>
import UserService from '@/services/UserService';
import store from '@/store/auth';

export default {
  data() {
    return {
      isLoading: false,
      nombre: '',
      originalName: '',
      apellidos: '',
      originalLastnames: '',
      email: '',
      password: '',
      passwordConfirm: '',
      verifiedEmail: null,
      id_info_usuario: null,
    };
  },
  methods: {
    init_data(){
        let email = this.$store.state.auth.user.correo;
        console.log("Correo: ", email)
        UserService.getUserByEmail(email)
        .then(response => {
            console.log("Información del usuario: ", response);
            this.nombre = response.nombre;
            this.originalName = response.nombre;
            this.apellidos = response.apellido_materno ? response.apellido_paterno + ' ' + response.apellido_materno : response.apellido_paterno;
            this.originalLastnames = response.apellido_materno ? response.apellido_paterno + ' ' + response.apellido_materno : response.apellido_paterno;
            this.email = response.correo;
            this.verifiedEmail = response.verificado;
            this.id_info_usuario = response.id_info_usuario;
        })
        .catch(error => {
            console.error('Error:', error);
        });           
    },
    editUser() {
      this.isLoading = true;
      let apellidos = this.apellidos.trim();
      let bothSurnames = apellidos.split(' ');

      let fathersLastname = bothSurnames[0]
      let mothersLastname = bothSurnames.length > 1 ? bothSurnames[1] : '';

      let newUserData = {
        correo: this.email,
        nombre: this.nombre,
        apellidoPaterno: fathersLastname,
        apellidoMaterno: mothersLastname,
        verificado: this.verifiedEmail
      } 
      console.log('Datos del nuevo usuario:', newUserData);

      UserService.updateUser(this.id_info_usuario, newUserData)
      .then(response => {
        console.log("Actualizando el usuario: ", response);
        this.isLoading = false
        this.$swal({
          icon: 'success',
          title: '¡Éxito!',
          text: 'El usuario se ha actualizado correctamente',
        }).then(() => {
          const existingUserData = this.$store.state.auth.user;
          const user = {
            ...existingUserData,
            apellido_materno: mothersLastname,
            apellido_paterno: fathersLastname,
            nombre: this.nombre,
          }
          store.commit('setUser', user);          
          this.$router.go(0);     
        });      
      })
      .catch(error => {
        console.error('Error:', error);
        this.isLoading = false
        this.$swal({
          icon: 'error',
          title: '¡Error!',
          text: "Ocurrio un error al intentar actualizar los datos de tu cuenta, intenta más tarde...",
        });     
      })
    },
    emailConfirmationModal() {
      this.$swal({                      
        title: 'Verifica tu correo electrónico',
        // text: "Parece que aún no has verificado tu correo electrónico. Por favor, revisa tu bandeja de entrada (incluyendo la carpeta de spam) para encontrar el correo de verificación. Haz clic en el siguiente botón si necesitas que te lo reenviemos.",
        icon: 'warning',
        // confirmButtonText: 'Reenviar correo de verificación',
        confirmButtonText: '<i class="bi bi-envelope-arrow-up"></i> Reenviar correo de verificación',

        reverseButtons: true,
        html: `
          <p>Parece que aún no has verificado tu correo electrónico. Por favor, revisa tu bandeja de entrada (incluyendo la carpeta de spam) para encontrar el correo de verificación.</p>
          <p>Haz clic en el siguiente botón si necesitas que te lo reenviemos.</p>
         `,       
      }).then((result) => {
        if (result.isConfirmed) {
          console.log("Confirmado")
          UserService.sendConfirmationEmail()
          .then(response => {
            console.log("Email enviado exitosamente: ", response);
            this.$swal({
              icon: 'success',
              title: '¡Éxito!',
              text: 'Correo de verificación de email enviado exitosamente.',
            })
          })
          .catch(error => {
            console.error('Error:', error);
            this.$swal({
              icon: 'error',
              title: '¡Error!',
              text: "Ocurrio un error al intentar reenviar el correo de verificación, intenta más tarde...",
            });              
          });              
        } 
      })      
    }
  },
  created() {
    this.init_data()
  },
  computed: {
    dataChanged(){
      return ( (this.originalName !== this.nombre) || (this.originalLastnames !== this.apellidos) )
    }
  }
}
</script>

<style scoped>
/* .login-container {
  height: auto;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
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
} */
</style>
<template>
  <b-container class="custom-master-container custom-card-box custom-center-flex">
    <b-container>
      <!-- Header Section -->

      <!-- Banner Section -->
      <b-row class="banner-section my-5 d-flex justify-content-center align-items-center">
        <b-col cols="12" sm="12" md="12" lg="5">
          <div class="banner-text">
            <h1 class="display-3 font-weight-bold">{{ bannerText }}</h1>
            <p class="lead mt-4">{{ bannerDescription }}</p>
          </div>
          <div class="my-4">
            <!-- <b-button type="submit" variant="primary" class="mr-2"><i class="bi bi-arrow-right"></i>Comenzar</b-button> -->

            <router-link v-if="!isLoggedIn" to="/register" class="btn btn-primary mr-2">
              <i class="bi bi-person-fill-add"></i> Registrarse
            </router-link>

            <div v-else>
              <router-link to="/evaluaciones/crear-evaluacion" class="btn btn-primary mt-3 mt-md-2 mr-0 mr-md-2">
                <i class="bi bi-plus-lg"></i>Crear evaluación
              </router-link>
              <router-link to="/evaluaciones/mis-evaluaciones" class="btn btn-outline-primary mt-3 mt-md-2 ml-0 ml-md-2">
                <i class="bi bi-card-checklist"></i>Ver mis evaluaciones
              </router-link>              
            </div>
          </div>
        </b-col>
        <b-col cols="12" sm="12" md="12" lg="6">
          <img src="img/online_test.svg" alt="Banner Image" class="img-fluid">
        </b-col>     
      </b-row>


      <!-- <b-row class="text-center my-5">
        <b-col>
          <h1 class="display-3 font-weight-bold">Bienvenido a Donkademy</h1>
          <p class="lead">Transforma la manera en que evalúas a tus estudiantes con herramientas interactivas y dinámicas.</p>
        </b-col>
      </b-row> -->

      <!-- Features Section -->
      <b-row class="text-center my-5">
        <b-col cols="12" class="mb-4">
          <h2 class="display-4 font-weight-bold ">Instrumentos de Evaluación</h2>
          <p class="lead">Descubre la variedad de actividades de evaluación que Donkademy ofrece. Desde clasificación hasta resolución de crucigramas, nuestras herramientas están diseñadas para fomentar el aprendizaje interactivo y el pensamiento crítico. Explora nuestras actividades personalizables y lleva la evaluación al siguiente nivel con Donkademy.</p>
        </b-col>

        <b-col md="6" lg="3" class="mb-4" v-for="(activity, index) in activities" :key="index">
          <b-card :title="activity.title" class="text-center">
            <b-icon :icon="activity.icon" font-scale="4" class="my-3"></b-icon>
            <b-card-text>{{ activity.description }}</b-card-text>
            <!-- <b-button variant="primary" @click="selectActivity(activity.type)">Crear {{ activity.title }}</b-button> -->
          </b-card>
        </b-col>
      </b-row>


      <!-- Share Section -->
      <b-row class="banner-section my-5 d-flex justify-content-center align-items-center">
        <b-col cols="12" md="5" order-md="1">
          <img src="img/share_link.svg" alt="Share Link Or Pin" class="img-fluid">
        </b-col>        
        <b-col cols="12" md="7" order-md="2">
          <div class="banner-text my-4">
            <h2 class="font-weight-bold">Comparte tus evaluaciones fácilmente</h2>
            <p class="lead">Con Donkademy, compartir tus evaluaciones es simple y seguro. Generamos un PIN único para cada actividad, asegurando su exclusividad. Además, puedes enviar el enlace directo a tus alumnos, facilitando su acceso con un solo clic. Simplifica la distribución y acceso a tus evaluaciones con Donkademy.</p>            
          </div>
        </b-col>     
      </b-row>      

      <!-- Response Settings Section -->
      <b-row class="banner-section my-5 d-flex justify-content-center align-items-center">
        <b-col cols="12" md="5" order-md="2">
          <img src="img/test_approve.svg" alt="Custom Feedback Settings" class="img-fluid">
        </b-col>           
        <b-col cols="12" md="7" order-md="1">
          <div class="banner-text my-4">
            <h2 class="font-weight-bold">Configuraciones de respuesta personalizadas</h2>
            <p class="lead">
              En Donkademy, tú decides cómo los alumnos reciben retroalimentación al entregar sus respuestas. Puedes optar por mostrarles las respuestas correctas al instante, sin permitirles corregir sus respuestas previas. Esta opción fomenta un aprendizaje activo y la corrección inmediata de errores. Alternativamente, puedes elegir que los alumnos envíen sus respuestas sin ver ninguna retroalimentación inmediata, promoviendo un enfoque más reflexivo y desafiante. Tú tienes el control total sobre la experiencia de evaluación.            
            </p>
          </div>
        </b-col>                  
      </b-row>     

      <!-- Grading and Review Section -->
      <b-row class="banner-section my-5 d-flex justify-content-center align-items-center">
        <b-col cols="12" md="5" order-md="1">
          <img src="img/test_results.svg" alt="Share Link Or Pin" class="img-fluid">
        </b-col>        
        <b-col cols="12" md="7" order-md="2">
          <div class="banner-text my-4">
            <h2 class="font-weight-bold">Revisión de calificaciones</h2>
            <p class="lead">
              Accede a las calificaciones de cada alumno para una evaluación detallada. Esta función te permite a ti mismo ver el rendimiento individual, identificar áreas de mejora y proporcionar retroalimentación específica en tu aula. Con un análisis claro, puedes adaptar tus estrategias de enseñanza para satisfacer las necesidades de cada alumno, mejorando el aprendizaje en tu aula.
            </p>
          </div>
        </b-col>     
      </b-row>   

      <!-- Multiplatform Access  -->
      <b-row class="banner-section my-5 d-flex justify-content-center align-items-center">
        <b-col cols="12" md="5" order-md="2">
          <img src="img/multi_devices.svg" alt="Multiplatform Access" class="img-fluid">
        </b-col>         
        <b-col cols="12" md="7" order-md="1">
          <div class="banner-text my-4">
            <h2 class="font-weight-bold">Acceso desde múltiples dispositivos</h2>
            <p class="lead">
              Donkademy ofrece acceso desde múltiples dispositivos para una experiencia sin complicaciones. Tanto tú como tus alumnos pueden acceder a la plataforma desde diferentes dispositivos con conexión a internet: ya sea un celular, una computadora o una tableta. No es necesario instalar ninguna aplicación adicional; simplemente abre tu navegador web favorito y accede a Donkademy. Esto asegura una experiencia fluida y conveniente, independientemente de dónde te encuentres o qué dispositivo estés utilizando.
            </p>
          </div>
        </b-col>                    
      </b-row>         
    </b-container>
  </b-container>
</template>

<script>
export default {
  data() {
    return {
      bannerText: '',
      bannerDescription: 'Transforma la manera en que evalúas a tus estudiantes con herramientas interactivas y dinámicas.',  
      activities: [
        {
          title: 'Ordena los Ítems',
          description: 'Crea una evaluación donde los alumnos deben ordenar ítems correctamente.',
          icon: 'sort-alpha-down',
          type: 'sort-items'
        },
        {
          title: 'Ordena el Enunciado',
          description: 'Desafía a tus alumnos a ordenar enunciados de forma correcta.',
          icon: 'sort-alpha-down-alt',
          type: 'sort-sentence'
        },
        {
          title: 'Sopa de Letras',
          description: 'Genera sopas de letras para que tus alumnos encuentren las palabras escondidas.',
          icon: 'grid-3x3-gap-fill',
          type: 'word-search'
        },
        {
          title: 'Crucigramas',
          description: 'Diseña crucigramas educativos para tus alumnos.',
          icon: 'journal',
          type: 'crossword'
        }
      ]
    };
  },
  mounted() {
    // Text animation effect
    this.animateText();
  },  
  methods: {
    // Function to animate text
    animateText() {
      const text = 'Bienvenido a Donkademy';
      let index = 0;
      const intervalId = setInterval(() => {
        if (index <= text.length) {
          this.bannerText = text.slice(0, index);
          index++;
        } else {
          clearInterval(intervalId);
        }
      }, 100);
    },    
    selectActivity(type) {
      // Navegar a la página de creación de actividad correspondiente
      this.$router.push({ name: 'CreateActivity', params: { activityType: type } });
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.auth.isLoggedIn;
    },
  }
};
</script>

<style scoped>
.homepage {
  background-color: #f8f9fa;
}

h1, h2 {
  color: #343a40;
}

b-card {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
}

b-card:hover {
  transform: translateY(-5px);
}

b-button {
  transition: background-color 0.2s, transform 0.2s;
}

b-button:hover {
  background-color: #0056b3;
  transform: translateY(-2px);
}

.my-5 {
  margin-top: 3rem !important;
  margin-bottom: 3rem !important;
}

.my-4 {
  margin-top: 2rem !important;
  margin-bottom: 2rem !important;
}
</style>

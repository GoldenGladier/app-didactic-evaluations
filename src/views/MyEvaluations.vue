<template>
  <b-container class="custom-master-container">
    <h1 class="text-center mb-3"> Mis Evaluaciones</h1>
    <div class="search-container">
    <!-- Barra de búsqueda -->
    <SearchBar @search="performSearch" class="mb-3"/>

    <b-container fluid>
      <b-row class="justify-content-md-center">

        <b-col v-if="items.length === 0" cols="12" class="mt-5">
          <h3 class="text-center">Por el momento no tienes evaluaciones disponibles.</h3>
          <b-button @click="$router.push(`/evaluaciones/crear-evaluacion`)" variant="primary" class="custom-button-icon">
            <b-icon icon="plus-circle"></b-icon> <span class="button-text">Crear evaluación</span>
          </b-button>           
        </b-col>

        <b-col v-for="item in filteredItems" :key="item.id" col lg="4" md="6" sm="12">
          <div class="evaluacion-container">
            
            <!-- <b-button @click="editItem(item)" >
              <b-icon icon="three-dots-vertical"></b-icon>
            </b-button> -->

            <div>
              <b-dropdown size="lg"  variant="link" toggle-class="text-decoration-none" class="custom-actions-button" no-caret>
                <template #button-content>
                  <b-icon icon="three-dots-vertical"></b-icon><span class="sr-only">Search</span>
                </template>
                <b-dropdown-item href="#"><b-icon icon="trash"/> Eliminar</b-dropdown-item>
              </b-dropdown>
            </div>

            <b-img :src="require('@/assets/default-image.png')" alt="activity-img" class="custom-img"></b-img>            
            <h3 class="text-center">{{ item.nombre }}</h3>
            <p>{{ item.descripcion }}</p>
            <div class="button-container">                
                <b-button @click="$router.push(`/evaluaciones/${item.id_evaluaciones}/editar`)" variant="warning" class="custom-button-icon">
                  <b-icon icon="pen"></b-icon> <span class="button-text">Editar</span>
                </b-button>
                <b-button @click="removeItem(item)" variant="primary" class="custom-button-icon">
                  <b-icon icon="share"></b-icon> <span class="button-text">Compartir</span>
                </b-button>                
            </div>            
          </div>
        </b-col>
      </b-row>
    </b-container>

    </div>
    <!-- <div class="result-container">
        <div v-for="item in filteredItems" :key="item.id" class="evaluacion-container"> 
            <h3>{{ item.name }}</h3>
            <p><strong>ID:</strong> {{ item.id }}</p>
            <div class="button-container">
                
                <b-button @click="viewDetails(item)" variant="info" class="mt-2">Ver Detalles</b-button>
                <b-button @click="editItem(item)" variant="primary" class="mt-2">Editar</b-button>
                <b-button @click="removeItem(item)" variant="danger" class="mt-2">Eliminar</b-button>
            </div>
        </div>
    </div> -->
  </b-container>
</template>
  
<script>
  import EvaluationService from '@/services/EvaluationService';

import SearchBar from '@/components/SearchBar.vue';
  
  export default {
    name: "MyEvaluations",
    components: {
      SearchBar
    },
    data() {
      return {
        items: [], // Aquí va los datos de la base de datos
        filteredItems: []
      };
    },
    methods: {
      performSearch(searchQuery) {
        // Filtra los elementos basados en el término de búsqueda
        this.filteredItems = this.items.filter(item =>
          item.nombre.toLowerCase().includes(searchQuery.toLowerCase())
        );
      },
      editItem(item) {
      // Lógica para agregar el elemento al carrito de compras
      console.log('Edita la evaluacion:', item);
      // Aquí puedes implementar la funcionalidad para agregar el elemento al carrito
    },
    viewDetails(item) {
      // Lógica para ver detalles del elemento
      console.log('Ver detalles de:', item);
      // Aquí puedes implementar la funcionalidad para mostrar detalles del elemento
    },
    removeItem(item) {
      // Lógica para eliminar el elemento
      console.log('Eliminar:', item);
      // Aquí puedes implementar la funcionalidad para eliminar el elemento de la lista
    }
    },
    mounted() {
      EvaluationService.getAllEvaluationsByAauthenticatedUser()
      .then(response => {
        console.log("Evaluaciones del usuario: ", response);
        this.items = response;
        this.filteredItems = this.items;
      })
      .catch(error => {
        console.error('Error:', error);  
      }); 

      // this.items = [
      //   { id: 1, name: 'Evaluacion A', imgUrl: '@/assets/good-email.png' },
      //   { id: 2, name: 'Evaluacion B', imgUrl: '@/assets/default-image.png' },
      //   { id: 3, name: 'Evaluacion C', imgUrl: '@/assets/default-image.png' },
      //   { id: 4, name: 'examen 6', imgUrl: '@/assets/default-image.png' },
      //   { id: 5, name: 'tarea 8', imgUrl: '@/assets/default-image.png' },
      //   { id: 6, name: 'Evaluacion 9', imgUrl: '@/assets/default-image.png' }
      // ];
       // Mostrar todos los elementos al inicio
    }
  };
  </script>
  
<style scoped>
  .custom-img {
    margin-bottom: 1rem;
    width: 100%;
    border-radius: 0.4rem;
  }

  .evaluacion-container {
    margin-bottom: 1rem;
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0.4rem;
    text-align: center;
  }

  .button-container {
    /* margin: 0.5rem; */
    display: flex;
    justify-content: space-between; /* Distribuir botones horizontalmente */
  }

  .custom-actions-button,
  .custom-actions-button:focus,
  .custom-actions-button:hover,
  .custom-actions-button:active{
    position: absolute;
    right: 1rem;
    background: transparent;
    color: #FFFFFF !important;
    border: none;
  }

  .custom-actions-button button.btn-link:hover {
    color: #FFFFFF !important;
    background: skyblue;
  }

  @media (max-width: 768px) {
    .button-text {
      display: none;
    }
  }


/* Estilos para botones */
b-button {
  flex: 1; /* Hace que los botones ocupen espacio igual */
}

  h3 {
  margin-bottom: 10px;
}

p {
  margin-bottom: 5px;
}
.search-container {
    margin-bottom: 20px;
  }

.container {
    background: #FFFFFF;
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 0.4rem;
     box-shadow: 0 4px 24px 0 rgba(34,41,47, 0.15);
  }

.result-container {
    display: flex;
    justify-content: flex-start; /* Alinea los contenedores de elementos al inicio */
    flex-wrap: wrap; /* para que quepan todos en lo ancho */
  }
  

</style>
  


  
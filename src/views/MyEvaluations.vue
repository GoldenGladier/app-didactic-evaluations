<template>
  <b-container class="custom-master-container">
    <h1 class="text-center mb-3"> Mis Evaluaciones</h1>
    <div class="search-container">
    <!-- Barra de búsqueda -->
    <SearchBar @search="performSearch" class="mb-2"/>
    <!-- <b-container> -->
      <b-row>
        <b-col v-for="item in filteredItems" :key="item.id" class="evaluacion-container">
          <div>
            <b-img :src="require('@/assets/default-image.png')" alt="activity-img" class="custom-img mb-3"></b-img>            
            <h3 class="text-center">{{ item.name }}</h3>
            <!-- <p><strong>ID:</strong> {{ item.id }}</p> -->
            <div class="button-container">                
                <b-button @click="viewDetails(item)" variant="info" class="mt-2">
                  <b-icon icon="eye"></b-icon>
                  Ver
                </b-button>
                <b-button @click="editItem(item)" variant="primary" class="mt-2">
                  <b-icon icon="pen"></b-icon>
                  Editar
                </b-button>
                <b-button @click="removeItem(item)" variant="danger" class="mt-2">
                  <b-icon icon="trash"></b-icon>
                  Eliminar
                </b-button>
            </div>
          </div>
        </b-col>
      </b-row>
    <!-- </b-container> -->
    </div>
        <div class="result-container">
        <div v-for="item in filteredItems" :key="item.id" class="evaluacion-container"> 
            <h3>{{ item.name }}</h3>
            <p><strong>ID:</strong> {{ item.id }}</p>
            <div class="button-container">
                
                <b-button @click="viewDetails(item)" variant="info" class="mt-2">Ver Detalles</b-button>
                <b-button @click="editItem(item)" variant="primary" class="mt-2">Editar</b-button>
                <b-button @click="removeItem(item)" variant="danger" class="mt-2">Eliminar</b-button>
            </div>
        </div>
      </div>
  </b-container>
</template>
  
<script>
import SearchBar from '@/components/SearchBar.vue';
  
  export default {
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
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
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
      // PRUEBA
      this.items = [
        { id: 1, name: 'Evaluacion A', imgUrl: '@/assets/good-email.png' },
        { id: 2, name: 'Evaluacion B', imgUrl: '@/assets/default-image.png' },
        { id: 3, name: 'Evaluacion C', imgUrl: '@/assets/default-image.png' },
        { id: 4, name: 'examen 6', imgUrl: '@/assets/default-image.png' },
        { id: 5, name: 'tarea 8', imgUrl: '@/assets/default-image.png' },
        { id: 6, name: 'Evaluacion 9', imgUrl: '@/assets/default-image.png' }
      ];
      this.filteredItems = this.items; // Mostrar todos los elementos al inicio
    }
  };
  </script>
  
 <style>
.custom-img {
  width: 100%;
  border-radius: 0.4rem;
}

.button-container {
  margin-top: 15px;
  display: flex;
  justify-content: space-between; /* Distribuir botones horizontalmente */
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
  
  .evaluacion-container {
    width: 300px; /* ancho de cada contenedor  */
    margin: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 10px;
    text-align: left;
  }
  </style>
  


  
    <!--
        <template>
            Para acceder a la cuenta antes 
    <div class="custom-card-box">
      <b-container class="mt-4">
        <b-row>
          <b-col cols="12" class="text-center">
            <h1>Bienvenido a tus evaluaciones</h1>
            <p>¡Haz clic en el botón para acceder a tu cuenta!</p>
            <b-button @click="redirectToLogin" variant="primary">Ir a Login</b-button>
         
          </b-col>
        </b-row>
      </b-container>
    </div>

    



  </template>
  
  <script>
  export default {
    methods: {
      redirectToLogin() {
        this.$router.push({ name: 'Login' });
      }
    }
  }
  </script>-->
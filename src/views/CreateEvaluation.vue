<template>
    <div class="container">
        <h1 class="text-center mb-3"> Crear Evaluación</h1>
        <p class="text-center mb-3"> A continuación se muestran las dinámicas de evaluación que puedes seleccionar para crear.</p>
        <div class="contenedor-principal">
          <div class="contenedor" @click="toggleContenedor">
            <h3 class="text-center mb-3" >Pregunta-Respuesta</h3>
          </div>
      
          <div class="subcontenedores" v-if="mostrarSubcontenedores">
            <div class="subcontenedor" @click="abrirSubcontenedor1">
              <h4 class="text-center mb-3">Gato</h4>
              <b-button id="Gato" variant="info" class="mr-2" @click="abrirBotonSubcontenedor1">Crear</b-button>
            </div>
            <div class="subcontenedor" @click="abrirSubcontenedor2">
              <h4 class="text-center mb-3">Conecta 4</h4>
              <b-button id="conecta4" variant="info" class="mr-2" @click="abrirBotonSubcontenedor2">Crear</b-button>
            </div>
          </div>
        </div>

        <div class="contenedor-principal">
          <div class="contenedor" @click="toggleContenedor2">
            <h3 class="text-center mb-3">Ordenamiento</h3>
          </div>
      
          <div class="subcontenedores" v-if="mostrarSubcontenedores2">
            <div class="subcontenedor" @click="abrirSubcontenedorOrd1">
              <h4 class="text-center mb-3">Ordena los items</h4>
              <b-button id="Ordenaritems" variant="info" class="mr-2" @click="abrirBotonSubcontenedorOrd1">Crear</b-button>
            </div>
              
            </div>
    
          </div>
          <div class="contenedor-principal">
          <div class="contenedor" @click="toggleContenedor3">
            <h3 class="text-center mb-3">Relación de columnas</h3>
          </div>
      
          <div class="subcontenedores" v-if="mostrarSubcontenedores3">
            <div class="subcontenedor" @click="abrirSubcontenedorCol1">
              <h4 id="meroma" class="text-center mb-3">Memorama</h4>
              <b-button variant="info" class="mr-2" @click="abrirBotonSubcontenedorCol1">Crear</b-button>
            </div>
            <div class="subcontenedor" @click="abrirSubcontenedorCol2">
              <h4 class="text-center mb-3">Conecta los items</h4>
              <b-button id="conecta-items" variant="info" class="mr-2" @click="abrirBotonSubcontenedorCol2">Crear</b-button>
            </div>
          </div>
        </div>
        </div>
        
      </template>
    
    
    <script>
    export default {
      data() {
        return {
          mostrarSubcontenedores: false,
          mostrarSubcontenedores2: false,
          mostrarSubcontenedores3: false,
          contenedorSeleccionado: 0, // Índice del contenedor seleccionado (por defecto, el primero)
            subcontenedorSeleccionado: 0, // Índice del subcontenedor seleccionado (por defecto, el primero)
    
        };
      },
      methods: {
        
        toggleContenedor() {
          this.mostrarSubcontenedores = !this.mostrarSubcontenedores;
        },
        abrirSubcontenedor1() {
        },
        abrirSubcontenedor2() {
          
        },
        abrirBotonSubcontenedor1(){
        },
        abrirBotonSubcontenedor2(){
        },
    
    
        //esto es lo de Ordenamiento
        toggleContenedor2() {
          this.mostrarSubcontenedores2 = !this.mostrarSubcontenedores2;
        },
        abrirSubcontenedorOrd1() {
        },
        abrirBotonSubcontenedorOrd1(){
        },
    
        //esto es lo de Relacion de columnas 
        toggleContenedor3() {
          this.mostrarSubcontenedores3 = !this.mostrarSubcontenedores3;
        },
        abrirSubcontenedorCol1() {
        },
        abrirSubcontenedorCol2() {
        },
        abrirBotonSubcontenedorCol1(){
        },
        abrirBotonSubcontenedorCol2(){
        },
        
      },
    };
    </script>
    
    <style>
   .contenedor-principal {
    width: 50%;
    margin: 0 auto;
    text-align: center;
    padding: 20px;
   
    }

    .contenedor:hover {
      background-color: #759eca; /* Azul más oscuro al pasar el cursor */
    }

    .contenedor {
      border: 1px solid #ccc;
      padding: 20px;
      border-radius: 10px;
      cursor: pointer;
      transition: background-color 0.3s ;
    }
    
    .contenedor h2 {
      margin-top: 0;
    }
    
    .subcontenedores {
      display: flex;
      flex-direction: column;
      margin-top: 20px;
      border-radius: 10px;
    }
    
    .subcontenedor {
      margin-bottom: 10px;
      padding: 15px;
      border: 1px solid #ddd;
      border-radius: 5px;
      cursor: pointer;
    }
    
    .subcontenedor h3 {
      margin-top: 0;
      margin-bottom: 10px;
    }
    
    .boton-redondo-azul {
        background-color: #fff; /* Color de fondo blanco */
      color: #000; /* Color del texto negro */
      padding: 10px 20px; /* Ajuste de relleno */
      border: 1px solid #ccc; /* Borde gris claro */
      border-radius: 5px; /* Bordes redondeados */
      cursor: pointer; /* Cursor en forma de puntero */
      transition: background-color 0.3s; /* Animación de hover */
    }
    
    .boton-redondo-azul:hover {
      background-color: #0056b3; /* Azul más oscuro al pasar el cursor */
    }
    </style>
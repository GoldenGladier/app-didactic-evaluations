<template>
  <b-navbar toggleable="md" type="dark" class="custom-navbar">
    <div class="custom-info-brand">
      <b-icon icon="triangle-half" class="sidebar-icon" ></b-icon>
      <b-navbar-brand href="#">Mi aplicación</b-navbar-brand>      
    </div>

    <b-collapse id="navbarSupportedContent" class="custom-extra-options" is-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown >
          <template #button-content>
            <div class="d-flex align-items-center custom-user-opcions">
              <span class="username">User name</span>
              <!-- <img src="ruta-a-la-imagen-del-usuario" alt="Foto de perfil" class="user-avatar"> -->
              <b-icon icon="person" class="user-avatar"></b-icon>
            </div>
          </template>
          <b-dropdown-item >Cerrar sesión</b-dropdown-item>
          <b-dropdown-item >Configurar usuario</b-dropdown-item>
        </b-nav-item-dropdown>

        <!-- <b-dropdown id="dropdown-dropleft" dropleft offset="-35" text="Drop-Left" variant="primary" class="ml-1">
          <b-dropdown-item href="#">Action</b-dropdown-item>
          <b-dropdown-item href="#">Another action</b-dropdown-item>
          <b-dropdown-item href="#">Something else here</b-dropdown-item>
        </b-dropdown>   -->

      </b-navbar-nav>
    </b-collapse>

  </b-navbar>
</template>

<script>
export default {
  name: 'Navbar',
};
</script>

<style>
.custom-navbar {
  background-color: #FBA834;
  margin: 0.5rem;
  border-radius: 0.4rem;
}

.custom-info-brand {
  padding-left: 2rem;
}

.sidebar-icon {
  margin: auto 0.5rem;
  color: #F6F5F5;
}

.custom-extra-options {
  padding-right: 2rem;
}

.custom-navbar {
  background-color: #FBA834;
  padding: 0.5rem;
}

.custom-user-opcions {
  color: #F6F5F5;
}

.username {
  margin-right: 0.5rem;
}

.user-avatar {
  width: 30px; 
  height: 30px; 
  border-radius: 50%; 
  border: solid 1px #F6F5F5;
  padding: 2px;
}

.custom-navbar .dropdown-toggle::after {
  display: none !important;
}

/* .b-navbar {
  height: auto !important;
} */

.ml-auto {
  margin-left: auto !important;
}
</style>
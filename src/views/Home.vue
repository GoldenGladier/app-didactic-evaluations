<template>
  <div class="home-container custom-card-box">
    <b-container class="pt-4">
      <div>
        <b-carousel
          id="carousel-no-animation"
          style="text-shadow: 0px 0px 2px #000"
          no-animation
          indicators
          img-width="1024"
          img-height="480"
        >
          <b-carousel-slide
            caption="First Slide"
            img-src="https://picsum.photos/1024/480/?image=10"
          ></b-carousel-slide>
          <b-carousel-slide
            caption="Second Slide"
            img-src="https://picsum.photos/1024/480/?image=12"
          ></b-carousel-slide>
          <b-carousel-slide
            caption="Third Slide"
            img-src="https://picsum.photos/1024/480/?image=22"
          ></b-carousel-slide>
          <b-carousel-slide
            caption="Fourth Slide"
            img-src="https://picsum.photos/1024/480/?image=23"
          ></b-carousel-slide>
        </b-carousel>
      </div>      
      <b-row class="pt-4">
        <b-col cols="12" class="text-center">
          <h1>Bienvenido a la Página de Inicio</h1>
          <p>¡Haz clic en el botón para ir a la página "About"!</p>
          <b-button @click="redirectToAbout" variant="primary">Ir a About</b-button>

          <b-dropdown id="dropdown-dropleft" offset="-100" text="Drop-Left" variant="primary" class="ml-1">
            <b-dropdown-item href="#">Action</b-dropdown-item>
            <b-dropdown-item href="#">Another action</b-dropdown-item>
            <b-dropdown-item href="#">Something else here</b-dropdown-item>
          </b-dropdown>          
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
export default {
  methods: {
    redirectToAbout() {
      this.$router.push({ name: 'About' });
    }
  }
}
</script>

<style scoped>
.home-container {
  position: absolute;
  width: 100%;
  height: 100%;
}
</style>
<template>
  <b-row class="mb-3">

    <b-col cols="12">
        <p class="text-justify">Si deseas que tus alumnos accedan y respondan la evaluación, simplemente comparte este PIN con ellos. Pueden ingresar el PIN en la página web para acceder.</p>
    </b-col>    
    <b-col sm="12" md="6" bg="6" class="d-flex justify-content-center align-items-center">
        <span class="pin">{{ pin }}</span>
    </b-col>
    <b-col sm="12" md="6" bg="6" class="d-flex justify-content-center align-items-center">
        <b-button v-if="supportCopyClipboard" @click="copyToClipboard('Usa este pin para unirte a la evaluación: ' + pin)" variant="primary">
            <b-icon icon="clipboard" aria-hidden="true"></b-icon> Copiar
        </b-button>
    </b-col>

    <b-col cols="12" class="mt-1">
        <p class="text-justify">O bien, puedes compartirles el siguiente enlace para que accedan con solo hacer clic en él.</p>
    </b-col>    
    <b-col sm="12" md="12" bg="8" class="d-flex justify-content-center align-items-center mt-1">
        <router-link :to="link" target="_blank">{{ dynamicUrl }}</router-link>
    </b-col>
    <b-col sm="12" md="12" bg="4" class="d-flex justify-content-center align-items-center mt-2">
        <b-button v-if="supportCopyClipboard" @click="copyToClipboard(dynamicUrl)" variant="primary">
            <b-icon icon="clipboard" aria-hidden="true"></b-icon> Copiar
        </b-button>
    </b-col>

  </b-row>
</template>    

<script>
import EvaluationService from '@/services/EvaluationService';

export default {
    name: "ShareEvaluationModal",
    props: {
        shareEvaluationId: null,
    },
    data() {
        return {
            isLoading: false,
            pin: null,
            link: '/join-to-activity',
            dynamicUrl: null, 
        };
    },
    methods: {
        init_data() {
            EvaluationService.share(this.shareEvaluationId)
            .then(response => {
              console.log("Share status: ", response);
              this.pin = response.pin
              const baseUrl = window.location.origin;
              this.dynamicUrl = `${baseUrl}/join-to-activity/${this.pin}`;
              this.link = `/join-to-activity/${this.pin}`;
            })
            .catch(error => {
              console.error('Error:', error);  
            });            
        },        
        copyToClipboard(textCopy) {
            navigator.clipboard.writeText(textCopy)
            .then(() => {
                console.log('Texto copiado al portapapeles');
                this.toast('Texto copiado al portapapeles');
            })
            .catch(err => {
                console.error('Error al copiar al portapapeles: ', err);
                this.toast('Error al copiar al portapapeles');
            });
        },       
        toast(message) {
            this.counter++
            this.$bvToast.toast([message], {
                title: `Compartir evaluación`,
                toaster: 'b-toaster-bottom-right',
                solid: true,
                appendToast: true
            })
        }        
    },
    created() {
        this.init_data();
    },
    computed: {
        supportCopyClipboard() {
            return navigator && navigator.clipboard && typeof navigator.clipboard.writeText === 'function';
        }
    }
};
</script>
  
<style scoped>
    span.pin {
        font-size: 35px;
        font-family: -apple-system, BlinkMacSystemFont,"Segoe UI","Noto Sans",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji";    
        letter-spacing: 5px;
        font-weight: 500;    
        display: block;
        text-align: right;
    }
</style>
  


  
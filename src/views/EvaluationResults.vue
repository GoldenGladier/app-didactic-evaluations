<template>
  <b-container class="custom-master-container custom-card-box custom-center-flex">
    <b-overlay :show="isLoading" class="width-100">  
        <b-button type="submit" variant="primary" class="mt-2 mb-2" @click="downloadPdf">
            <i class="bi bi-file-earmark-pdf"></i>
            Exportar a PDF
        </b-button>
      
        <section v-if="evaluationData" class="evaluation-data text-align-center" id="element-to-convert">            
            <h1 class="title-bold-primary"><i class="bi bi-star-fill" style="font-size: 100%"></i>Resultados</h1>
            <h1 class="title-bold">{{ evaluationData.nombre }}</h1>
            <h2 class="subtitle-light">{{ evaluationData.subtitulo }}</h2>
            <p class="mt-4">{{ evaluationData.descripcion }}</p>
            <hr class="my-4">     
            <b-container>
                <b-table striped :items="students" :fields="fields" bordered class="table custom-table rounded-table text-center"></b-table> 
            </b-container>     
        </section>
    </b-overlay>
  </b-container>
</template>

<script>
import EvaluationService from '@/services/EvaluationService';
import html2pdf from "html2pdf.js";

export default {
    components: {
        
    },
    data() {
        return {
            isLoading: false, 
            evaluationData: null,    
            fields: [
                { key: 'name', label: 'Nombre' },
                { key: 'correctAnswers', label: 'Respuestas correctas' },
                { key: 'percentage', label: 'Porcentaje' }
            ],   
            students: [],         
        }
    },
    methods: {
        init_data() {         
            this.isLoading = true;
            this.idEvaluation = this.$route.params.idEvaluation;
            EvaluationService.getEvaluationById(this.idEvaluation)
            .then(response => {
                console.log("Datos de evaluation: ", response);
                this.evaluationData = response;
            })
            .catch(error => {
                console.error('Error:', error);
            })
            .finally(() => {
                this.isLoading = false 
            })                
            this.students = this.generateFakeData();
        },    
        updateLoading(isLoading) {
            this.isLoading = isLoading;
        },
        generateFakeData() {
            const fakeData = [];
            const names = [
                'Juan Pérez', 'María García', 'Pedro Gómez', 'Laura Martínez', 'José Rodríguez',
                'Ana López', 'Luis Hernández', 'Marta González', 'Jorge Sánchez', 'Elena Torres',
                'Carlos Ruiz', 'Carmen Fernández', 'Diego Ramírez', 'Sara Jiménez', 'Andrés Morales',
                'Lucía Ortiz', 'Antonio Castro', 'Isabel Silva', 'Francisco Díaz', 'Beatriz Moreno',
                'David Romero', 'Sofía Vega', 'Alberto Vargas', 'Clara Pérez', 'Raúl Flores',
                'Julia Castillo', 'Manuel Navarro', 'Rosa Campos', 'Víctor Aguilar', 'Paula Serrano'
            ];

            for (let i = 0; i < names.length; i++) {
                const correctAnswers = Math.floor(Math.random() * 20) + 1; // Random correct answers between 1 and 20
                const percentage = (correctAnswers / 20 * 100).toFixed(2); // Assuming 20 questions in total

                fakeData.push({
                name: names[i],
                correctAnswers: correctAnswers,
                percentage: percentage + '%'
                });
            }

            return fakeData;
        },
        downloadPdf() {
            html2pdf(document.getElementById("element-to-convert"), {
                margin: 5,
                filename: "Resultados_de_Evaluacion.pdf",
			});
        }
    },
    created() {
        this.init_data();
    },
}
</script>

<template>
    <b-container class="custom-master-container custom-card-box custom-center-flex">
        <b-overlay :show="isLoading" class="width-100">
        <section v-if="evaluationData" class="evaluation-data text-align-center" id="element-to-convert">            
            <h1 class="title-bold-primary"><i class="bi bi-star-fill" style="font-size: 100%"></i>Resultados</h1>
            <h1 class="title-bold">{{ evaluationData.nombre }}</h1>
            <h2 class="subtitle-light">{{ evaluationData.subtitulo }}</h2>
            <hr class="my-4">     
            <b-container v-if="!activeExportProcess">
                <b-button type="submit" variant="danger" class="my-2 mx-1" @click="downloadPdf">
                    <i class="bi bi-file-earmark-pdf-fill"></i>
                    Exportar a PDF
                </b-button>
                <b-button type="submit" variant="success" class="my-2 mx-1" @click="downloadPdf">
                    <i class="bi bi-file-earmark-excel-fill"></i>
                    Exportar a Excel
                </b-button>   
            </b-container>
            <b-container>
                <b-table striped small :items="results" :fields="fields" bordered class="table custom-table rounded-table text-center"></b-table> 
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
                { key: 'nombreCompleto', label: 'Nombre' },
                { key: 'respuestasCorrectas', label: 'Respuestas correctas' },
                { key: 'porcentaje', label: 'Porcentaje', formatter: this.formatPercentage }
            ],   
            activeExportProcess: false,
            results: null,     
        }
    },
    methods: {
        init_data() {
            this.isLoading = true;
            this.idEvaluation = this.$route.params.idEvaluation;

            Promise.all([
                EvaluationService.getEvaluationById(this.idEvaluation),
                EvaluationService.getEvaluationResults({ idEvaluacion: Number(this.idEvaluation) })
            ])
            .then(([evaluationResponse, resultsResponse]) => {
                console.log("Datos de evaluation: ", evaluationResponse);
                this.evaluationData = evaluationResponse;
                console.log("Resultados de evaluation: ", resultsResponse);
                this.results = resultsResponse.reportInfo?.report;
            })
            .catch(error => {
                console.error('Error:', error);
            })
            .finally(() => {
                this.isLoading = false;
            });
        },
        formatPercentage(value) {
            const number = parseFloat(value);
            return Number.isInteger(number) ? `${number}%` : `${number.toFixed(2)}%`;
        },       
        updateLoading(isLoading) {
            this.isLoading = isLoading;
        },
        downloadPdf() {
            this.activeExportProcess = true;
            const element = document.getElementById("element-to-convert");

            element.querySelectorAll('b-container').forEach(el => el.classList.add('hidden'));

            const fileName = `${this.evaluationData.nombre.replace(/\s+/g, '_')}_resultados.pdf`;
            html2pdf()
            .from(element)
            .set({
                margin: 5,
                filename: fileName
            })
            .save()
            .finally(() => {
                element.querySelectorAll('b-container').forEach(el => el.classList.remove('hidden'));
                this.activeExportProcess = false;
            });
        }
    },
    created() {
        this.init_data();
    },
}
</script>

<style>
.hidden {
  display: none !important;
}
</style>

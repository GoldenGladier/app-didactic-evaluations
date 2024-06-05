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
                <b-button type="submit" variant="success" class="my-2 mx-1" @click="downloadExcel">
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
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

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
                { key: 'totalPreguntas', label: 'Total de preguntas' },
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
                this.results = resultsResponse.reportInfo?.report.map(result => ({
                    ...result,
                    totalPreguntas: resultsResponse.reportInfo?.totalQuestions
                }));
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
        },
        downloadExcel() {
            const wb = XLSX.utils.book_new();

            // Formatear los resultados con el porcentaje redondeado a 2 decimales
            const formattedResults = this.results.map(item => [
                { v: item.nombreCompleto, t: 's' }, // Use 's' type to force text format
                item.respuestasCorrectas,
                item.totalPreguntas,
                item.porcentaje % 1 === 0 ? `${item.porcentaje.toFixed(0)}%` : `${item.porcentaje.toFixed(2)}%` // Si el porcentaje es un número entero, no se añade la parte decimal
            ]);

            // Crear una hoja de trabajo con los datos
            const ws = XLSX.utils.aoa_to_sheet([
                [{ s: { font: { bold: true, color: { rgb: 'EE6F57' } }, }, v: "Resultados" }],
                [{ s: { font: { bold: true, color: { rgb: '3A2C60' } }, }, v: this.evaluationData.nombre }],
                [{ s: { font: { color: { rgb: '5f6368' } }, }, v: this.evaluationData.subtitulo }],
                [], // Añadir una fila en blanco
                ["Nombre", "Respuestas correctas", "Total de preguntas", "Porcentaje"], // Modificado para incluir "Total de preguntas"
                ...formattedResults
            ]);

            // Establecer el estilo de alineación para centrar los datos
            ws['!cols'] = [{ width: 25 }, { width: 20 }, { width: 20 }, { width: 20 }]; // Establecer el ancho de las columnas
            for (let r = 4; r < ws['!ref'].split(':')[1].replace(/[0-9]/g, ''); r++) {
                for (let c = 0; c < 4; c++) { // Modificado para incluir "Total de preguntas"
                    if (!ws[XLSX.utils.encode_cell({ r, c })]) ws[XLSX.utils.encode_cell({ r, c })] = { s: { alignment: { horizontal: "center" } } };
                    else ws[XLSX.utils.encode_cell({ r, c })].s.alignment = { horizontal: "center" };
                }
            }

            // Agregar la hoja de trabajo al libro de trabajo
            XLSX.utils.book_append_sheet(wb, ws, "Resultados");

            // Convertir el libro de trabajo a un archivo Blob
            const blob = new Blob([XLSX.write(wb, { type: "array", bookType: "xlsx" })], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            });

            // Descargar el archivo Blob
            const fileName = `${this.evaluationData.nombre.replace(/\s+/g, '_')}_resultados.xlsx`;
            saveAs(blob, fileName);
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

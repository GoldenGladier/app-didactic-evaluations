<template>
    <div class="mt-3">
        <SortText v-for="(sentence, index) in sentences" :key="index" :index="index" :text="createWordFormatArray(sentence)" 
            @update-response="updateResponse(index, $event)" />

        <b-button type="submit" variant="primary" @click="sendAnswers()"><i class="bi bi-floppy"></i>Guardar</b-button>
    </div>
</template>
  
<script>
import SortText from './SortText.vue';

export default {
    components: {
        SortText, 
    },
    props: {
        sentences: null,
    },
    data() {
        return {
            responses: []
        };
    },
    methods: {
        createWordFormatArray(array) {
            let newArray = []
            array.forEach((word, index) => {
                const item = {
                    name: word, 
                    index: index
                }
                newArray.push(item);
            });
            return newArray;
        },
        updateResponse(index, response) {
            this.$set(this.responses, index, response);
        },
        sendAnswers() {
            
        }
    },
};
</script>

<style scoped>
.custom-span-drag {
    display: block;
    margin: 0.2rem;
    padding: 0.4rem 0.6rem;
    border-radius: 0.4rem;
    border: 1px solid #ccc;
    cursor: pointer;
}
.custom-span-drag:hover {
    background: #f9e1dc;
}  
</style>


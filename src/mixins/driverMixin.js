// driverMixin.js
import { driver as Driver } from "driver.js";

export default {
    data() {
        return {
            driver: null,
        };
    },
    mounted() {
        this.driver = new Driver({
            showProgress: true,
            progressText: '{{current}} de {{total}}',
            nextBtnText: 'Siguiente',
            prevBtnText: 'Anterior', 
            doneBtnText: 'Finalizar'           
        });
    },
    methods: {
        startTour(steps) {
            this.driver.setSteps(steps);
            this.driver.drive();
        },
    },
};

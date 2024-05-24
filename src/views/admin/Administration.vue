<template>
  <b-container class="custom-master-container custom-card-box custom-center-flex">
    <b-overlay :show="isLoading" class="width-100">  
      
        <section class="evaluation-data text-align-center" id="element-to-convert">            
            <h1 class="title-bold-primary"><i class="bi bi-gear-fill" style="font-size: 100%"></i>Administración</h1>
            <h1 class="title-bold">Usuarios</h1>
            <hr class="my-4">     
            <b-container>
                <b-table small bordered striped :items="users" :fields="fields" class="table text-center">
                    <template v-slot:cell(verificado)="row">
                        <b-form-checkbox v-model="row.item.verificado" :disabled="row.item.rol_de_usuario == 'ADMIN'" switch></b-form-checkbox>
                    </template>        
                    <template v-slot:cell(rol_de_usuario)="data">
                        <span>
                            <i class="bi bi-star-fill text-warning" v-if="data.value == 'ADMIN'"></i>
                            <i class="bi bi-person-fill text-secondary" v-else></i>
                        </span>
                        <span>
                            {{ data.value | capitalizeFirstLetter }}
                        </span>                    
                    </template>                            
                </b-table> 
            </b-container>     
        </section>

    </b-overlay>
  </b-container>
</template>

<script>
import AdminService from '@/services/AdminService';

export default {
    name: 'Administration',
    components: {
        
    },
    data() {
        return {
            isLoading: false,     
            users: [],                 
            fields: [
                { key: 'fullname', label: 'Nombre' },
                { key: 'correo', label: 'Correo eléctronico' },
                { key: 'verificado', label: 'Usuario verificado' },
                { key: 'rol_de_usuario', label: 'Rol' }                
            ],   
        }
    },
    methods: {
        init_data() {         
            this.isLoading = true;
            AdminService.getAllUsers()
            .then(response => {
                console.log("Usuarios: ", response);
                this.users = response.map(user => ({
                    ...user,
                    fullname: `${user.nombre} ${user.apellido_paterno} ${user.apellido_materno}`.trim()
                }));                    
            })
            .catch(error => {
                console.error('Error:', error);
            })
            .finally(() => {
                this.isLoading = false 
            })                
        },       
    },
    created() {
        this.init_data();
    },
    filters: {
        capitalizeFirstLetter(value) {
        if (!value) return '';
        return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
        }
    }    
}
</script>

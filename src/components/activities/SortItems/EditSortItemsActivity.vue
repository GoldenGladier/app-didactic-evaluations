<template>
  <b-card class="mb-4">
    <b-button class="help-button" @click="startTutorial"
      v-b-tooltip.hover.top="'Haz clic aquí para recibir un tutorial sobre cómo crear una actividad de ordenar los items.'" >
      <i class="bi bi-question-circle"></i>Ayuda
    </b-button>    

    <b-button @click="removeActivity()" variant="danger" size="sm" class="close-button custom-close-button" v-b-tooltip.hover title="Eliminar actividad" :id="'remove-activity'">
      <b-icon icon="x-lg"></b-icon>
    </b-button>
    <b-form-group :label="'Actividad ' + index" :label-for="'pregunta-' + index" class="mt-1 required-label">
      <div class="d-flex">
        <b-form-input
          :id="'pregunta-' + index"
          v-model="activity.question"
          placeholder="Ingresa la pregunta o instrucciones"
          required
        ></b-form-input>
      </div>
    </b-form-group>

    <b-form-group label="Items" class="mt-2">
      <draggable v-model="activity.items" :group="{ name: 'items', pull: false, put: false }" handle=".drag-handle" :id="'items-list-'+index">
        <transition-group>
          <b-row v-for="(item, itemIndex) in activity.items" :key="itemIndex" class="mb-2">
            <b-col class="custom-center-flex">
              <b-input-group class="mt-3">
                <b-input-group-prepend class="custom-button-prepend">
                  <b-button class="drag-handle" :id="'drag-handle-' + index" variant="info">
                    <i class="bi bi-grip-vertical"></i>
                  </b-button>
                </b-input-group-prepend>
                <b-form-input
                  :id="'item' + index + '-' + itemIndex"
                  v-model="activity.items[itemIndex].texto"
                  :placeholder="'Ingresa el item ' + (itemIndex + 1)"
                  required
                ></b-form-input>
              </b-input-group>
              <b-button @click="removeItem(item.id)" variant="danger" size="sm" class="custom-close-button mt-3" :id="'btn-delete-item-'+index" v-b-tooltip.hover title="Eliminar item">
                <b-icon icon="x-lg"></b-icon>
              </b-button>
            </b-col>
          </b-row>
        </transition-group>
      </draggable>
      <b-button @click="addItem()" variant="primary" size="sm" class="mt-2" :id="'btn-new-item-' + index">
        <i class="bi bi-plus-lg"></i>Agregar Item
      </b-button>
    </b-form-group>
  </b-card>
</template>

<script>
import driverMixin from '@/mixins/driverMixin';
import draggable from 'vuedraggable';
import ActivityService from '@/services/ActivityService';

export default {
  name: "EditSortItemActivity",
  mixins: [driverMixin],
  components: {
    draggable
  },
  props: {
    index: {
      type: Number,
      required: true
    },
    activity: {
      type: Object,
      required: true
    },
    isLoading: {
      type: Boolean,
      required: true
    },
    idEvaluation: null
  },
  methods: {
    addItem() {
      const highestId = this.activity.items.reduce((max, item) => {
          return item.id > max ? item.id : max;
      }, 0);
      const newId = highestId + 1;
      this.activity.items.push({
          texto: '',
          id: newId,
          isNew: true
      });    

      this.updateActivity();
    },
    removeItem(itemIndex) {
      console.log("Quiero eliminar a: ", itemIndex);

      const itemToRemove = this.activity.items.find(item => item.id === itemIndex);
      if (itemToRemove.isNew) {
          this.activity.items = this.activity.items.filter(item => item.id !== itemIndex);
      }      
      else{
        let deleteItemData = {
          idEvaluacion: Number(this.idEvaluation),
          numPregunta: this.activity.idPregunta,
          item: itemIndex
        }
        console.log("Voy a eliminar el item: ", deleteItemData);

        this.$emit('update:isLoading', true);
        ActivityService.deleteDeleteItemByNumItem(deleteItemData)
        .then((response) => {
          console.log("Item eliminado: ", response);
          this.activity.items = this.activity.items.filter(item => item.id !== itemIndex);
          this.$swal({
              icon: 'success',
              title: '¡Éxito!',
              text: 'El item fue eliminado exitosamente.',
          }) 
        })
        .catch((error) => {
          console.error("Ocurrio un error al eliminar el item: ", error);
          this.$swal({
              icon: 'error',
              title: '¡Error!',
              text: 'Ocurrio un error al intentar eliminar el item.',
          });          
        })
        .finally(() => {
          this.$emit('update:isLoading', false);
        })         
      }                 
    },
    removeActivity() {
      this.$emit('remove-activity', this.index);
    },
    updateActivity() {
      this.$emit('update-activity', this.index, this.activity);
    },    
    startTutorial() {
        this.startTour([
            {
                element: '#pregunta-' + this.index,
                popover: {
                    title: 'Ingresar la pregunta o instrucciones',
                    description: 'Ingresa la pregunta o las instrucciones de la actividad en el campo correspondiente.',
                    position: 'top',
                },
            },
            {
                element: '#items-list-' + this.index,
                popover: {
                    title: 'Ingresar texto en un item',
                    description: 'Simplemente escribe el texto que deseas para cada item en el campo correspondiente.',
                    position: 'top',
                },
            },     
            {
                element: '#btn-new-item-' + this.index,
                popover: {
                    title: 'Agregar nuevo item',
                    description: 'Haz clic en el botón de agregar item con un icono de "+" para añadir un nuevo item a la lista. Un nuevo campo de entrada aparecerá donde podrás escribir el texto del nuevo item.',
                    position: 'top',
                },
            }, 
            {
            element: '#drag-handle-' + this.index,
                popover: {
                    title: 'Reordenar items',
                    description: 'Para reordenar los items, haz clic y arrastra este botón (<i class="bi bi-grip-vertical nm"></i>) para mover el item a la posición deseada dentro de la misma actividad.',
                    position: 'top',
                },
            },
            {
                element: '#btn-delete-item-' + this.index,
                popover: {
                    title: 'Eliminar un item',
                    description: 'Haz clic en este botón (<i class="bi bi-x-lg nm"></i>) si deseas eliminar ese item específico de la lista.',
                    position: 'top',
                },
            },                                                                             
        ]);
    },    
  },
};
</script>

<style scoped>
.custom-close-button {
  margin-left: 10px;
}

.drag-handle {
  cursor: move;
}

.custom-button-prepend button {
  padding: 0 0.5rem;
}

.custom-button-prepend button i {
  margin: 0;
}

.prepend-no-style button {
  background: #E9ECEF;
  border-color: #ccc;
  color: #5f6368;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
}

.help-button {
  position: absolute;
  top: 0px;
  left: 10px;
}
</style>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useDataStore } from '../../stores/data'
import type { Category } from '../../core/interfaces'
import ConfirmDialog from '../../components/common/ConfirmDialog.vue'

const dataStore = useDataStore()
const confirmDialog = ref()

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Nombre', key: 'name' },
  { title: 'Descripción', key: 'description' },
  { title: 'Acciones', key: 'actions', sortable: false },
]

onMounted(async () => {
  await dataStore.fetchCategories()
})

async function deleteItem(item: Category) {
  if (await confirmDialog.value.open('Eliminar Categoría', '¿Estás seguro? Esta acción no se puede deshacer.')) {
     // await dataStore.deleteCategory(item.id)
     // Aquí mostraríamos un snackbar en vez de alert, pero por ahora solo evitamos el alert.
     console.log('Borrado simulado')
  }
}
</script>

<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1 class="text-h4">Categorías</h1>
      <v-btn color="primary" to="/admin/categories/create" prepend-icon="mdi-plus">Nueva Categoría</v-btn>
    </div>

    <v-data-table
      :headers="headers"
      :items="dataStore.categories"
      :loading="dataStore.loading"
      class="elevation-1"
    >
      <template v-slot:item.actions="{ item }">
        <v-icon size="small" class="me-2" @click="$router.push(`/admin/categories/edit/${item.id}`)">
          mdi-pencil
        </v-icon>
         <v-icon size="small" color="error" @click="deleteItem(item)">
          mdi-delete
        </v-icon>
      </template>
    </v-data-table>
    
    <ConfirmDialog ref="confirmDialog" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useDataStore } from '../../stores/data'
import type { Product } from '../../core/interfaces'
import ConfirmDialog from '../../components/common/ConfirmDialog.vue'

const dataStore = useDataStore()
const confirmDialog = ref() // Template ref

const headers = [
  { title: 'ID', key: 'id' },
  { title: 'Imagen', key: 'image' },
  { title: 'Nombre', key: 'name' },
  { title: 'Precio', key: 'price' },
  { title: 'Stock', key: 'stock' },
  { title: 'Acciones', key: 'actions', sortable: false },
]

onMounted(async () => {
  await dataStore.fetchProducts()
})

async function deleteItem(item: Product) {
  if (await confirmDialog.value.open('Eliminar Producto', '¿Estás seguro de que quieres eliminar este producto?')) {
    await dataStore.deleteProduct(item.id)
  }
}
</script>

<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1 class="text-h4">Productos</h1>
      <v-btn color="primary" to="/admin/products/create" prepend-icon="mdi-plus">Nuevo Producto</v-btn>
    </div>

    <v-data-table
      :headers="headers"
      :items="dataStore.products"
      :loading="dataStore.loading"
      class="elevation-1"
    >
      <template v-slot:item.image="{ item }">
        <v-img :src="item.image" width="50" height="50" cover class="bg-grey-lighten-2 rounded"></v-img>
      </template>

      <template v-slot:item.price="{ item }">
        {{ item.price }} €
      </template>

      <template v-slot:item.actions="{ item }">
        <v-icon size="small" class="me-2" @click="$router.push(`/admin/products/edit/${item.id}`)">
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

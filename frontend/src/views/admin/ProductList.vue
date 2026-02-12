<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useProductStore } from '../../stores/products'
import type { Product } from '../../core/interfaces'
import ProductItem from './components/ProductItem.vue'
import ConfirmDialog from '../../components/common/ConfirmDialog.vue'

const productStore = useProductStore()
const confirmDialog = ref() // Template ref

onMounted(async () => {
  await productStore.fetchProducts()
})

async function deleteItem(item: Product) {
  if (await confirmDialog.value.open('Eliminar Producto', '¿Estás seguro de que quieres eliminar este producto?')) {
    await productStore.deleteProduct(item.id)
  }
}
</script>

<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1 class="text-h4">Productos</h1>
      <v-btn color="primary" to="/admin/products/create" prepend-icon="mdi-plus">Nuevo Producto</v-btn>
    </div>

    <v-row v-if="productStore.loading">
        <v-col cols="12" class="text-center">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-col>
    </v-row>

    <v-row v-else>
        <v-col
            v-for="product in productStore.products"
            :key="product.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
        >
            <ProductItem
                :product="product"
                @edit="$router.push(`/admin/products/edit/${$event}`)"
                @delete="deleteItem"
            />
        </v-col>
    </v-row>
    
    <v-alert v-if="!productStore.loading && productStore.products.length === 0" type="info" class="mt-4">
        No hay productos registrados.
    </v-alert>

    <ConfirmDialog ref="confirmDialog" />
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useDataStore } from '../../stores/data'

const dataStore = useDataStore()

onMounted(async () => {
    await dataStore.fetchProducts()
    await dataStore.fetchCategories()
})
</script>

<template>
  <div>
    <h1 class="text-h4 mb-4">Dashboard</h1>
    <v-row>
      <v-col cols="12" md="6">
        <v-card color="primary" theme="dark">
            <v-card-title class="text-h5">Productos Totales</v-card-title>
            <v-card-text class="text-h2 text-center py-4">
                {{ dataStore.products.length }}
            </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card color="secondary" theme="dark">
            <v-card-title class="text-h5">Categorías</v-card-title>
            <v-card-text class="text-h2 text-center py-4">
                {{ dataStore.categories.length }}
            </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

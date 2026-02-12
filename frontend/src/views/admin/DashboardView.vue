<script setup lang="ts">
import { onMounted } from 'vue'
import { useProductStore } from '../../stores/products'
import { useCategoryStore } from '../../stores/categories'
import { useI18n } from 'vue-i18n'

const productStore = useProductStore()
const categoryStore = useCategoryStore()
const { t } = useI18n()

onMounted(async () => {
    await productStore.fetchProducts()
    await categoryStore.fetchCategories()
})
</script>

<template>
  <div>
    <h1 class="text-h4 mb-4">{{ t('nav.dashboard') }}</h1>
    <v-row>
      <v-col cols="12" md="6">
        <v-card color="primary" theme="dark">
            <v-card-title class="text-h5">{{ t('dashboard.totalProducts') }}</v-card-title>
            <v-card-text class="text-h2 text-center py-4">
                {{ productStore.products.length }}
            </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card color="secondary" theme="dark">
            <v-card-title class="text-h5">{{ t('dashboard.totalCategories') }}</v-card-title>
            <v-card-text class="text-h2 text-center py-4">
                {{ categoryStore.categories.length }}
            </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

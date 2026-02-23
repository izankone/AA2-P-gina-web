<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useCategoryStore } from '../../stores/categories'
import { useNotificationStore } from '../../stores/notification'
import type { Category } from '../../core/interfaces'
import CategoryItem from './components/CategoryItem.vue'
import ConfirmDialog from '../../components/common/ConfirmDialog.vue'

const categoryStore = useCategoryStore()
const notificationStore = useNotificationStore()
const confirmDialog = ref()

onMounted(async () => {
  await categoryStore.fetchCategories()
})

async function deleteItem(item: Category) {
  if (await confirmDialog.value.open('Eliminar Categoría', '¿Estás seguro? Esta acción no se puede deshacer.')) {
     await categoryStore.deleteCategory(item.id)
     notificationStore.success('Categoría eliminada ✓')
  }
}
</script>

<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1 class="text-h4">Categorías</h1>
      <v-btn color="primary" to="/admin/categories/create" prepend-icon="mdi-plus">Nueva Categoría</v-btn>
    </div>

    <v-row v-if="categoryStore.loading">
        <v-col cols="12" class="text-center">
            <v-progress-circular indeterminate color="primary"></v-progress-circular>
        </v-col>
    </v-row>

    <v-row v-else>
        <v-col
            v-for="category in categoryStore.categories"
            :key="category.id"
            cols="12"
            sm="6"
            md="4"
            lg="3"
        >
            <CategoryItem
                :category="category"
                @edit="$router.push(`/admin/categories/edit/${$event}`)"
                @delete="deleteItem"
            />
        </v-col>
    </v-row>
    
    <v-alert v-if="!categoryStore.loading && categoryStore.categories.length === 0" type="info" class="mt-4">
        No hay categorías registradas.
    </v-alert>
    
    <ConfirmDialog ref="confirmDialog" />
  </div>
</template>

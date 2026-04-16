<script setup lang="ts">
import { onMounted } from 'vue'
import { useProductStore } from '../../stores/products'
import { useCategoryStore } from '../../stores/categories'
import { useOrderStore } from '../../stores/orders'
import { useAuthStore } from '../../stores/auth'
import { useI18n } from 'vue-i18n'

const productStore = useProductStore()
const categoryStore = useCategoryStore()
const orderStore = useOrderStore()
const authStore = useAuthStore()
const { t } = useI18n()

onMounted(async () => {
    if (authStore.isAdmin) {
        await productStore.fetchProducts()
        await categoryStore.fetchCategories()
    } else if (authStore.user) {
        await orderStore.fetchMyOrders(authStore.user.id)
    }
})
</script>

<template>
  <div>
    <h1 class="text-h4 mb-4">{{ t('nav.dashboard') }}</h1>
    
    <!-- DASHBOARD ADMIN -->
    <v-row v-if="authStore.isAdmin">
      <v-col cols="12" md="6">
        <v-card color="primary" theme="dark" elevation="4">
            <v-card-title class="text-h5">{{ t('dashboard.totalProducts') }}</v-card-title>
            <v-card-text class="text-h2 text-center py-4">
                {{ productStore.products.length }}
            </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card color="secondary" theme="dark" elevation="4">
            <v-card-title class="text-h5">{{ t('dashboard.totalCategories') }}</v-card-title>
            <v-card-text class="text-h2 text-center py-4">
                {{ categoryStore.categories.length }}
            </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <!-- DASHBOARD USUARIO NORMAL (Izan/Maria) -->
    <v-row v-else>
      <v-col cols="12" md="6">
        <v-card color="info" theme="dark" elevation="4" to="/my-orders">
            <v-card-title class="text-h5">🛒 Mis Pedidos Totales</v-card-title>
            <v-card-text class="text-h2 text-center py-4">
                {{ orderStore.orders.length }}
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn variant="text" to="/my-orders">Ver historial completo</v-btn>
            </v-card-actions>
        </v-card>
      </v-col>
      <v-col cols="12" md="6">
        <v-card color="success" theme="dark" elevation="4">
            <v-card-title class="text-h5">🏆 Estatus Premium</v-card-title>
            <v-card-text class="text-h4 text-center py-4">
                Usuario Activo
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn variant="text" to="/">Ir a comprar</v-btn>
            </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

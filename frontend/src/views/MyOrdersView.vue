<script setup lang="ts">
import { onMounted } from 'vue'
import { useOrderStore } from '../stores/orders'
import { useAuthStore } from '../stores/auth'
import { useI18n } from 'vue-i18n'

const orderStore = useOrderStore()
const authStore = useAuthStore()
const { t } = useI18n()

onMounted(async () => {
  if (authStore.user) {
    await orderStore.fetchMyOrders(authStore.user.id)
  }
})

const statusColor: Record<string, string> = {
  pendiente: 'warning',
  enviado: 'info',
  entregado: 'success'
}
</script>

<template>
  <v-container>
    <div class="d-flex align-center justify-space-between mb-6">
      <h1 class="text-h4 font-weight-bold">{{ t('orders.myOrders') }}</h1>
      <v-btn color="primary" variant="outlined" to="/" prepend-icon="mdi-arrow-left">
        Seguir Comprando
      </v-btn>
    </div>

    <v-row v-if="orderStore.loading">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col
        v-for="order in orderStore.orders"
        :key="order.id"
        cols="12"
        md="6"
        lg="4"
      >
        <v-card elevation="2">
          <v-card-title class="d-flex justify-space-between align-center">
            <span>{{ t('orders.fields.product') }} #{{ order.id }}</span>
            <v-chip :color="statusColor[order.status]" size="small">
              {{ t(`orders.status.${order.status}`) }}
            </v-chip>
          </v-card-title>
          <v-card-text>
            <div class="mb-1">
              <v-icon size="small" class="mr-1">mdi-package-variant</v-icon>
              <strong>{{ order.productName }}</strong>
            </div>
            <div class="mb-1">
              <v-icon size="small" class="mr-1">mdi-counter</v-icon>
              {{ t('orders.fields.quantity') }}: {{ order.quantity }}
            </div>
            <div class="mb-1">
              <v-icon size="small" class="mr-1">mdi-currency-eur</v-icon>
              {{ t('orders.fields.total') }}: {{ order.total }} €
            </div>
            <div class="text-caption text-medium-emphasis mt-2">
              <v-icon size="small" class="mr-1">mdi-calendar</v-icon>
              {{ new Date(order.createdAt).toLocaleDateString(locale) }}
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>

    <v-alert
      v-if="!orderStore.loading && orderStore.orders.length === 0"
      type="info"
      class="mt-4"
    >
      {{ t('orders.noMyOrders') }}
    </v-alert>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useOrderStore } from '../../stores/orders'
import { useNotificationStore } from '../../stores/notification'
import { useI18n } from 'vue-i18n'

const orderStore = useOrderStore()
const notificationStore = useNotificationStore()
const { t } = useI18n()

onMounted(async () => {
  await orderStore.fetchOrders()
})

const statusColor: Record<string, string> = {
  pendiente: 'warning',
  enviado: 'info',
  entregado: 'success'
}

async function changeStatus(id: number, status: 'pendiente' | 'enviado' | 'entregado') {
  await orderStore.updateOrderStatus(id, status)
  notificationStore.success(t('orders.statusUpdated') + ' ✓')
}

async function deleteOrder(id: number) {
  await orderStore.deleteOrder(id)
  notificationStore.success(t('orders.deleted') + ' ✓')
}
</script>

<template>
  <div>
    <div class="d-flex justify-space-between align-center mb-4">
      <h1 class="text-h4">{{ t('orders.title') }}</h1>
    </div>

    <v-row v-if="orderStore.loading">
      <v-col cols="12" class="text-center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-col>
    </v-row>

    <v-table v-else>
      <thead>
        <tr>
          <th>{{ t('orders.fields.id') }}</th>
          <th>{{ t('orders.fields.userId') }}</th>
          <th>{{ t('orders.fields.product') }}</th>
          <th>{{ t('orders.fields.quantity') }}</th>
          <th>{{ t('orders.fields.total') }}</th>
          <th>{{ t('orders.fields.status') }}</th>
          <th>{{ t('orders.fields.date') }}</th>
          <th>{{ t('common.actions') }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="order in orderStore.orders" :key="order.id">
          <td>{{ order.id }}</td>
          <td>{{ order.userId }}</td>
          <td>{{ order.productName }}</td>
          <td>{{ order.quantity }}</td>
          <td>{{ order.total }} €</td>
          <td>
            <v-chip :color="statusColor[order.status]" size="small">
              {{ t(`orders.status.${order.status}`) }}
            </v-chip>
          </td>
          <td>{{ new Date(order.createdAt).toLocaleDateString(locale) }}</td>
          <td>
            <v-menu>
              <template #activator="{ props }">
                <v-btn icon="mdi-pencil" size="small" variant="text" v-bind="props"></v-btn>
              </template>
              <v-list>
                <v-list-item
                  v-for="estado in ['pendiente', 'enviado', 'entregado']"
                  :key="estado"
                  :title="t(`orders.status.${estado}`)"
                  @click="changeStatus(order.id, estado as 'pendiente' | 'enviado' | 'entregado')"
                />
              </v-list>
            </v-menu>
            <v-btn
              icon="mdi-delete"
              size="small"
              variant="text"
              color="error"
              @click="deleteOrder(order.id)"
            ></v-btn>
          </td>
        </tr>
      </tbody>
    </v-table>

    <v-alert
      v-if="!orderStore.loading && orderStore.orders.length === 0"
      type="info"
      class="mt-4"
    >
      {{ t('orders.noOrders') }}
    </v-alert>
  </div>
</template>

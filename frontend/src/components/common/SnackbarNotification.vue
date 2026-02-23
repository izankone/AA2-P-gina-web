<script setup lang="ts">
import { useNotificationStore } from '../../stores/notification'

const notificationStore = useNotificationStore()
</script>

<template>
  <v-snackbar
    v-model="notificationStore.show"
    :timeout="notificationStore.timeout"
    :color="notificationStore.type"
    location="top"
    rounded="pill"
  >
    <div class="d-flex align-center">
      <v-icon
        class="mr-2"
        :icon="notificationStore.type === 'success' ? 'mdi-check-circle' :
               notificationStore.type === 'error' ? 'mdi-alert-circle' :
               notificationStore.type === 'warning' ? 'mdi-alert' : 'mdi-information'"
      />
      {{ notificationStore.message }}
    </div>

    <template #actions>
      <v-btn variant="text" icon="mdi-close" size="small" @click="notificationStore.close()" />
    </template>
  </v-snackbar>
</template>

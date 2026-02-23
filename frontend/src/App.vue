<script setup lang="ts">
import { onMounted } from 'vue'
import { useThemeStore } from './stores/theme'
import SnackbarNotification from './components/common/SnackbarNotification.vue'

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.initTheme()
})
</script>

<template>
  <router-view />
  <SnackbarNotification />
</template>

<style>
/* Global styles */
html, body {
  overflow-y: auto !important; /* Vuetify scroll fix */
}
</style>

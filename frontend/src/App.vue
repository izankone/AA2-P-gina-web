<script setup lang="ts">
import { onMounted } from 'vue'
import { useThemeStore } from './stores/theme'

const themeStore = useThemeStore()

onMounted(() => {
  themeStore.initTheme()
})
</script>

<template>
  <router-view />
</template>

<style>
/* Global styles */
html, body {
  overflow-y: auto !important; /* Vuetify scroll fix */
}
</style>

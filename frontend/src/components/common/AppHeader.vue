
<script setup lang="ts">
import { useTheme } from 'vuetify'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'

const theme = useTheme()
const router = useRouter()
const authStore = useAuthStore()

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}

function handleAuthAction() {
  if (authStore.isAuthenticated) {
    router.push('/admin')
  } else {
    router.push('/login')
  }
}
</script>

<template>
  <v-app-bar elevation="1">
    <v-app-bar-title class="cursor-pointer" @click="router.push('/')">
      TechShop
    </v-app-bar-title>

    <template v-slot:append>
      <v-btn icon="mdi-theme-light-dark" @click="toggleTheme"></v-btn>
      
      <v-btn 
        :prepend-icon="authStore.isAuthenticated ? 'mdi-account-circle' : 'mdi-login'"
        variant="text" 
        @click="handleAuthAction"
      >
        {{ authStore.isAuthenticated ? 'Panel' : 'Login' }}
      </v-btn>
    </template>
  </v-app-bar>
</template>

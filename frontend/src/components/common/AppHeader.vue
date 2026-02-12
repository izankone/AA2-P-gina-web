
<script setup lang="ts">
import { useTheme } from 'vuetify'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { useI18n } from 'vue-i18n'

const theme = useTheme()
const router = useRouter()
const authStore = useAuthStore()
const { t, locale } = useI18n()

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

function changeLocale(lang: string) {
    locale.value = lang
}
</script>

<template>
  <v-app-bar elevation="1">
    <v-app-bar-title class="cursor-pointer" @click="router.push('/')">
      TechShop
    </v-app-bar-title>

    <template v-slot:append>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon="mdi-translate"></v-btn>
        </template>
        <v-list>
          <v-list-item @click="changeLocale('es')" value="es">
            <v-list-item-title>Español</v-list-item-title>
          </v-list-item>
           <v-list-item @click="changeLocale('en')" value="en">
            <v-list-item-title>English</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>

      <v-btn icon="mdi-theme-light-dark" @click="toggleTheme"></v-btn>
      
      <v-btn 
        :prepend-icon="authStore.isAuthenticated ? 'mdi-account-circle' : 'mdi-login'"
        variant="text" 
        @click="handleAuthAction"
      >
        {{ authStore.isAuthenticated ? t('auth.panel') : t('auth.login') }}
      </v-btn>
    </template>
  </v-app-bar>
</template>

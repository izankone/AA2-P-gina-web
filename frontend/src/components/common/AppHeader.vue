
<script setup lang="ts">
import { useThemeStore } from '../../stores/theme'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth'
import { useI18n } from 'vue-i18n'

const themeStore = useThemeStore()
const router = useRouter()
const authStore = useAuthStore()
const { t, locale } = useI18n()

function setTheme(themeName: string) {
  themeStore.setTheme(themeName)
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

      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn v-bind="props" icon="mdi-palette"></v-btn>
        </template>
        <v-list>
          <v-list-item @click="setTheme('light')" value="light">
            <template v-slot:prepend>
              <v-icon icon="mdi-white-balance-sunny"></v-icon>
            </template>
            <v-list-item-title>Claro</v-list-item-title>
          </v-list-item>
          <v-list-item @click="setTheme('dark')" value="dark">
            <template v-slot:prepend>
              <v-icon icon="mdi-weather-night"></v-icon>
            </template>
            <v-list-item-title>Oscuro</v-list-item-title>
          </v-list-item>
          <v-list-item @click="setTheme('blueTheme')" value="blueTheme">
            <template v-slot:prepend>
              <v-icon icon="mdi-water" color="blue"></v-icon>
            </template>
            <v-list-item-title>Azul</v-list-item-title>
          </v-list-item>
          <v-list-item @click="setTheme('greenTheme')" value="greenTheme">
            <template v-slot:prepend>
              <v-icon icon="mdi-leaf" color="green"></v-icon>
            </template>
            <v-list-item-title>Verde</v-list-item-title>
          </v-list-item>
          <v-list-item @click="setTheme('purpleTheme')" value="purpleTheme">
            <template v-slot:prepend>
              <v-icon icon="mdi-circle-slice-8" color="purple"></v-icon>
            </template>
            <v-list-item-title>Alto Contraste</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      
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

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import AppFooter from '../components/common/AppFooter.vue'
import { useI18n } from 'vue-i18n'

const drawer = ref(true)
const authStore = useAuthStore()
const router = useRouter()
const route = useRoute()

const { t } = useI18n()
import { useThemeStore } from '../stores/theme'
const themeStore = useThemeStore()

function setTheme(themeName: string) {
  themeStore.setTheme(themeName)
}

function logout() {
  authStore.logout()
  router.push('/login')
}

const items = computed(() => [
  { title: t('nav.dashboard'), icon: 'mdi-view-dashboard', to: '/admin' },
  { title: t('nav.products'), icon: 'mdi-package-variant', to: '/admin/products' },
  { title: t('nav.categories'), icon: 'mdi-shape', to: '/admin/categories' },
])

const pageTitle = computed(() => {
    switch (route.path) {
        case '/admin': return t('nav.dashboard')
        case '/admin/products': return t('nav.products')
        case '/admin/categories': return t('nav.categories')
        default: return t('nav.admin')
    }
})
</script>

<template>
  <v-app>
    <v-navigation-drawer v-model="drawer">
        <v-list-item title="Tienda Admin" subtitle="Panel de Control"></v-list-item>
        <v-divider></v-divider>
        <v-list density="compact" nav>
          <v-list-item 
            v-for="item in items" 
            :key="item.title" 
            :to="item.to" 
            :prepend-icon="item.icon" 
            :title="item.title" 
            value="item.title"
          ></v-list-item>
        </v-list>
        
        <template v-slot:append>
          <div class="pa-2">
            <v-btn block color="error" @click="logout" prepend-icon="mdi-logout">
              Cerrar Sesión
            </v-btn>
          </div>
        </template>
    </v-navigation-drawer>

    <v-app-bar :title="pageTitle" @click:nav-icon="drawer = !drawer">
      <template v-slot:append>
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
      </template>
    </v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
    <AppFooter /> 
  </v-app>
</template>

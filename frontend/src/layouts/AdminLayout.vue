<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const drawer = ref(true)
const authStore = useAuthStore()
const router = useRouter()

function logout() {
  authStore.logout()
  router.push('/login')
}

const items = [
  { title: 'Dashboard', icon: 'mdi-view-dashboard', to: '/admin' },
  { title: 'Productos', icon: 'mdi-package-variant', to: '/admin/products' },
  { title: 'Categorías', icon: 'mdi-shape', to: '/admin/categories' },
]
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

    <v-app-bar title="Administración" @click:nav-icon="drawer = !drawer"></v-app-bar>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { useTheme } from 'vuetify'

const theme = useTheme()

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>

<template>
  <v-container class="fill-height d-flex flex-column align-center justify-center">
    <h1 class="text-h2 font-weight-bold mb-4 text-primary">Tienda de Electrónica</h1>
    <p class="text-body-1 mb-8">Bienvenido a la mejor tienda de tecnología.</p>
    
    <div class="d-flex gap-4">
      <v-btn color="primary" to="/login" size="large" prepend-icon="mdi-login">
        Iniciar Sesión
      </v-btn>
      <v-btn variant="outlined" @click="toggleTheme" size="large" prepend-icon="mdi-theme-light-dark">
        Cambiar Tema
      </v-btn>
    </div>
  </v-container>
</template>

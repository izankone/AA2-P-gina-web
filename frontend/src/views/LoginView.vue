<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'

const email = ref('admin@test.com')
const password = ref('admin')
const authStore = useAuthStore()
const router = useRouter()
const error = ref(false)

async function handleLogin() {
  const success = await authStore.login(email.value, password.value)
  if (success) {
    router.push('/admin')
  } else {
    error.value = true
  }
}
</script>

<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card width="400" class="pa-4">
      <v-card-title class="text-center">Iniciar Sesión</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleLogin">
          <v-text-field
            v-model="email"
            label="Email"
            prepend-inner-icon="mdi-email"
            type="email"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            label="Contraseña"
            prepend-inner-icon="mdi-lock"
            type="password"
            required
          ></v-text-field>
          <v-alert v-if="error" type="error" class="mb-4">
            Credenciales incorrectas
          </v-alert>
          <v-btn type="submit" block color="primary" class="mt-2">Entrar</v-btn>
        </v-form>
      </v-card-text>
      <v-card-actions>
         <v-btn variant="text" block to="/">Volver al Inicio</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

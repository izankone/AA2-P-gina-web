<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useI18n } from 'vue-i18n'

const email = ref('admin@test.com')
const password = ref('admin')
const authStore = useAuthStore()
const router = useRouter()
const error = ref(false)
const { t } = useI18n()

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
      <v-card-title class="text-center">{{ t('auth.loginTitle') }}</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleLogin">
          <v-text-field
            v-model="email"
            :label="t('auth.email')"
            prepend-inner-icon="mdi-email"
            type="email"
            required
          ></v-text-field>
          <v-text-field
            v-model="password"
            :label="t('auth.password')"
            prepend-inner-icon="mdi-lock"
            type="password"
            required
          ></v-text-field>
          <v-alert v-if="error" type="error" class="mb-4">
            Credenciales incorrectas
          </v-alert>
          <v-btn type="submit" block color="primary" class="mt-2">{{ t('auth.login') }}</v-btn>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-center flex-column">
         <v-btn variant="text" to="/register">{{ t('auth.noAccount') }}</v-btn>
         <v-btn variant="text" to="/">{{ t('auth.backHome') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>


<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import { useField, useForm } from 'vee-validate'
import * as yup from 'yup'
import { useI18n } from 'vue-i18n'

const authStore = useAuthStore()
const router = useRouter()
const error = ref(false)
const { t } = useI18n()

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().required().email(),
  password: yup.string().required().min(6)
})

const { handleSubmit } = useForm({ validationSchema: schema })

const { value: name, errorMessage: nameError } = useField('name')
const { value: email, errorMessage: emailError } = useField('email')
const { value: password, errorMessage: passwordError } = useField('password')

const handleRegister = handleSubmit(async (values) => {
  const success = await authStore.register(values as any)
  if (success) {
    router.push('/admin')
  } else {
    error.value = true
  }
})
</script>

<template>
  <v-container class="fill-height d-flex align-center justify-center">
    <v-card width="400" class="pa-4">
      <v-card-title class="text-center">{{ t('auth.registerTitle') }}</v-card-title>
      <v-card-text>
        <v-form @submit.prevent="handleRegister">
           <v-text-field
            v-model="name"
            :error-messages="nameError"
            :label="t('auth.name')"
            prepend-inner-icon="mdi-account"
            required
          ></v-text-field>

          <v-text-field
            v-model="email"
            :error-messages="emailError"
            :label="t('auth.email')"
            prepend-inner-icon="mdi-email"
            type="email"
            required
          ></v-text-field>

          <v-text-field
            v-model="password"
            :error-messages="passwordError"
            :label="t('auth.password')"
            prepend-inner-icon="mdi-lock"
            type="password"
            required
          ></v-text-field>

          <v-alert v-if="error" type="error" class="mb-4">
            Error al registrarse
          </v-alert>

          <v-btn type="submit" block color="primary" class="mt-2">{{ t('auth.register') }}</v-btn>
        </v-form>
      </v-card-text>
      <v-card-actions class="d-flex justify-center flex-column">
         <v-btn variant="text" to="/login">{{ t('auth.hasAccount') }}</v-btn>
         <v-btn variant="text" to="/">{{ t('auth.backHome') }}</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

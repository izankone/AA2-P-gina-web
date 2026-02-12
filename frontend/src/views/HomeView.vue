<script setup lang="ts">
import { useTheme } from 'vuetify'
import { useI18n } from 'vue-i18n'

const theme = useTheme()
const { t } = useI18n()

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>

<template>
  <v-container class="fill-height d-flex flex-column align-center justify-center">
    <h1 class="text-h2 font-weight-bold mb-4 text-primary">{{ t('home.title') }}</h1>
    <p class="text-body-1 mb-8">{{ t('home.subtitle') }}</p>
    
    <div class="d-flex gap-4">
      <v-btn color="primary" to="/login" size="large" prepend-icon="mdi-login">
        {{ t('home.loginBtn') }}
      </v-btn>
      <v-btn variant="outlined" @click="toggleTheme" size="large" prepend-icon="mdi-theme-light-dark">
        {{ t('home.toggleTheme') }}
      </v-btn>
    </div>
  </v-container>
</template>

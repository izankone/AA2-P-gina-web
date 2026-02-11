<script setup lang="ts">
import { ref } from 'vue'

const dialog = ref(false)
const title = ref('')
const message = ref('')
let resolvePromise: (value: boolean) => void

function open(t: string, m: string) {
  title.value = t
  message.value = m
  dialog.value = true
  return new Promise<boolean>((resolve) => {
    resolvePromise = resolve
  })
}

function confirm() {
  dialog.value = false
  resolvePromise(true)
}

function cancel() {
  dialog.value = false
  resolvePromise(false)
}

defineExpose({ open })
</script>

<template>
  <v-dialog v-model="dialog" max-width="400">
    <v-card>
      <v-card-title class="text-h5">{{ title }}</v-card-title>
      <v-card-text>{{ message }}</v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="grey-darken-1" variant="text" @click="cancel">Cancelar</v-btn>
        <v-btn color="primary" variant="text" @click="confirm">Aceptar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

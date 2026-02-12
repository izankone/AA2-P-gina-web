
<script setup lang="ts">
import type { Category } from '../../../core/interfaces'

defineProps<{
  category: Category
}>()

defineEmits<{
  (e: 'edit', id: number): void
  (e: 'delete', category: Category): void
}>()
</script>

<template>
  <v-card class="h-100">
    <v-card-title>{{ category.name }}</v-card-title>
    <v-card-text>
      {{ category.description }}
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        icon="mdi-pencil"
        variant="text"
        color="primary"
        @click="$emit('edit', category.id)"
      ></v-btn>
      <v-btn
        icon="mdi-delete"
        variant="text"
        color="error"
        @click="$emit('delete', category)"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

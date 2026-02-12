
<script setup lang="ts">
import type { Product } from '../../../core/interfaces'

defineProps<{
  product: Product
}>()

defineEmits<{
  (e: 'edit', id: number): void
  (e: 'delete', product: Product): void
}>()
</script>

<template>
  <v-card class="h-100">
    <v-img
      :src="product.image"
      height="200"
      cover
      class="bg-grey-lighten-2"
    >
      <template v-slot:placeholder>
        <v-row class="fill-height ma-0" align="center" justify="center">
          <v-progress-circular indeterminate color="grey-lighten-5"></v-progress-circular>
        </v-row>
      </template>
    </v-img>
    
    <v-card-title>{{ product.name }}</v-card-title>
    <v-card-subtitle class="text-primary font-weight-bold text-h6">
      {{ product.price }} €
    </v-card-subtitle>
    
    <v-card-text>
      <div>Stock: {{ product.stock }}</div>
    </v-card-text>

    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn
        icon="mdi-pencil"
        variant="text"
        color="primary"
        @click="$emit('edit', product.id)"
      ></v-btn>
      <v-btn
        icon="mdi-delete"
        variant="text"
        color="error"
        @click="$emit('delete', product)"
      ></v-btn>
    </v-card-actions>
  </v-card>
</template>

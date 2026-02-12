
<template>
  <v-footer class="bg-grey-lighten-4 text-center d-flex flex-column" elevation="0">
    <div class="pt-2">
      <v-btn icon="mdi-facebook" variant="text"></v-btn>
      <v-btn icon="mdi-twitter" variant="text"></v-btn>
      <v-btn icon="mdi-instagram" variant="text"></v-btn>
    </div>

    <v-divider></v-divider>

    <div class="px-4 py-2 text-center w-100">
      {{ new Date().getFullYear() }} — <strong>TechShop</strong>
    </div>
  </v-footer>
</template>

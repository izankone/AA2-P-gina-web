<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useTheme } from 'vuetify'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '../stores/auth'
import { useProductStore } from '../stores/products'
import { useOrderStore } from '../stores/orders'

const theme = useTheme()
const { t } = useI18n()
const authStore = useAuthStore()
const productStore = useProductStore()
const orderStore = useOrderStore()

const showSuccess = ref(false)

onMounted(async () => {
  await productStore.fetchProducts()
})

async function buyProduct(product: any) {
  if (!authStore.user) return
  
  const success = await orderStore.createOrder({
    userId: authStore.user.id,
    productId: product.id,
    productName: product.name,
    quantity: 1,
    total: product.price,
    status: 'pendiente',
    createdAt: new Date().toISOString()
  })

  if (success) {
    showSuccess.value = true
  }
}

function toggleTheme() {
  theme.global.name.value = theme.global.current.value.dark ? 'light' : 'dark'
}
</script>

<template>
  <v-container :class="{ 'fill-height': !authStore.isAuthenticated }">
    <!-- Snackbar de Éxito -->
    <v-snackbar v-model="showSuccess" color="success" timeout="3000" location="top">
      <v-icon icon="mdi-check-circle" class="mr-2"></v-icon>
      ¡Pedido realizado! Has comprado un producto con éxito.
      <template v-slot:actions>
        <v-btn variant="text" @click="showSuccess = false">Cerrar</v-btn>
      </template>
    </v-snackbar>
    <!-- Hero Section -->
    <v-row align="center" justify="center" class="text-center mb-10 mt-5">
      <v-col cols="12">
        <h1 class="text-h2 font-weight-bold mb-4 text-primary">
          {{ authStore.isAuthenticated ? `¡Hola, ${authStore.user?.name}!` : t('home.title') }}
        </h1>
        <p class="text-body-1 mb-6">{{ t('home.subtitle') }}</p>
        
        <div v-if="!authStore.isAuthenticated" class="d-flex justify-center gap-4">
          <v-btn color="primary" to="/login" size="large" prepend-icon="mdi-login">
            {{ t('home.loginBtn') }}
          </v-btn>
          <v-btn variant="outlined" @click="toggleTheme" size="large" prepend-icon="mdi-theme-light-dark">
            {{ t('home.toggleTheme') }}
          </v-btn>
        </div>
      </v-col>
    </v-row>

    <!-- Products Catalog (Solo para logueados) -->
    <div v-if="authStore.isAuthenticated">
      <div class="d-flex align-center mb-6">
        <h2 class="text-h4 font-weight-bold">{{ t('products.title') }}</h2>
        <v-divider class="ml-4"></v-divider>
      </div>

      <v-row v-if="productStore.loading">
        <v-col v-for="n in 4" :key="n" cols="12" sm="6" md="4" lg="3">
          <v-skeleton-loader type="card"></v-skeleton-loader>
        </v-col>
      </v-row>

      <v-row v-else>
        <v-col
          v-for="product in productStore.products"
          :key="product.id"
          cols="12"
          sm="6"
          md="4"
          lg="3"
        >
          <v-card elevation="2" class="h-100 product-card">
            <v-img
              :src="product.image"
              height="200"
              cover
              class="bg-grey-lighten-2"
            ></v-img>
            
            <v-card-title class="pb-0">{{ product.name }}</v-card-title>
            
            <v-card-text>
              <div class="text-h6 text-primary font-weight-bold mb-2">
                {{ product.price }} €
              </div>
              <div class="text-caption text-medium-emphasis">
                Stock disponible: {{ product.stock }} unidades
              </div>
            </v-card-text>

            <v-divider></v-divider>
            
            <v-card-actions>
              <v-btn
                variant="tonal"
                color="primary"
                block
                prepend-icon="mdi-cart-plus"
                @click="buyProduct(product)"
              >
                Comprar ahora
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<style scoped>
.product-card {
  transition: transform 0.2s ease;
}
.product-card:hover {
  transform: translateY(-5px);
}
</style>

<style scoped>
</style>


// src/stores/products.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Product } from '../core/interfaces'
import * as api from '../core/services/api'

export const useProductStore = defineStore('products', () => {
    const products = ref<Product[]>([])
    const loading = ref(false)

    async function fetchProducts() {
        loading.value = true
        try {
            products.value = await api.get<Product[]>('products')
        } finally {
            loading.value = false
        }
    }

    async function createProduct(product: Omit<Product, 'id'>) {
        const newProduct = await api.post<Product>('products', product)
        products.value.push(newProduct)
    }

    async function updateProduct(product: Product) {
        const updated = await api.put<Product>('products', product.id, product)
        const index = products.value.findIndex(p => p.id === product.id)
        if (index !== -1) products.value[index] = updated
    }

    async function deleteProduct(id: number) {
        await api.remove('products', id)
        products.value = products.value.filter(p => p.id !== id)
    }

    return {
        products,
        loading,
        fetchProducts,
        createProduct,
        updateProduct,
        deleteProduct
    }
})

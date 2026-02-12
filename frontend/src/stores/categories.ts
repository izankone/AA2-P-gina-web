
// src/stores/categories.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Category } from '../core/interfaces'
import * as api from '../core/services/api'

export const useCategoryStore = defineStore('categories', () => {
    const categories = ref<Category[]>([])
    const loading = ref(false)

    async function fetchCategories() {
        loading.value = true
        try {
            categories.value = await api.get<Category[]>('categories')
        } finally {
            loading.value = false
        }
    }

    async function createCategory(category: Omit<Category, 'id'>) {
        const newCategory = await api.post<Category>('categories', category)
        categories.value.push(newCategory)
    }

    async function updateCategory(category: Category) {
        const updated = await api.put<Category>('categories', category.id, category)
        const index = categories.value.findIndex(c => c.id === category.id)
        if (index !== -1) categories.value[index] = updated
    }

    async function deleteCategory(id: number) {
        await api.remove('categories', id)
        categories.value = categories.value.filter(c => c.id !== id)
    }

    return {
        categories,
        loading,
        fetchCategories,
        createCategory,
        updateCategory,
        deleteCategory
    }
})

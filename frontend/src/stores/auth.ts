// src/stores/auth.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '../core/interfaces'
import { get } from '../core/services/api'

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)

    const isAuthenticated = computed(() => !!user.value)
    const isAdmin = computed(() => user.value?.role === 'admin')

    async function login(email: string, password: string): Promise<boolean> {
        // Simulación de login consultando el backend "users"
        // En produccion esto sería un POST /login que devuelve token
        const users = await get<User[]>('users')
        const found = users.find(u => u.email === email && (u as any).password === password) // password está en db.json aunque no en interfaz User frontend por seguridad, pero aqui simulamos

        if (found) {
            user.value = found
            return true
        }
        return false
    }

    function logout() {
        user.value = null
    }

    return { user, isAuthenticated, isAdmin, login, logout }
})

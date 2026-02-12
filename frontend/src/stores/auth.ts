// src/stores/auth.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '../core/interfaces'
import { get } from '../core/services/api'

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null)

    // Inicializar desde localStorage
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
        user.value = JSON.parse(storedUser)
    }

    const isAuthenticated = computed(() => !!user.value)
    const isAdmin = computed(() => user.value?.role === 'admin')

    async function login(email: string, password: string): Promise<boolean> {
        // Simulación de login consultando el backend "users"
        const users = await get<User[]>('users')
        const found = users.find(u => u.email === email && (u as any).password === password)

        if (found) {
            user.value = found
            localStorage.setItem('user', JSON.stringify(found))
            return true
        }
        return false
    }

    function logout() {
        user.value = null
        localStorage.removeItem('user')
    }

    // Método register simulado
    async function register(userData: Omit<User, 'id' | 'role'>) {
        // En un caso real, POST /register. Aquí simulamos éxito.
        // Asignamos rol user por defecto
        const newUser = { ...userData, role: 'user', id: Date.now() } // ID temporal
        // No guardamos en db.json porque json-server auth es complejo, simulamos login directo
        user.value = newUser as User;
        localStorage.setItem('user', JSON.stringify(newUser));
        return true;
    }

    return { user, isAuthenticated, isAdmin, login, logout, register }
})

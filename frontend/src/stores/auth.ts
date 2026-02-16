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
        try {
            // Buscamos usuario por email y password directamente en el servidor
            const users = await get<User[]>(`users?email=${email}&password=${password}`)

            if (users.length > 0) {
                const found = users[0]
                user.value = found
                localStorage.setItem('user', JSON.stringify(found))
                return true
            }
        } catch (error) {
            console.error('Error en login:', error)
        }
        return false
    }

    function logout() {
        user.value = null
        localStorage.removeItem('user')
    }

    async function register(userData: Omit<User, 'id' | 'role'>) {
        try {
            // Verificamos si ya existe el email
            const existing = await get<User[]>(`users?email=${userData.email}`)
            if (existing.length > 0) {
                console.warn('El usuario ya existe')
                return false
            }

            // Creamos el nuevo usuario con rol 'user'
            // @ts-ignore: el servicio post necesita mejoras de tipado o importación directa
            const response = await fetch('http://localhost:3000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    ...userData,
                    role: 'user'
                })
            })

            if (response.ok) {
                const newUser = await response.json()
                user.value = newUser
                localStorage.setItem('user', JSON.stringify(newUser))
                return true
            }
        } catch (error) {
            console.error('Error al registrar:', error)
        }
        return false
    }

    return { user, isAuthenticated, isAdmin, login, logout, register }
})

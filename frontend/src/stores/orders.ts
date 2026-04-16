import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Order } from '../core/interfaces'
import * as api from '../core/services/api'

export const useOrderStore = defineStore('orders', () => {
    const orders = ref<Order[]>([])
    const loading = ref(false)

    // Obtener todos los pedidos (admin)
    async function fetchOrders() {
        loading.value = true
        try {
            orders.value = await api.get<Order[]>('orders')
        } finally {
            loading.value = false
        }
    }

    // Obtener pedidos de un usuario concreto
    async function fetchMyOrders(userId: number) {
        loading.value = true
        try {
            orders.value = await api.get<Order[]>(`orders?userId=${userId}`)
        } finally {
            loading.value = false
        }
    }

    // Crear un nuevo pedido
    async function createOrder(order: Omit<Order, 'id'>) {
        try {
            const newOrder = await api.post<Order>('orders', order)
            orders.value.push(newOrder)
            return true
        } catch (error) {
            console.error('Error creating order:', error)
            return false
        }
    }

    // Actualizar el estado de un pedido (pendiente -> enviado -> entregado)
    async function updateOrderStatus(id: number, status: Order['status']) {
        const order = orders.value.find(o => o.id === id)
        if (!order) return
        const updated = await api.put<Order>('orders', id, { ...order, status })
        const index = orders.value.findIndex(o => o.id === id)
        if (index !== -1) orders.value[index] = updated
    }

    // Eliminar un pedido
    async function deleteOrder(id: number) {
        await api.remove('orders', id)
        orders.value = orders.value.filter(o => o.id !== id)
    }

    return {
        orders,
        loading,
        fetchOrders,
        fetchMyOrders,
        createOrder,
        updateOrderStatus,
        deleteOrder
    }
})

// src/stores/notification.ts
import { defineStore } from 'pinia'
import { ref } from 'vue'

export type NotificationType = 'success' | 'error' | 'info' | 'warning'

export const useNotificationStore = defineStore('notification', () => {
    const show = ref(false)
    const message = ref('')
    const type = ref<NotificationType>('success')
    const timeout = ref(3000)

    function notify(msg: string, notificationType: NotificationType = 'success', duration = 3000) {
        message.value = msg
        type.value = notificationType
        timeout.value = duration
        show.value = true
    }

    function success(msg: string) {
        notify(msg, 'success')
    }

    function error(msg: string) {
        notify(msg, 'error', 5000)
    }

    function close() {
        show.value = false
    }

    return {
        show,
        message,
        type,
        timeout,
        notify,
        success,
        error,
        close
    }
})

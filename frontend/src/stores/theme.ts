+------import { defineStore } from 'pinia'
import { ref } from 'vue'
import { useTheme } from 'vuetify'

export const useThemeStore = defineStore('theme', () => {
    const theme = useTheme()
    const currentTheme = ref(localStorage.getItem('theme') || 'light')

    function setTheme(themeName: string) {
        currentTheme.value = themeName
        theme.global.name.value = themeName
        localStorage.setItem('theme', themeName)
    }

    function initTheme() {
        const savedTheme = localStorage.getItem('theme')
        if (savedTheme) {
            setTheme(savedTheme)
        } else {
            // Fallback or system preference checks could go here
            setTheme('light')
        }
    }

    return {
        currentTheme,
        setTheme,
        initTheme
    }
})

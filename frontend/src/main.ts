import { createApp } from 'vue'
import App from './App.vue'

// Plugins
import vuetify from './plugins/vuetify'
import router from './router'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'

// Styles
import './style.css'
import '@mdi/font/css/materialdesignicons.css'

// Setup I18n (Basic)
const i18n = createI18n({
    legacy: false, // Vue 3 Composition API
    locale: 'es',
    fallbackLocale: 'en',
    messages: {
        es: {
            hello: 'Hola Mundo',
            title: 'Tienda Electrónica'
        },
        en: {
            hello: 'Hello World',
            title: 'Electronics Store'
        }
    }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(i18n)

app.mount('#app')

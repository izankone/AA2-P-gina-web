import { createApp } from 'vue'
import App from './App.vue'

// Plugins
import vuetify from './plugins/vuetify'
import router from './router'
import { createPinia } from 'pinia'

// Styles
import './style.css'
import '@mdi/font/css/materialdesignicons.css'

// Setup I18n (Basic)
import i18n from './plugins/i18n'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)
app.use(i18n)

app.mount('#app')

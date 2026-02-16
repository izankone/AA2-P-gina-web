// src/plugins/vuetify.ts
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

export default createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#1976D2',
          secondary: '#424242',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
        },
      },
      dark: {
        dark: true,
        colors: {
          primary: '#2196F3',
          secondary: '#424242',
          accent: '#FF4081',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
        },
      },
      blueTheme: {
        dark: false,
        colors: {
          primary: '#1565C0',
          secondary: '#5C6BC0',
          accent: '#82B1FF',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          background: '#E3F2FD',
          surface: '#BBDEFB',
        },
      },
      greenTheme: {
        dark: false,
        colors: {
          primary: '#2E7D32',
          secondary: '#66BB6A',
          accent: '#69F0AE',
          error: '#D32F2F',
          info: '#0288D1',
          success: '#388E3C',
          warning: '#FBC02D',
          background: '#E8F5E9',
          surface: '#C8E6C9',
        },
      },
      purpleTheme: {
        dark: true,
        colors: {
          primary: '#9C27B0',
          secondary: '#7B1FA2',
          accent: '#E040FB',
          error: '#FF5252',
          info: '#2196F3',
          success: '#4CAF50',
          warning: '#FFC107',
          background: '#120018',
          surface: '#290036',
        },
      },
    },
  },
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
})

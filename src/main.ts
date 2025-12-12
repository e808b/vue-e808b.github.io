import { createApp } from 'vue'
import App from './App.vue'

import { vuetify } from './plugins/vuetify'
import 'vuetify/styles/main.css'
import '@mdi/font/css/materialdesignicons.css'
import './assets/css/style.css'

createApp(App).use(vuetify).mount('#app')

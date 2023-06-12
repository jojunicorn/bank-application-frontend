import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import { createApp, reactive } from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
axios.defaults.baseURL = 'https://localhost:8080'
const app = createApp(App)

const eventBus = reactive({})

// Make the event bus available globally in the app
app.config.globalProperties.$eventBus = eventBus

app.use(router)

app.mount('#app')
import 'bootstrap/dist/js/bootstrap'

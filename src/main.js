import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import axios from 'axios'
<<<<<<< HEAD
axios.defaults.baseURL = 'https://loclhost:8080'

=======
axios.defaults.baseURL = 'http://localhost:8080'
>>>>>>> master
const app = createApp(App)

app.use(router)

app.mount('#app')
import 'bootstrap/dist/js/bootstrap'

  


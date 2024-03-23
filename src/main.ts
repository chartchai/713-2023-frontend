// import './assets/main.css'
import './assets/style.css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'nprogress/nprogress.css'
import '@/services/AxiosInrceptorSetup.ts'
import { FontAwesomeIcon } from './plugins/FontAwesome'
const app = createApp(App)

app.use(createPinia())
app.use(router)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')

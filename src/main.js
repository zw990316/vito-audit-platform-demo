import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import router from '@/router/index.js'
import ElementPlus from 'element-plus'

const app = createApp(App)


app.use(router)
app.use(ElementPlus)
app.mount('#app')
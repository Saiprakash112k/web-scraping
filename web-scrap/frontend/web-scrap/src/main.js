import Toast from "vue-toastification";
import axios from 'axios';
import "vue-toastification/dist/index.css";
import './assets/main.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
const app = createApp(App)
app.config.globalProperties.$axios = axios;
app.use(Toast)
app.use(router);
app.mount('#app')

import { createApp } from 'vue'
import { createPinia } from 'pinia';
import App from './App.vue'
import axios from 'axios';
import router from './router';

const app = createApp(App);

const pinia = createPinia();

// Создание глобального экземпляра axios
app.config.globalProperties.$axios = axios;
app.use(pinia);
app.use(router).mount('#app');


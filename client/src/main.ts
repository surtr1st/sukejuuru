import './assets/base.css';
import 'vue-toastification/dist/index.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Toast from 'vue-toastification';
import { createPinia } from 'pinia';

const app = createApp(App);
const pinia = createPinia();

app.use(router).use(Toast).use(pinia);

app.mount('#app');

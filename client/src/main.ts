import './assets/base.css';
import 'vue-toastification/dist/index.css';

import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import Toast from 'vue-toastification';

const app = createApp(App);

app.use(router).use(Toast);

app.mount('#app');

import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/index.js";
import axios from "axios";
import { createPinia } from "pinia";

const app = createApp(App);

// axios baseURL из переменной окружения
app.config.globalProperties.$axios = axios;

// Установка Pinia и роутера
const pinia = createPinia();
app.use(pinia);
app.use(router);

// Монтирование
app.mount("#app");

import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/index.js";
import axios from "axios";
import { createPinia } from "pinia";

const app = createApp(App);

// Настройка глобального axios
app.config.globalProperties.$axios = axios;
axios.defaults.baseURL = "http://localhost:8080"; // или другой URL

// Установка Pinia и роутера
const pinia = createPinia();
app.use(pinia);
app.use(router);

// Монтирование
app.mount("#app");

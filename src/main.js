// main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import axios from "axios";
import "./style.css";

const app = createApp(App);

// Настройка базового URL для axios
if (import.meta.env.DEV) {
  // В режиме разработки используем proxy из vite.config.js
  axios.defaults.baseURL = "/api"; // или "/local-api", если работаешь с роутером напрямую
} else {
  // В продакшене указываем реальный адрес сервера
  axios.defaults.baseURL = "http://localhost:8080"; // заменишь на нужный IP/домен при деплое
}

// Делаем axios доступным глобально
app.config.globalProperties.$axios = axios;

// Подключаем состояния и маршрутизацию
const pinia = createPinia();
app.use(pinia);
app.use(router);

// Монтируем приложение
app.mount("#app");

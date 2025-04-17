import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router/index.js";
import axios from "axios";

const app = createApp(App);

// Настройка глобального экземпляра axios
app.config.globalProperties.$axios = axios;

// Настройка базового URL (если необходимо)
axios.defaults.baseURL = "http://localhost:8080"; // замените на ваш серверный URL

app.use(router).mount("#app");

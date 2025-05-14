import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/HomeView.vue";

const routes = [
  { path: "/", component: Home },
  { path: "/login", component: () => import("../views/LoginView.vue") },
  { path: "/settings", component: () => import("../views/SettingsView.vue") },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

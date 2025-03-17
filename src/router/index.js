import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/HomeView.vue";
import Login from "../views/LoginView.vue";
import System from "../components/System.vue";

const routes = [
  { path: "/login", component: Login },
  { path: "/", component: Home },
  { path: "/system", component: System },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

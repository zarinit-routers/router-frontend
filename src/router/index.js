import { createWebHistory, createRouter } from "vue-router";
import Home from "../views/HomeView.vue";
import Login from "../views/LoginView.vue";
import Settings from "../views/SettingsView.vue";
import Graphics from "../views/GraphicsView.vue";
import { isAuthenticated } from "../auth"; // импортируем функцию проверки

const routes = [
  { path: "/", redirect: "/login" },
  { path: "/login", component: Login },
  { path: "/Home", component: Home },
  { path: "/settings", component: Settings },
  { path: "/graphics", component: Graphics },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const auth = isAuthenticated();

  const publicPages = ["/login"];
  const authRequired = !publicPages.includes(to.path.toLowerCase());

  if (authRequired && !auth) {
    // Если пытается зайти в защищённый маршрут, но не авторизован — редирект на логин
    next("/login");
  } else if (to.path.toLowerCase() === "/login" && auth) {
    // Если авторизован и пытается зайти на /login — редирект на /home
    next("/Home");
  } else {
    next(); // разрешить навигацию
  }
});

export default router;

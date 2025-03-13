import { createWebHistory, createRouter } from 'vue-router'
import Home from '../components/Home.vue'
import Login from '../components/Login.vue'
import System from '../components/System.vue'

const routes = [
  { path: '/login', component: Login },
  { path: '/', component: Home },
  { path: '/System', component: System }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

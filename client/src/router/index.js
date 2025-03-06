
import { createWebHistory, createRouter } from 'vue-router'
import Home from '../components/Home.vue'
import RouterList from '../components/RouterList.vue'

import Login from '../components/Login.vue';

const routes = [
  { path: '/', component: Login }, // Login на главной странице
  { path: '/home', component: Home }, // Home после входа
  { path: '/RouterList', component: RouterList }
];

const router = createRouter({
    routes: routes,
    history: createWebHistory()
  })

  export default router;
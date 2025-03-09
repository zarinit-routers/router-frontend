import { createWebHistory, createRouter } from 'vue-router'
import Home from '../components/Home.vue'
import RouterList from '../components/RouterList.vue'

import Login from '../components/Login.vue';
import System from '../components/System.vue';


const routes = [
  { path: '/login', component: Login },
  { path: '/', component: Home },
  { path: '/RouterList', component: RouterList },
  {path: '/System', component: System}
];

const router = createRouter({
    routes: routes,
    history: createWebHistory()
  })

  export default router;

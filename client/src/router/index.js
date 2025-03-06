
import { createMemoryHistory, createRouter } from 'vue-router'
import Home from '../components/Home.vue'

const router = createRouter({
    routes: [
      { path: '/Home', component: Home}
    ],
    history: createMemoryHistory()
  })

  export default router;
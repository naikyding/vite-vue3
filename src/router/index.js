import { createRouter, createWebHashHistory } from 'vue-router'

import LayoutMain from '../views/LayoutMain.vue'
import Index from '../views/index.vue'

const routes = [
  {
    path: '/',
    name: 'layout',
    component: LayoutMain,
    children: [
      {
        path: '',
        name: 'index',
        component: Index,
      },
      {
        path: 'attractions',
        name: 'attractions',
        component: () => import('../views/Attractions/index.vue'),
      },
    ],
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router

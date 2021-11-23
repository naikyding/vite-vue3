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
      // 景點首頁
      {
        path: 'attractions',
        name: 'attractions',
        component: () => import('../views/Attractions/index.vue'),
      },
      // 景點詳情
      {
        path: 'attractions/:id',
        name: 'attractions-item',
        component: () => import('../views/Attractions/AttractionsItem.vue'),
      },
      // 美食
      {
        path: 'restaurant',
        name: 'restaurant',
        component: () => import('../views/Restaurant/index.vue'),
      },
      {
        path: 'room',
        name: 'room',
        component: () => import('../views/Room/index.vue'),
      },
    ],
  },
]
const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
})

export default router

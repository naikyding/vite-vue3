import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/index.vue')
  },
  {
    path: '/attractions',
    name: 'attractions',
    component: () => import('../views/Attractions/index.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/about.vue')
  }
]
const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
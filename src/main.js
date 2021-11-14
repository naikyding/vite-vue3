import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'
import Vuex from './store/index'

import './index.css' // tailwind css import

createApp(App)
  .use(Router)
  .use(Vuex)
  .mount('#app')

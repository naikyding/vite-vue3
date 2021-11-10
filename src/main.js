import { createApp } from 'vue'
import App from './App.vue'
import Router from './router'
import './index.css' // tailwind css import

createApp(App)
  .use(Router)
  .mount('#app')

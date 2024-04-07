import { createApp } from 'vue'
import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import App from './App.vue'

// import '@noahyu/lc-ui/styles/index.scss'

const routes: Array<RouteRecordRaw> = [{ path: '/', name: 'home', component: App }]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

createApp(App).use(router).mount('#app')

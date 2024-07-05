import { createRouter, createWebHistory } from 'vue-router'

import Index from '../pages/index.vue'
import GanttChart from '../pages/ganttChart.vue'
import HeaderMenu from '../pages/headerMenu.vue'
import Mentions from '../pages/mentions.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: Index },
    { path: '/ganttChart', name: 'GanttChart', component: GanttChart },
    { path: '/headerMenu', name: 'HeaderMenu', component: HeaderMenu },
    { path: '/mentions', name: 'Mentions', component: Mentions },
  ],
})

export default router

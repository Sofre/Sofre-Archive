import { createRouter, createWebHistory } from 'vue-router'
import ArchiveView from '../views/ArchiveView.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: ArchiveView,
    },
    {
      path: '/archive',
      name: 'archive',
      component: ArchiveView,
    },
    {
      path: '/deployments',
      name: 'deployments',
      component: ArchiveView,
      meta: { section: 'deployments' },
    },
    {
      path: '/research',
      name: 'research',
      component: ArchiveView,
      meta: { section: 'research' },
    },
    {
      path: '/transmission',
      name: 'transmission',
      component: ArchiveView,
      meta: { section: 'transmission' },
    },
  ],
})

export default router

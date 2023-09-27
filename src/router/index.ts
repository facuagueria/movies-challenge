import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '@/views/LoginView.vue'
import ListBySearch from '@/views/ListBySearch.vue'
import DetailsView from '@/views/DetailsView.vue'
import OwnList from '@/views/OwnList.vue'
import CreateView from '@/views/CreateView.vue'
import EditView from '@/views/EditView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/movies',
      name: 'movies',
      component: ListBySearch,
      props: { type: 'movie' },
      meta: { requiresAuth: true }
    },
    {
      path: '/series',
      name: 'series',
      component: ListBySearch,
      props: { type: 'series' },
      meta: { requiresAuth: true }
    },
    {
      path: '/:id/details',
      name: 'details',
      component: DetailsView,
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/own/movies-series',
      name: 'own-movies-series',
      component: OwnList,
      props: true,
      meta: { requiresAuth: true }
    },
    {
      path: '/own/movies-series/create',
      name: 'create',
      component: CreateView,
      meta: { requiresAuth: true }
    },
    {
      path: '/own/movies-series/:id/edit',
      name: 'edit',
      component: EditView,
      props: true,
      meta: { requiresAuth: true }
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !localStorage.getItem('tokenAuth')) {
    next({ name: 'login' })
  } else {
    next()
  }
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'home',
      component: HomeView
    },
    {
      path: '/employeeLogin',
      name: 'employeeLogin',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/EmployeeLoginView.vue')
    },
    {
      path: '/userLogin',
      name: 'userLogin',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/UserLoginView.vue')
    },
    {
      path: '/user/:id',
      name: 'userHome',
      component: () => import('../views/UserHomeView.vue')
    },
    {
      path: '/user/:id/atm',
      name: 'userATM',
      component: () => import('../views/UserATMView.vue')
    },
    {
      path: '/user/:id/transactions',
      name: 'userTransactions',
      component: () => import('../views/UserTransactionsView.vue')
    },
    {
      path: '/user/:id/profile',
      name: 'userProfile',
      component: () => import('../views/UserProfileView.vue')
    }
  ]
})

export default router

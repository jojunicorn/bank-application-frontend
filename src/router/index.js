import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../components/UserLoginComponent.vue'
import Unauthorized from '../components/UnauthorisedComponent.vue'
const userId = localStorage.getItem('id')
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'home',
      component: HomeView
    },
    { path: '/userLogin', name: 'login', component: Login },
    {
      path: `/user/${userId}`,
      name: 'userHome',
      component: () => import('../views/UserHomeView.vue')
    },
    {
      path: `/user/:userId/atm`,
      name: 'userATM',
      component: () => import('../views/UserATMView.vue')
    },
    {
      path: `/user/:userId/transactions`,
      name: 'userTransactions',
      component: () => import('../views/UserTransactionsView.vue')
    },
    {
      path: `/user/${userId}/profile`,
      name: 'userProfile',
      component: () => import('../views/UserProfileView.vue')
    },
    {
      path: '/users',
      name: 'getAllUsers',
      component: () => import('../views/GetUsersView.vue')
    },
    {
      path: '/accounts',
      name: 'getAccounts',
      component: () => import('../views/accounts/GetAccountsView.vue')
    },
    {
      path: '/accounts/getIbanByCustomerName',
      name: 'searchAccounts',
      component: () => import('../views/accounts/FindAccountsView.vue'),
      props: (route) => {
        {
          firstName: route.query.firstName
        }
      }
    },
    {
      path: '/accountsCreate',
      name: 'createAccount',
      component: () => import('../views/accounts/PostAccountView.vue')
    },
    {
      path: '/accounts/accountStatus',
      name: 'updateAccount',
      component: () => import('../views/accounts/PutAccountView.vue')
    },
    {
      path: '/accounts/absoluteLimit',
      name: 'updateAbsoluteLimit',
      component: () => import('../views/accounts/PutAccountView.vue')
    },
    {
      path: '/accounts/myAccount/:iban',
      name: 'overviewAccount',
      component: () => import('../views/accounts/OverviewAccountsView.vue')
    },
    {
      path: '/unauthorized',
      name: 'Unauthorized',
      component: Unauthorized
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/unauthorized' // Redirect any unmatched path to the Unauthorised component or view
    }
  ]
})

export default router

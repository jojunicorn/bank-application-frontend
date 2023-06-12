import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/UserLoginComponent.vue'
import Unauthorised from '../components/UnauthorisedComponent.vue'
import NotFound from '../components/NotFoundComponent.vue'

const userId = localStorage.getItem('id')

function employeeGuard(to, from, next) {
  // Check if the user has the role of "employee"
  const userRole = localStorage.getItem('role'); // Implement this function to get the user's role
  
  if (userRole === 'ROLE_EMPLOYEE') {
    // Allow access to the route
    next();
  } else {
    // Redirect to a different route or display an error message
    next('/unauthorised');
  }
}


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'login',
      component: Login
    },
    {
      path: `/dashboard`,
      name: 'userHome',
      component: () => import('../views/UserHomeView.vue')
    },
    {
      path: `/atm`,
      name: 'userATM',
      component: () => import('../views/UserATMView.vue')
    },
    {
      path: `/user/transactions`,
      name: 'userTransactions',
      component: () => import('../views/UserTransactionsView.vue')
    },
    {
      path: `/user/profile`,
      name: 'userProfile',
      component: () => import('../views/UserProfileView.vue')
    },
    {
      path: '/users',
      name: 'getAllUsers',
      component: () => import('../views/GetUsersView.vue'),
      beforeEnter: employeeGuard
    },
    {
      path: '/accounts',
      name: 'getAccounts',
      component: () => import('../views/accounts/GetAccountsView.vue'),
      beforeEnter: employeeGuard // Apply the guard to this route
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
      component: () => import('../views/accounts/PostAccountView.vue'),
      beforeEnter: employeeGuard
    },
    {
      path: '/accounts/accountStatus',
      name: 'updateAccount',
      component: () => import('../views/accounts/PutAccountView.vue'),
      beforeEnter: employeeGuard
    },
    {
      path: '/accounts/absoluteLimit',
      name: 'updateAbsoluteLimit',
      component: () => import('../views/accounts/UpdateAccountView.vue'),
      beforeEnter: employeeGuard
    },
    {
      path: '/accounts/myAccount',
      name: 'overviewAccount',
      component: () => import('../views/accounts/OverviewAccountsView.vue')
    },
    {
      path: '/unauthorised',
      name: 'Unauthorised',
      component: Unauthorised
    },
    {
      path: '/notfound',
      name: 'notFound',
      component: NotFound
    },
    {
      path: '/:catchAll(.*)',
      redirect: '/notfound' // Redirect any unmatched path to the Unauthorised component or view
    }
  ]
})

export default router

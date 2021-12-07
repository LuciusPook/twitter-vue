import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Register from '../views/UserRegister.vue'
import NotFound from '../views/NotFound.vue'

import Main from '../views/Main.vue'
import store from './../store'

// const authorizeIsAdmin = (to, from, next) => {
//   const currentUser = store.state.currentUser
//   if (currentUser && !currentUser.isAdmin) {
//     next('/404')
//     return
//   }

//   next()
// }

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'root',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
  {
    path: '/main',
    name: 'main',
    component: Main,
  },
  {
    path: '/adminlogin',
    name: 'admin-login',
    // exact: true,
    component: () => import('../views/AdminLogin.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
  },
  {
    path: '/users/:id',
    name: 'user',
    component: () => import('../views/User.vue'),
  },
  {
    path: '/tweets/:id',
    name: 'tweet',
    component: () => import('../views/Tweet.vue'),
  },
  {
    path: '/users/self/setting',
    name: 'setting',
    component: () => import('../views/UserAccountSetting.vue')
  },
  {
    path: '/admin/login',
    name: 'admin-login',
    // exact: true,
    component: () => import('../views/AdminLogin.vue')
  },
  {
    path: '/admin/tweets',
    name: 'admin-tweets',
    // exact: true,
    component: () => import('../views/AdminTweets.vue')
  },
  {
    path: '/admin/users',
    name: 'admin-users',
    component: () => import('../views/AdminUsers.vue')
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound,
  },
]

const router = new VueRouter({
  linkExactActiveClass: 'active',
  routes
})

router.beforeEach(async (to, from, next) => {

  const tokenInLocalStorage = localStorage.getItem('token')
  const tokenInStore = store.state.token
  let isAuthenticated = store.state.isAuthenticated

  if (tokenInLocalStorage && tokenInLocalStorage !== tokenInStore) {
    isAuthenticated = await store.dispatch('fetchCurrentUser')
  }

  const pathsWithoutAuthentication = ['login']

  if (!isAuthenticated && !pathsWithoutAuthentication.includes(to.name)) {
    next('/login')
    return
  }

  if (isAuthenticated && pathsWithoutAuthentication.includes(to.name)) {
    next('/main')
    return
  }
  next()
})


export default router

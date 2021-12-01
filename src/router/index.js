import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import NotFound from '../views/NotFound.vue'
// import store from './../store'

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
    meta: { title: "登入 Aplhitter" },
    component: Login,
  },
  {
    path: '/adminlogin',
    name: 'admin-login',
    meta: { title: "後台登入" },
    // exact: true,
    component: () => import('../views/AdminLogin.vue')
  },
  {
    path: '*',
    name: 'not-found',
    component: NotFound,
  },
]

const router = new VueRouter({
  routes
})

export default router

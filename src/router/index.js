import { createRouter, createWebHashHistory } from 'vue-router'
import Layout from '../views/Layout.vue'

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('../views/dashboard/Index.vue'),
        meta: { title: 'Dashboard', icon: 'dashboard' }
      },
      {
        path: 'setting',
        name: 'Setting',
        component: () => import('../views/setting/Index.vue'),
        meta: { title: 'Setting', icon: 'setting' }
      },
      {
        path: 'setting/api',
        name: 'SettingApi',
        component: () => import('../views/setting/Api.vue'),
        meta: { title: 'SettingApi', icon: 'SettingApi' }
      },
      // {
      //   path: 'dashboard',
      //   name: 'Dashboard',
      //   component: () => import('../views/dashboard/Index.vue'),
      //   meta: { title: 'Dashboard', icon: 'dashboard' }
      // },
    ]
  },
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

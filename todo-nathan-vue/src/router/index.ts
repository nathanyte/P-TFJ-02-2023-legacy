import LoginPage from '../pages/Login-page.vue'
import LogoutPage from '../pages/Logout-page.vue'
import TodoPage from '../pages/Todo-page.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: LoginPage,
    auth: false,
  },
  {
    path: '/todo',
    component: TodoPage,
    auth: true,
  },
  {
    path: '/logout',
    component: LogoutPage,
    auth: true,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
})

export default router

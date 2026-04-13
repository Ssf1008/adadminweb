import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from './views/DashboardView.vue'
import UsersView from './views/UsersView.vue'
import RecordsView from './views/RecordsView.vue'
import KnowledgeView from './views/KnowledgeView.vue'
import LoginView from './views/LoginView.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/login', component: LoginView, meta: { public: true } },
  { path: '/dashboard', component: DashboardView },
  { path: '/users', component: UsersView },
  { path: '/records', component: RecordsView },
  { path: '/knowledge', component: KnowledgeView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to) => {
  const token = localStorage.getItem('admin_token')
  if (!to.meta.public && !token) {
    return '/login'
  }
  if (to.path === '/login' && token) {
    return '/dashboard'
  }
})

export default router

<script setup>
import { computed } from 'vue'
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const menus = [
  { path: '/dashboard', label: '数据总览' },
  { path: '/users', label: '用户管理' },
  { path: '/records', label: '训练记录' },
  { path: '/knowledge', label: '知识文章' }
]

const pageTitle = computed(() => menus.find(item => item.path === route.path)?.label || '后台管理')
const showLayout = computed(() => route.path !== '/login')
const adminName = computed(() => localStorage.getItem('admin_name') || '系统管理员')

function logout() {
  localStorage.removeItem('admin_token')
  localStorage.removeItem('admin_name')
  router.push('/login')
}
</script>

<template>
  <RouterView v-if="!showLayout" />

  <div v-else class="layout">
    <aside class="sidebar">
      <div class="brand">
        <div class="brand-mark">脑</div>
        <div>
          <h1>脑力花园</h1>
          <p>后台管理系统</p>
        </div>
      </div>
      <nav class="nav">
        <RouterLink v-for="item in menus" :key="item.path" :to="item.path" class="nav-link">
          {{ item.label }}
        </RouterLink>
      </nav>
    </aside>

    <main class="main">
      <header class="topbar">
        <div>
          <div class="eyebrow">Alzheimer Care Admin</div>
          <h2>{{ pageTitle }}</h2>
        </div>
        <div class="topbar-actions">
          <span class="admin-chip">{{ adminName }}</span>
          <button class="ghost-btn" @click="logout">退出登录</button>
        </div>
      </header>
      <section class="content">
        <RouterView />
      </section>
    </main>
  </div>
</template>

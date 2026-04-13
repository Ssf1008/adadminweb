<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { adminLogin } from '../api'

const router = useRouter()
const loading = ref(false)
const errorMessage = ref('')
const form = reactive({
  username: 'admin',
  password: '123456'
})

async function handleLogin() {
  if (!form.username || !form.password) {
    errorMessage.value = '请输入账号和密码'
    return
  }
  loading.value = true
  errorMessage.value = ''
  try {
    const res = await adminLogin(form)
    if (res.success) {
      localStorage.setItem('admin_token', res.data.token)
      localStorage.setItem('admin_name', res.data.admin.display_name || res.data.admin.username)
      router.push('/dashboard')
      return
    }
    errorMessage.value = res.message || '登录失败'
  } catch (error) {
    errorMessage.value = '无法连接后台服务'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-screen">
    <div class="login-card">
      <div class="login-brand-mark">脑</div>
      <h1>脑力花园后台登录</h1>
      <p>用于管理用户、训练记录与知识文章</p>

      <div class="login-form">
        <label>
          <span>管理员账号</span>
          <input v-model="form.username" class="web-input" placeholder="请输入账号" />
        </label>
        <label>
          <span>登录密码</span>
          <input v-model="form.password" type="password" class="web-input" placeholder="请输入密码" />
        </label>
        <div v-if="errorMessage" class="login-error">{{ errorMessage }}</div>
        <button class="primary-web-btn login-submit" :disabled="loading" @click="handleLogin">
          {{ loading ? '登录中...' : '进入后台' }}
        </button>
      </div>
    </div>
  </div>
</template>


<script setup>
import { computed, onMounted, ref } from 'vue'
import { getUsers } from '../api'

const loading = ref(false)
const users = ref([])
const keyword = ref('')

const summaryText = computed(() => {
  if (loading.value) return '加载中...'
  if (keyword.value) return `搜索到 ${users.value.length} 人`
  return `共 ${users.value.length} 人`
})

async function loadData() {
  loading.value = true
  try {
    const res = await getUsers(keyword.value.trim())
    if (res.success) {
      users.value = res.data
    }
  } finally {
    loading.value = false
  }
}

function handleSearch() {
  loadData()
}

function resetSearch() {
  keyword.value = ''
  loadData()
}

onMounted(loadData)
</script>

<template>
  <div class="panel">
    <div class="panel-header">
      <h3>用户列表</h3>
      <span>{{ summaryText }}</span>
    </div>

    <div class="toolbar">
      <input
        v-model="keyword"
        class="web-input toolbar-input"
        placeholder="输入昵称 / 手机号 / OpenID 搜索"
        @keyup.enter="handleSearch"
      />
      <button class="primary-web-btn toolbar-btn" @click="handleSearch">搜索</button>
      <button class="ghost-btn toolbar-btn" @click="resetSearch">重置</button>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>昵称</th>
          <th>OpenID</th>
          <th>年龄</th>
          <th>性别</th>
          <th>手机号</th>
          <th>病史</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in users" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.nickname }}</td>
          <td class="mono">{{ item.openid }}</td>
          <td>{{ item.age || '-' }}</td>
          <td>{{ item.gender === 1 ? '男' : item.gender === 2 ? '女' : '未知' }}</td>
          <td>{{ item.phone || '-' }}</td>
          <td>{{ item.medicalHistory || '-' }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

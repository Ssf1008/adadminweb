<script setup>
import { onMounted, ref } from 'vue'
import { getOverview } from '../api'

const loading = ref(false)
const stats = ref({ userCount: 0, recordCount: 0, knowledgeCount: 0, latestRecords: [] })

async function loadData() {
  loading.value = true
  try {
    const res = await getOverview()
    if (res.success) {
      stats.value = res.data
    }
  } finally {
    loading.value = false
  }
}

onMounted(loadData)
</script>

<template>
  <div class="page-grid">
    <div class="stat-card">
      <span>用户总数</span>
      <strong>{{ stats.userCount }}</strong>
    </div>
    <div class="stat-card">
      <span>训练记录</span>
      <strong>{{ stats.recordCount }}</strong>
    </div>
    <div class="stat-card">
      <span>知识文章</span>
      <strong>{{ stats.knowledgeCount }}</strong>
    </div>

    <div class="panel wide-panel">
      <div class="panel-header">
        <h3>最近训练记录</h3>
        <span v-if="loading">加载中...</span>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>用户ID</th>
            <th>训练项目</th>
            <th>得分</th>
            <th>正确率</th>
            <th>训练时间</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in stats.latestRecords" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.userId }}</td>
            <td>{{ item.gameName }}</td>
            <td>{{ item.score }}</td>
            <td>{{ item.accuracyRate }}%</td>
            <td>{{ item.recordTime }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


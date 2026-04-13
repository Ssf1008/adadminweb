<script setup>
import { onMounted, ref } from 'vue'
import { getRecords } from '../api'

const loading = ref(false)
const records = ref([])

async function loadData() {
  loading.value = true
  try {
    const res = await getRecords()
    if (res.success) {
      records.value = res.data
    }
  } finally {
    loading.value = false
  }
}

onMounted(loadData)
</script>

<template>
  <div class="panel">
    <div class="panel-header">
      <h3>训练记录</h3>
      <span>{{ loading ? '加载中...' : `共 ${records.length} 条` }}</span>
    </div>
    <table class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>用户ID</th>
          <th>训练名称</th>
          <th>分数</th>
          <th>时长(秒)</th>
          <th>完成率</th>
          <th>正确率</th>
          <th>难度</th>
          <th>时间</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in records" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.userId }}</td>
          <td>{{ item.gameName }}</td>
          <td>{{ item.score }}</td>
          <td>{{ item.duration }}</td>
          <td>{{ item.completionRate }}%</td>
          <td>{{ item.accuracyRate }}%</td>
          <td>{{ item.difficultyLevel }}</td>
          <td>{{ item.recordTime }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


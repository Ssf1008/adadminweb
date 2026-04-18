<script setup>
import { computed, onMounted, ref } from 'vue'
import { getAnalyses } from '../api'

const loading = ref(false)
const analyses = ref([])
const userId = ref('')

const summaryText = computed(() => {
  if (loading.value) return '加载中...'
  if (userId.value) return `筛选后 ${analyses.value.length} 条`
  return `共 ${analyses.value.length} 条`
})

async function loadData() {
  loading.value = true
  try {
    const res = await getAnalyses(userId.value.trim())
    if (res.success) {
      analyses.value = res.data
    }
  } finally {
    loading.value = false
  }
}

function handleSearch() {
  loadData()
}

function resetSearch() {
  userId.value = ''
  loadData()
}

onMounted(loadData)
</script>

<template>
  <div class="panel">
    <div class="panel-header">
      <h3>AI 分析记录</h3>
      <span>{{ summaryText }}</span>
    </div>

    <div class="toolbar">
      <input
        v-model="userId"
        class="web-input toolbar-input"
        placeholder="输入用户 ID 筛选"
        @keyup.enter="handleSearch"
      />
      <button class="primary-web-btn toolbar-btn" @click="handleSearch">搜索</button>
      <button class="ghost-btn toolbar-btn" @click="resetSearch">重置</button>
    </div>

    <table class="data-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>用户ID</th>
          <th>昵称</th>
          <th>综合评分</th>
          <th>分析总结</th>
          <th>亮点</th>
          <th>风险点</th>
          <th>建议</th>
          <th>模型</th>
          <th>样本记录数</th>
          <th>生成时间</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in analyses" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.userId }}</td>
          <td>{{ item.nickname || '-' }}</td>
          <td>{{ item.overallScore }}</td>
          <td class="text-cell">{{ item.summary }}</td>
          <td class="text-cell">{{ (item.strengths || []).join('；') || '-' }}</td>
          <td class="text-cell">{{ (item.risks || []).join('；') || '-' }}</td>
          <td class="text-cell">{{ (item.suggestions || []).join('；') || '-' }}</td>
          <td>{{ item.modelName || '-' }}</td>
          <td>{{ item.sourceRecordCount }}</td>
          <td>{{ item.createdAt }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>


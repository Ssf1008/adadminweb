<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { createKnowledge, deleteKnowledge, getKnowledge, updateKnowledge } from '../api'

const loading = ref(false)
const saving = ref(false)
const articles = ref([])
const editingId = ref(null)
const form = reactive({ title: '', summary: '', content: '', coverImage: '' })

const formTitle = computed(() => editingId.value ? '编辑文章' : '新增文章')

function resetForm() {
  editingId.value = null
  form.title = ''
  form.summary = ''
  form.content = ''
  form.coverImage = ''
}

function startEdit(item) {
  editingId.value = item.id
  form.title = item.title || ''
  form.summary = item.summary || ''
  form.content = item.content || ''
  form.coverImage = item.coverImage || ''
}

async function loadData() {
  loading.value = true
  try {
    const res = await getKnowledge()
    if (res.success) {
      articles.value = res.data
    }
  } finally {
    loading.value = false
  }
}

async function submitForm() {
  if (!form.title || !form.content) return
  saving.value = true
  try {
    const payload = { ...form }
    const res = editingId.value
      ? await updateKnowledge(editingId.value, payload)
      : await createKnowledge(payload)
    if (res.success) {
      resetForm()
      await loadData()
    }
  } finally {
    saving.value = false
  }
}

async function removeItem(id) {
  if (!window.confirm('确认删除这篇文章吗？')) return
  const res = await deleteKnowledge(id)
  if (res.success) {
    await loadData()
    if (editingId.value === id) resetForm()
  }
}

onMounted(loadData)
</script>

<template>
  <div class="knowledge-layout">
    <div class="panel form-panel">
      <div class="panel-header">
        <h3>{{ formTitle }}</h3>
        <button class="ghost-btn" @click="resetForm">重置</button>
      </div>
      <div class="form-grid">
        <label>
          <span>标题</span>
          <input v-model="form.title" class="web-input" placeholder="请输入文章标题" />
        </label>
        <label>
          <span>封面图地址</span>
          <input v-model="form.coverImage" class="web-input" placeholder="可选" />
        </label>
        <label class="full">
          <span>摘要</span>
          <textarea v-model="form.summary" class="web-textarea" rows="3" placeholder="请输入摘要"></textarea>
        </label>
        <label class="full">
          <span>正文</span>
          <textarea v-model="form.content" class="web-textarea" rows="10" placeholder="请输入文章正文"></textarea>
        </label>
      </div>
      <button class="primary-web-btn" :disabled="saving" @click="submitForm">{{ saving ? '保存中...' : (editingId ? '保存修改' : '新增文章') }}</button>
    </div>

    <div class="panel">
      <div class="panel-header">
        <h3>文章列表</h3>
        <span>{{ loading ? '加载中...' : `共 ${articles.length} 篇` }}</span>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>标题</th>
            <th>摘要</th>
            <th>创建时间</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in articles" :key="item.id">
            <td>{{ item.id }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.summary }}</td>
            <td>{{ item.createdAt }}</td>
            <td>
              <div class="action-row">
                <button class="ghost-btn" @click="startEdit(item)">编辑</button>
                <button class="danger-btn" @click="removeItem(item.id)">删除</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>


import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:8082/api'
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('admin_token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

export async function adminLogin(payload) {
  const { data } = await api.post('/admin/login', payload)
  return data
}

export async function getOverview() {
  const { data } = await api.get('/admin/overview')
  return data
}

export async function getUsers(keyword = '') {
  const { data } = await api.get('/admin/users', { params: { keyword } })
  return data
}

export async function getRecords() {
  const { data } = await api.get('/admin/records')
  return data
}

export async function getKnowledge() {
  const { data } = await api.get('/admin/knowledge')
  return data
}

export async function createKnowledge(payload) {
  const { data } = await api.post('/admin/knowledge', payload)
  return data
}

export async function updateKnowledge(id, payload) {
  const { data } = await api.put(`/admin/knowledge/${id}`, payload)
  return data
}

export async function deleteKnowledge(id) {
  const { data } = await api.delete(`/admin/knowledge/${id}`)
  return data
}

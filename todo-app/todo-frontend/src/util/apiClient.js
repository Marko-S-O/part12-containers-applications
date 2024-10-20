import axios from 'axios'

const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'
const apiClient = axios.create({
  baseURL: baseUrl,
})

export default apiClient
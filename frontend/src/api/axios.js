import axios from 'axios'

// TODO: API call — replace with your actual backend URL once ready
const BASE_URL = 'http://localhost:5000/api'

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    // TODO: API call — Get persistent token from AsyncStorage once package is linked
    // const token = await AsyncStorage.getItem('token')
    // if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // TODO: API call — Clean storage and clear state context logs on authentication failure
      // await AsyncStorage.removeItem('token')
      // await AsyncStorage.removeItem('user')
    }
    return Promise.reject(error)
  }
)

export default api
import axios from 'axios'

const instance = axios.create({
  baseURL: 'https://bankapi-urjj.onrender.com/'
})

// Add request interceptor
instance.interceptors.request.use(
  function (config) {
    config.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE'
    config.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'

    if (config.url !== '/login' && config.url !== '/users/register') {
      const token = localStorage.getItem('token')
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
export default instance

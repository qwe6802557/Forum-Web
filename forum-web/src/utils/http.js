import axios from 'axios'
import { Message } from 'element-ui'

// 创建axios实例
const service = axios.create({
  baseURL: '', 
  timeout: 5000, // 请求超时时间
  headers: { 'Content-Type': 'application/json;charset=UTF-8' },
  transformRequest: [function(data) {
    return data
  }]
})

// request拦截器
service.interceptors.request.use(
  config => {
    if(config.data){
      config.headers['Content-Type'] = 'application/json;charset=UTF-8'
      config.data = JSON.stringify(config.data)
    }
    return config
  },
  error => {
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    const res = response.data
    if(res.code === 200){
      return response.data.data
    } else {
      return Promise.reject(res)
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service

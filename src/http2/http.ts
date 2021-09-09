/*
 * @author: WRR
 * @Date: 2021-08-18 14:52:42
 * @dec: 封装axios axios.defaults.baseURL = "http://192.168.10.224:38080/app/mock/18"
 */
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import qs from "qs"
import { message } from 'ant-design-vue';


const showStatus = (status: number) => {
    let msg = '';
    switch (status) {
        case 400:
            msg = '请求错误(400)'
            break
        case 401:
            msg = '登录失效(401)'
            break
        case 403:
            msg = '拒绝访问(403)'
            break
        case 404:
            msg = '请求出错(404)'
            break
        case 405:
            msg = '请求中的方法被禁止(405)'
            break
        case 500:
            msg = '服务器异常(500)'
            break
        case 502:
            msg = '网络错误(502)'
            break
        case 503:
            msg = '服务不可用(503)'
            break
        case 504:
            msg = '网络超时(504)'
            break
        default:
            msg = `连接出错(${status})!`
    }
    return `${msg}，请检查网络或联系管理员！`
}

const http = axios.create({
  // 联调
  baseURL: "http://localhost:3000/api",
  headers: {
    get: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    },
    post: {
      'Content-Type': 'application/json;charset=utf-8'
    }
  },
  // 是否跨站点访问控制请求
  withCredentials: false,
  timeout: 30000,
  transformRequest: [(data: any) => {
    data = JSON.stringify(data)
    return data
  }],
  validateStatus() {
    // 使用async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常
    return true
  },
  transformResponse: [(data: any) => {
    if (typeof data === 'string' && data.startsWith('{')) {
      data = JSON.parse(data)
    }
    return data
  }]
  
})

// 声明一个 Map 用于存储每个请求的标识 和 取消函数
const pending = new Map()
/**
 * 添加请求
 * @param {Object} config 
 */
const addPending = (config: AxiosRequestConfig) => {
  const url = [
    config.method,
    config.url,
    qs.stringify(config.params),
    qs.stringify(config.data)
  ].join('&')
  config.cancelToken = config.cancelToken || new axios.CancelToken((cancel: any) => {
    if (!pending.has(url)) { // 如果 pending 中不存在当前请求，则添加进去
      pending.set(url, cancel)
    }
  })
}
/**
 * 移除请求
 * @param {Object} config 
 */
const removePending = (config: AxiosRequestConfig) => {
  const url = [
    config.method,
    config.url,
    qs.stringify(config.params),
    qs.stringify(config.data)
  ].join('&')
  if (pending.has(url)) { // 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
    const cancel = pending.get(url)
    cancel(url)
    pending.delete(url)
  }
}

/**
 * 清空 pending 中的请求（在路由跳转时调用）
 */
export const clearPending = () => {
  for (const [url, cancel] of pending) {
    cancel(url)
  }
  pending.clear()
}

// 请求拦截器
http.interceptors.request.use((config: AxiosRequestConfig) => {
  removePending(config) // 在请求开始前，对之前的请求做检查取消操作
  addPending(config) // 将当前请求添加到 pending 中
  //获取token，并将其添加至请求头中
  let token = localStorage.getItem('token')
  if(token){
    config.headers.token = token;
  }
  return config
}, (error: any) => {
  // 错误抛到业务代码
  error.data = {}
  error.data.msg = '服务器异常，请联系管理员！'
  return Promise.resolve(error)
})

// 响应拦截器
http.interceptors.response.use((response: AxiosResponse) => {
  removePending(response) // 在请求结束后，移除本次请求
  const status = response.status
  let msg = ''
  if (status < 200 || status >= 300) {
    // 处理http错误，抛到业务代码
    msg = showStatus(status)
    message.error(msg)
    if (typeof response.data === 'string') {
      response.data = { msg }
    } else {
      response.data.msg = msg
    }
  }
  return response
}, (error: any) => {
  if (axios.isCancel(error)) {
    console.log('repeated request: ' + error.message)
  } else {
    // handle error code
    // 错误抛到业务代码
    error.data = {}
    error.data.msg = '请求超时或服务器异常，请检查网络或联系管理员！'
    message.error(error.data.msg)
  }
  return Promise.reject(error)
})

export default http



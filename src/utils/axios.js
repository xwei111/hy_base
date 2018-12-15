import axios from 'axios'
import { Loading, Message } from 'element-ui';
import store from '@/store'
import { config } from '@/utils/config'

let loadingInstance

const service = axios.create({
  baseURL: config.baseURL,
  timeout: 5000
})

// request拦截器
service.interceptors.request.use(config => {
  // 请求头携带Token
  const { token } = store.state;
  if(token.accessToken) {
    config.headers['accessToken'] = token.accessToken
  }
  if(token.xHyToken) {
    config.headers['x-hy-token'] = token.xHyToken
  }
  // loading开启
  loadingInstance=Loading.service({ 
    fullscreen: true ,
    lock: true,
    text: 'Loading',
    spinner: 'el-icon-loading',
    background: 'rgba(0, 0, 0, 0.7)'
  });
  return config
}, error => {
  Promise.resolve(error)
})

// respone拦截器
service.interceptors.response.use(response => {
  // loading关闭
  loadingInstance.close()
  const result = response.data;
  if(result.statusCode != '200'){
    Message({
      message: result.message,
      type: 'error'
    })
  }
  return response
}, error => {
  // loading关闭
  loadingInstance.close()
  console.log('error', error)
  // do something 拦截响应
  return Promise.reject(error)
})

export default service

import axios from 'axios'
import { Loading, Message } from 'element-ui';
import store from '@/store'

const baseURL = process.env.NODE_ENV === "development"? 'http://172.30.83.29:8080/hyitframeworks-dubbox-rest-war':'http://172.30.83.29:8080/hyitframeworks-dubbox-rest-war'

const service = axios.create({
  baseURL: baseURL,
  timeout: 5000
})

let loadingInstance

// request拦截器
service.interceptors.request.use(config => {
  // 请求头携带Token
  const { token } = store.state;
  if(token.accessToken) {
    config.headers['accessToken'] = token.accessToken
  }
  if(token['x-hy-token']) {
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

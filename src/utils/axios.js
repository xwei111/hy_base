import axios from 'axios'
import { Loading, Message } from 'element-ui';
import store from '@/store'

let baseURL, loadingInstance

const { NODE_ENV } = process.env

// const devhost = 'http://172.30.8.72:8080/hyitframeworks-dubbox-rest-war' // 覃兆俊
// const devhost = 'http://172.30.9.162:8080/hyitframeworks-dubbox-rest-war' // 陈志
// const devhost = 'http://172.30.9.43:8080/hyitframeworks-dubbox-rest-war' // 伟伟
const devhost = 'http://172.30.83.29:8080/hyitframeworks-dubbox-rest-war' // 服务器

switch(NODE_ENV) {
  case 'devtest':
    baseURL = `http://172.30.83.35:8080/hyitframeworks-dubbox-rest-war`
    break
  case 'cz':
    baseURL = `http://172.30.83.107:8080/hyitframeworks-dubbox-rest-war`
    break
  case 'cn':
    baseURL = `http://10.146.247.68:8080/hyitframeworks-dubbox-rest-war`
    break
  case 'production':
    baseURL = window.location.hostname === '172.30.83.29' ? 'http://172.30.83.29:8080/hyitframeworks-dubbox-rest-war' : 'http://183.134.216.97:58080/hyitframeworks-dubbox-rest-war'
    break
  case 'development':
    baseURL = devhost
    break
}

const service = axios.create({
  baseURL: baseURL,
  timeout: 5000
})

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

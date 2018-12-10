import Vue from 'vue'
import axios from '@/utils/axios'
import store from '@/store'

const vuePlugin = () => {
  Vue.mixin({
    data(){
      return{
        predefineColors: Object.freeze([
                  "#409EFF",
                  "#ff4500",
                  "#ff8c00",
                  "#ffd700",
                  "#90ee90",
                  "#00ced1",
                  "#1e90ff",
                  "#c71585",
                  "rgba(255, 69, 0, 0.68)",
                  "rgb(255, 120, 0)",
                  "hsv(51, 100, 98)",
                  "hsva(120, 40, 94, 0.5)",
                  "hsl(181, 100%, 37%)",
                  "hsla(209, 100%, 56%, 0.73)",
                  "#c7158577"
                ])
      }
    },
    methods:{
      /**
       * api请求 (适用于类似操作)
       * @param {api} 方法
       * @param {params} 参数
       * @param {message} 回调提示信息
       */
      m_apiFn(api,params,message){
        return new Promise((resolve)=>{
          api(params).then((data)=>{
            if(data.statusCode == '200'){
              message&&this.$message.success(message)
              resolve(data)
            }
          })
        })
      },
      /**
       * 重置表单操作
       * @param {formName} 表单ref名 
       */
      m_restform(formName) {
        this.$refs[formName].resetFields()
        this.$refs[formName].clearValidate()
      },
      // 设置cookie
      m_setCookies(obj){
        this.$cookies.set(obj.keyName, obj.value, obj.time)
      },
      // 取cookie
      m_getCookies(key) {
        return this.$cookies.get(key)
      },
      // 删除cookie
      m_removeCookies(key) {
        this.$cookies.remove(key)
      },
      /**
       * 缓存页面
       * @param {e} 参数e: 将要缓存页面的name名，例如：{to.name}
       */
      m_setPagesCache(e) {
        let deepKeepAliveArr = JSON.parse(JSON.stringify(store.state.keepAliveArr))
        deepKeepAliveArr[e].keepAlive = deepKeepAliveArr[e].closeTabs
        setTimeout(()=>{
          store.commit('SET_KEEPALIVEARR',deepKeepAliveArr)
        },0)
      },
      /**
       * 不缓存页面
       * @param {e} 参数e: 取消缓存页面的name名
       */
      m_removePagesCache(e) {
        let deepKeepAliveArr = JSON.parse(JSON.stringify(store.state.keepAliveArr))
        deepKeepAliveArr[e].keepAlive = false
        store.commit('SET_KEEPALIVEARR',deepKeepAliveArr)
      }
    },
    beforeRouteEnter(to,from,next) {
      if(store.state.keepAliveArr[to.name]){
        to.meta.keepAlive = store.state.keepAliveArr[to.name].keepAlive
      }
      next()
    }
  })
}

export default vuePlugin

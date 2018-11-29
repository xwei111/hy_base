import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
import * as actions from './actions'
import * as getters from './getters'
import state from './state'
import mutations from './mutations'
import modules from './modules'

import createlogger from 'vuex/dist/logger'//打印日志

const vuexLocal = new VuexPersistence({
  storage: window.sessionStorage,
  reducer: (state) => {
    return {
      menuRouterData: state.menuRouterData,
      token: state.token,
      tabData: state.tabData,
      selectTab: state.selectTab,
      keepAliveArr: state.keepAliveArr,
      appId: state.appId,
      userId: state.userId,
      menuList: state.menuList
    }
  }
})

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'//本地开发的话 为严格模式

export default new Vuex.Store({
  actions,
  getters,
  state,
  mutations,
  modules,
  strict: debug,
  plugins: debug ? [createlogger(), vuexLocal.plugin] : [vuexLocal.plugin]
})

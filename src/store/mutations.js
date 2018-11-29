import * as types from './mutationTypes.js'

const mutations = {
  [types.SET_TOKEN](state, token) {
    state.token = token
  },
  [types.SET_MENUROUTERDATA](state, menuRouterData) {
    state.menuRouterData = menuRouterData
  },
  [types.SET_TABDATA](state, tabData) {
    state.tabData = tabData
  },
  [types.SET_SELECTTAB](state, selectTab) {
    state.selectTab = selectTab
  },
  [types.SET_THEMECOLOR](state, themeColor) {
    state.themeColor = themeColor
  },
  [types.SET_KEEPALIVEARR](state, keepAliveArr) {
    state.keepAliveArr = keepAliveArr
  },
  [types.SET_APPID](state, appId) {
    state.appId = appId
  },
  [types.SET_USERID](state, userId) {
    state.userId = userId
  },
  [types.SET_MENULIST](state, menuList) {
    state.menuList = menuList
  }
}

export default mutations

import config from '@/utils/config' 

const state={
  token: {},
  menuRouterData: [],
  tabData:[],
  selectTab:'',
  themeColor: {...config.themeColor},
  keepAliveArr: {},
  appId:'',
  userId: '',
  menuList: []
}

export default state

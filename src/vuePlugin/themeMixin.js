import { mapGetters, mapMutations } from 'vuex'
import { config } from '@/utils/config' 
import common from '@/utils/common.js'

const themeMixin = {
  data () {
    return {
      isCollapse:false,
      router:true,
      selectMenuList:{},
      threeTopMenuData: [],
      menuData: [],
      childMenu: {},
      index:0,
      topMenuId: null
    }
  },
  props:{
    themeType:{
      type: String,
      default() {
        return ''
      }
    }
  },
  created() {
    if(!this.tabData.length) config.ifToWelcome ? this._toWelcome() : this._notToWelcome()
    this._getFatherData(this.menuList)
  },
  methods: {
    // 主题3头部导航选择触发 e:id
    selectTopIdHandle(e) {
      this.topMenuId = e
      const menuData = JSON.parse(JSON.stringify(this.menuList))
      this.menuData = menuData.find((item)=> item.id == e).children || []
    },
    // 主题3头部导航选择触发 e:path
    selectPathHandle(e) {
      this.selectMenu(e)
    },
    // 选择导航栏
    async selectMenu(index) {
      // 找到选择的导航
      await this._findSelectMenu(this.menuRouterData,index)
      // 设置选中的tabs
      await this.setSelectTab(this.selectMenuList.id)
      // 缓存页面
      await this.m_setPagesCache(this.selectMenuList.name)
      // tabs是否重复
      await this._removeRepeat(this.tabData,this.selectMenuList)
    },
    // 移除tabs
    async removeTab(removeData, tabsData, activeName, nextT){
      // 去除页面缓存
      await this.m_removePagesCache(removeData[0].key)
      // 设置tabs数据
      await this.setTabData(tabsData)
      // 设置当前被选中tabs
      await this.setSelectTab(activeName)
      if(nextT) this.$router.push(nextT.path)
      if(nextT) this._getActivePage(nextT)
    },
    // tabs点击事件
    tabClick(e){
      if(e.path){
        this.$router.push(e.path)
        this.setSelectTab(e.name)
        this._getActivePage(e)
      }
    },
    _findSelectMenu(val,key) {
      val&&val.map((item)=>{
        if(item.children&&item.children.length>0){
          return this._findSelectMenu(item.children,key)
        }else{
          if(item.path == key){
            this.selectMenuList = item
          }
        }
      })
    },
    removeRepeat(val,obj) {
      return new Promise((resolve,reject)=>{
        let ifRepeat = false
        ifRepeat = val.some((item) => item.name == obj.id)
        resolve(ifRepeat)
      })
    },
    _removeRepeat(val,obj){
      this.removeRepeat(val,obj).then((res)=>{
        if(!res){
          let arr = JSON.parse(JSON.stringify(val))
          arr = [...arr,{ title: obj.title, name: obj.id, path: obj.path, key: obj.name }]
          this.$nextTick(()=>this.setTabData(arr))
        }
      })
    },
    showThemeConfig() {
      this.$emit('showThemeConfig')
    },
    _notToWelcome(){
      const { selectTab, menuList, setTabData, setSelectTab } = this
      if(!selectTab){
        let arr = []
        const firstData = menuList[0]
        const defaultId = firstData.path? firstData.id : common.findLastChild(firstData).id
        const defaultTagData = firstData.path?{
          title: firstData.title,
          name: firstData.id,
          path: firstData.path,
          key: firstData.name
        }:{
          title: common.findLastChild(firstData).title,
          name: common.findLastChild(firstData).id,
          path: common.findLastChild(firstData).path,
          key: common.findLastChild(firstData).name
        }
        arr=[...arr,defaultTagData]
        setTabData(arr)
        setSelectTab(defaultId)
      }
    },
    _toWelcome(){
      this.setTabData([{title: '欢迎',name: 'welcome',path: '/welcome',key: 'welcome'}])
      this.setSelectTab('welcome')
    },
    // 主题3获取第一层数据
    _getFatherData(data) {
      if(this.themeType === '3') {
        const selectTopId = window.sessionStorage.getItem('selectTopId')
        data.map((item)=>{
          this.$nextTick(()=>{
            this.threeTopMenuData.push({
              id: item.id ? item.id : item.catalogId,
              icon: item.icon?item.icon:'',
              path: `/main/${item.menuMark}`,
              title: item.title ? item.title : item.catalogName,
              name: item.name?item.name:item.menuMark,
              component: item.component?item.component:''
            })
          })
          if(selectTopId&&item.id == selectTopId) {
            this.menuData = item.children || []
          }else{
            this.menuData = data[0].children
          }
        })
        const { menuList } = this
        const obj ={key: this.$route.name}
        this._getChildMenu(menuList)
        this._getActivePage(obj)
      }
    },
    // 将所有导航数据分类
    _getChildMenu(data){
      data.map((item,index)=>{
        this.childMenu[`menu${index}`] = item
      })
    },
    _getActivePage(e) {
      const { childMenu, threeTopMenuData } = this
      Object.keys(childMenu).map((item)=>{
        if(childMenu[item].name == e.key){
          this.$nextTick(()=>{ this.topMenuId = this.childMenu[item].id })
        }else{
          this._searchFather(childMenu[item].children,e,item)
        }
      })
    },
    _searchFather(val,e,item) {
      val&&val.map((data)=>{
        if(data.name == e.key) this.$nextTick(()=>{ this.topMenuId = this.childMenu[item].id })
        data.children && this._searchFather(data.children,e,item)
      })
    },
    ...mapMutations({
      setTabData: 'SET_TABDATA',
      setSelectTab: 'SET_SELECTTAB',
      setKeepAliveArr: 'SET_KEEPALIVEARR'
    })
  },
  computed:{
    ...mapGetters([
      'menuRouterData',
      'tabData',
      'selectTab',
      'themeColor',
      'keepAliveArr',
      'menuList'
    ])
  }
}

export default themeMixin
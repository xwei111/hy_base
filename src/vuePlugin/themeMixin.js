import { mapGetters, mapMutations } from 'vuex'
import config from '@/utils/config'

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
    if(!this.tabData.length){
      if(!config.ifToWelcome) {
        this._notToWelcome()
      }else{
        this._toWelcome()
      }
    }
    this._getFatherData(this.menuList)
  },
  methods: {
    // 主题3头部导航选择触发 e:id
    selectTopIdHandle(e) {
      const menuData = JSON.parse(JSON.stringify(this.menuList))
      menuData.map((item)=>{
        if(item.id == e){
          this.$nextTick(()=>{
            this.menuData = item.children
          })
        }
      })
    },
    // 主题3头部导航选择触发 e:path
    selectPathHandle(e) {
      this.selectMenu(e)
    },
    // 选择导航栏
    selectMenu(index) {
      const { _findSelectMenu, _removeRepeat, tabData, menuRouterData, setSelectTab, m_setPagesCache, setTabData } = this
      // 找到选择的导航
      _findSelectMenu(menuRouterData,index)
      const selectMenuList = this.selectMenuList;
      // 设置选中的tabs
      setSelectTab(selectMenuList.id)
      // 缓存页面
      m_setPagesCache(selectMenuList.name)
      // tabs是否重复
      _removeRepeat(tabData,selectMenuList).then((res)=>{
        if(!res){
          let arr = JSON.parse(JSON.stringify(tabData))
          arr.push({
            title: selectMenuList.title,
            name: selectMenuList.id,
            path: selectMenuList.path,
            key: selectMenuList.name
          })
          this.$nextTick(()=>{
            setTabData(arr)
          })
        }
      })
    },
    // 移除tabs
    removeTab(removeData, tabsData, activeName, nextT){
      const { m_removePagesCache, setTabData, setSelectTab  } = this
      // 去除页面缓存
      m_removePagesCache(removeData[0].key)
      // 设置tabs数据
      setTabData(tabsData)
      // 设置当前被选中tabs
      setSelectTab(activeName)
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
      if(val){
        val.map((item)=>{
          if(item.children&&item.children.length>0){
            this._findSelectMenu(item.children,key)
          }else{
            if(item.path == key){
              this.selectMenuList = item
              return
            }
          }
        })
      }
    },
    _removeRepeat(val,obj) {
      const p = new Promise((resolve,reject)=>{
        let ifRepeat = false
        val.map((item)=>{
          if(item.name == obj.id){
            ifRepeat =true
          }
        })
        resolve(ifRepeat)
      })
      return p
    },
    showThemeConfig() {
      this.$emit('showThemeConfig')
    },
    _notToWelcome(){
      const { selectTab, menuList, setTabData, setSelectTab, _findLastChild } = this
      if(!selectTab){
        const firstData = menuList[0]
        const defaultId = firstData.path? firstData.id : _findLastChild(firstData).id
        const defaultTagData = firstData.path?{
          title: firstData.title,
          name: firstData.id,
          path: firstData.path,
          key: firstData.name
        }:{
          title: _findLastChild(firstData).title,
          name: _findLastChild(firstData).id,
          path: _findLastChild(firstData).path,
          key: _findLastChild(firstData).name
        }
        let arr = []
        arr.push(defaultTagData)
        setTabData(arr)
        setSelectTab(defaultId)
      }
    },
    _toWelcome(){
      this.setTabData([{
        title: '欢迎',
        name: 'welcome',
        path: '/welcome',
        key: 'welcome'
      }])
      this.setSelectTab('welcome')
    },
    _findLastChild(val) {
      var lastChild 
      if(val.children&&val.children.length>0) {
        return this._findLastChild(val.children[0])
      }else {
        lastChild = val
        return lastChild
      }
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
          this.topMenuId = this.childMenu[item].id
        }else{
          this._searchFather(childMenu[item].children,e,item)
        }
      })
    },
    _searchFather(val,e,item) {
      if(val){
        val.map((data)=>{
          if(data.name == e.key){
            this.topMenuId = this.childMenu[item].id
            return
          }
          if(data.children){
            this._searchFather(data.children,e,item)
          }
        })
      }
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
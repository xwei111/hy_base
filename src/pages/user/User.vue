<template>
  <div class='userBox'>
    <i class='el-icon-message notset'></i>
    <i class='el-icon-setting notset'></i>
    <img class='user' src='../../assets/user.png' />
    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
        <span>ADMIN</span>
        <i class="el-icon-arrow-down el-icon--right"></i>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item command="back">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <img class='more' src='../../assets/more.png' @click='showThemeConfig' />
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
import { loginOut } from '@/api/login'
import { config } from '@/utils/config' 
export default {
  name: 'User',
  data () {
    return {
    }
  },
  methods: {
    handleCommand(e) {
      if(e==='back'){
        loginOut().then((data)=>{
          if(data.statusCode == '200') {
            window.location.href = config.loginOutUrl
            this.$nextTick(()=>{
              this.setMenuRouterData(null)
              this.setToken({})
              this.setTabData([])
              this.setSelectTab('')
              this.setAppid('')
              this.setUserid('')
              this.setMenulist([])
              this.setKeepAliveArr({})
              window.sessionStorage.removeItem('selectTopId')
            })
          }
        })
      }
    },
    showThemeConfig() {
      this.$emit('showThemeConfig')
    },
    ...mapMutations({
      setMenuRouterData: 'SET_MENUROUTERDATA',
      setToken: 'SET_TOKEN',
      setTabData: 'SET_TABDATA',
      setSelectTab: 'SET_SELECTTAB',
      setAppid: 'SET_APPID',
      setUserid: 'SET_USERID',
      setMenulist: 'SET_MENULIST',
      setKeepAliveArr: 'SET_KEEPALIVEARR'
    })
  }
}
</script>
<style scoped>
@import './index.css';
</style>

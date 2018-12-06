<template>
  <div class='themeFirst'>
    <div class='mainBox'>
      <el-scrollbar class='hy_sliderBg'>
        <hyMenu 
          :isCollapse='isCollapse' 
          :menuData='menuData' 
          :bgColor='themeColor.hy_sliderBg' 
          :textColor='themeColor.hy_silderColor' 
          :activeTextColor='themeColor.hy_silderActiveColor'
          :router='router' 
          :mode='mode' 
          :defaultActive='$route.path' 
          @selectMenu='selectMenu'
        >
        </hyMenu>
      </el-scrollbar>
      <div class='contentBox'>
        <div class='flexSpace hy_headerBg'>
          <div class='leftHeader'>
            <div>
              <img @click='isCollapse=true' :class="isCollapse?'hide':'closeOrexpend'" src='../../assets/s.png'>
              <img @click='isCollapse=false' :class="isCollapse?'closeOrexpend':'hide'" src='../../assets/z.png'>
            </div>
          </div>
          <User @showThemeConfig='showThemeConfig'></User>
        </div>
        <hyTabs  
          v-if='ifShowTabs' 
          :tabData='tabData' 
          :selectTab='selectTab' 
          @removeTab='removeTab' 
          @tabClick='tabClick'>
        </hyTabs>
        
        <keep-alive>
          <router-view v-if="$route.meta.keepAlive" class="mainContentScroll"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" class="mainContentScroll"></router-view>
      </div>
      
    </div>
  </div>
</template>

<script>
import User from '../user/User'
import { hyMenu, hyTabs } from '@/components'
import logo from './logo'
import themeMixin from '@/vuePlugin/themeMixin'
export default {
  name: 'ThemeFirst',
  mixins:[themeMixin],
  data() {
    return {
      mode: 'vertical'
    }
  },
  props:{
    ifShowTabs:{
      type: Boolean,
      default() {
        return true
      }
    },
  },
  components: {
    User,
    hyMenu,
    hyTabs,
    logo
  },
  created(){
    this.menuData = JSON.parse(JSON.stringify(this.menuList))
    this.menuData.map((item) => {
      if(!item.icon) {
        item.icon = 'el-icon-menu'
      }
    })
  }
}
</script>
<style scoped>
@import './theme.css';
</style>


<template>
  <div class='themeFirst'>
    <div class='flexSpace hy_headerBg'>
      <div class='leftHeader'>
        <div class='hy_logoBg hy_transition' :class="isCollapse?'smallLeftLogo':'leftLogo'">
          <logo :isCollapse='isCollapse'></logo>
        </div>
        <hyMenu 
          :isCollapse='isCollapse' 
          :menuData='menuList' 
          :bgColor='themeColor.hy_sliderBg' 
          :textColor='themeColor.hy_silderColor' 
          :activeTextColor='themeColor.hy_silderActiveColor'
          :router='router' 
          :mode='mode' 
          :defaultActive='$route.path' 
          @selectMenu='selectMenu'
        >
        </hyMenu>
      </div>
      <User @showThemeConfig='showThemeConfig'></User>
    </div>

    <div class='mainBox'>
      <div class='contentBox'>
        <hyTabs  
          v-if='ifShowTabs' 
          :tabData='tabData' 
          :selectTab='selectTab' 
          @removeTab='removeTab' 
          @tabClick='tabClick'>
        </hyTabs>
        
        <keep-alive>
            <el-scrollbar v-if="$route.meta.keepAlive" class='mainContentScroll'>
              <router-view class="mainContent"></router-view>
            </el-scrollbar>
        </keep-alive>
        <el-scrollbar v-if="!$route.meta.keepAlive" class='mainContentScroll'>
          <router-view class="mainContent"></router-view>
        </el-scrollbar>
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
  name: 'Main',
  mixins:[themeMixin],
  props:{
    ifShowTabs:{
      type: Boolean,
      default() {
        return true
      }
    },
  },
  data() {
    return {
      mode: 'horizontal'
    }
  },
  components: {
    User,
    hyMenu,
    hyTabs,
    logo
  }
}
</script>
<style scoped>
@import './theme.css';
</style>


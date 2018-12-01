<template>
  <div class='themeFirst'>

    <div class='flexSpace hy_headerBg'>

        <div class='leftHeader'>
          <div class='hy_logoBg hy_transition' :class="isCollapse?'smallLeftLogo':'leftLogo'">
            <logo :isCollapse='isCollapse'></logo>
          </div>
          <themeThreeTopMenu :threeTopMenuData='threeTopMenuData' @selectTopIdHandle='selectTopIdHandle' @selectPathHandle='selectPathHandle' :topMenuId='topMenuId'></themeThreeTopMenu>
        </div>
        <User @showThemeConfig='showThemeConfig'></User>
      </div>

    <div class='mainBox'>
      <el-scrollbar class='hy_sliderBg'>
        <div v-if='menuData'>
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
        </div>
      </el-scrollbar>
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
import themeThreeTopMenu from './themeThreeTopMenu'
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
      mode: 'vertical'
    }
  },
  components: {
    User,
    hyMenu,
    hyTabs,
    logo,
    themeThreeTopMenu
  }
}
</script>
<style scoped>
@import './theme.css';
</style>


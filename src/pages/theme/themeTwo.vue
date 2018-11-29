<template>
  <div class='themeTwo'>
      <div class='flexSpace hy_headerBg'>
        <div class='leftLogo'>
          <logo :isCollapse='isCollapse'></logo>
        </div>
        <div class='rightMenuUser flexSpace'>
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
          <User @showThemeConfig='showThemeConfig'></User>
        </div>
      </div>

      <div class='mainContentBox'>
        <hyTabs 
          class='hyTabs' 
          v-if='ifShowTabs' 
          :tabData='tabData' 
          :selectTab='selectTab' 
          @removeTab='removeTab' 
          @tabClick='tabClick'>
        </hyTabs>
        
        <keep-alive>
            <router-view class='mainContent' v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive" class='mainContent'></router-view>

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
@import './two.css';
</style>


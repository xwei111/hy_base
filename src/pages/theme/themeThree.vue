<template>
  <div class='themeTwo'>
      <div class='flexSpace hy_headerBg'>
        <div class='leftLogo'>
          <logo :isCollapse='isCollapse'></logo>
        </div>
        <div class='rightMenuUser flexSpace'>
          <themeThreeTopMenu :threeTopMenuData='threeTopMenuData' @selectTopIdHandle='selectTopIdHandle' @selectPathHandle='selectPathHandle' :topMenuId='topMenuId'></themeThreeTopMenu>
          <User @showThemeConfig='showThemeConfig'></User>
        </div>
      </div>

      <div class='mainContentBox'>
      	<div v-if='menuData' class='menuBox'>
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
        
        <div class="leftMainContent">
          <hyTabs
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
@import './three.css';
</style>


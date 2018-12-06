<template>
  <div class='main'>

    <themeFirst v-if="themeType==='1'" :themeType='themeType' @showThemeConfig='showThemeConfig' :ifShowTabs='ifShowTabs'></themeFirst>
    <themeTwo v-if="themeType==='2'" :themeType='themeType' @showThemeConfig='showThemeConfig' :ifShowTabs='ifShowTabs'></themeTwo>
    <themeThree v-if="themeType==='3'" :themeType='themeType' @showThemeConfig='showThemeConfig' :ifShowTabs='ifShowTabs'></themeThree>
    <themeFour v-if="themeType==='4'" :themeType='themeType' @showThemeConfig='showThemeConfig' :ifShowTabs='ifShowTabs'></themeFour>
    <hyConfigTheme 
      :showConfigTheme='showConfigTheme' 
      @closeConfigTheme='closeConfigTheme' 
      @switchChange='switchChange' 
      @changeThemeHandle='changeThemeHandle'
    >
    </hyConfigTheme>
  </div>
</template>

<script>
import { hyConfigTheme } from '@/components'
import themeFirst from '../theme/themeFirst'
import themeTwo from '../theme/themeTwo'
import themeThree from '../theme/themeThree'
import themeFour from '../theme/themeFour'
import { config } from '@/utils/config' 
export default {
  name: 'Main',
  data () {
    return {
      themeType: config.themeType,
      showConfigTheme: false,
      ifShowTabs: true
    }
  },
  components: {
    hyConfigTheme,
    themeFirst,
    themeTwo,
    themeThree,
    themeFour
  },
  created() {
    const ifShowTabs = window.localStorage.getItem('ifShowTabs')
    const hyTheme = window.localStorage.getItem('hyTheme')
    ifShowTabs && this.setIfShiwTabs(ifShowTabs)
    hyTheme && this.setHyTheme(Number(hyTheme))
  },
  methods: {
    changeThemeHandle(e) {
      this.setHyTheme(e)
    },
    setIfShiwTabs(e) {
      if(e == 1){
        this.ifShowTabs = true
      }else{
        this.ifShowTabs = false
      }
    },
    setHyTheme(e) {
      switch(e){
        case 0:
          this.themeType = '1'
          break;
        case 1:
          this.themeType = '2'
          break;
        case 2:
          this.themeType = '3'
          break;
        case 3:
          this.themeType = '4'
          break;
      }
    },
    closeConfigTheme() {
      this.showConfigTheme = false
    },
    switchChange(e) {
      this.ifShowTabs = e
    },
    showThemeConfig() {
      this.showConfigTheme = !this.showConfigTheme
    }
  }
}
</script>
<style scoped>
@import './index.css';
</style>


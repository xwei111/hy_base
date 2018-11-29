<template>
  <transition name="fade">
    <div class='configThemeBox' v-show='showConfigTheme' >
      <div class='config'>
        <p class='title'>设置主题</p>

        <ul class='themeList'>
          <li class='themeFirst' :class="selectId==0?'selectTheme':''" @click='changeThemeHandle(0)'>
            <p><p>
            <div class='themeMain'>
              <div></div>
              <span>主题一</span>
            </div>
          </li>
          <li class='themeTwo' :class="selectId==1?'selectTheme':''" @click='changeThemeHandle(1)'>
            <p><p>
            <div> 主题二</div>
          </li>
          <li class='themeFirst' :class="selectId==2?'selectTheme':''" @click='changeThemeHandle(2)'>
            <p><i class='themeThree'></i><p>
            <div class='themeMain'>
              <div></div>
              <span>主题三</span>
            </div>
          </li>
        </ul>

        <div class='themeColor'>
          <span>logo背景色</span>
          <el-color-picker v-model="hy_logoBg" @change="logoChange" :predefine="predefineColors"></el-color-picker>
        </div>
        <div class='themeColor'>
          <span>header背景色</span>
          <el-color-picker v-model="hy_headerBg" @change="headerChange" :predefine="predefineColors"></el-color-picker>
        </div>
        <div class='themeColor'>
          <span>silder背景色</span>
          <el-color-picker v-model="hy_sliderBg" @change="sliderChange" :predefine="predefineColors"></el-color-picker>
        </div>
        <div class='themeColor'>
          <span>silder字体颜色</span>
          <el-color-picker v-model="hy_silderColor" @change="sliderColorChange" :predefine="predefineColors"></el-color-picker>
        </div>
        <div class='themeColor'>
          <span>silder选中字体颜色</span>
          <el-color-picker v-model="hy_silderActiveColor" @change="sliderActiveColorChange" :predefine="predefineColors"></el-color-picker>
        </div>
        <div class='themeColor'>
          <span>element主题色</span>
          <hyElementTheme></hyElementTheme>
        </div>
        <div class='themeColor'>
          <span v-if='ifShowTabs'>显示Tabs</span>
          <span v-else>不显示Tabs</span>
          <el-switch v-model="ifShowTabs" @change='switchChange'></el-switch>
        </div>
        
      </div>
      <div class='modal' @click='closeConfigTheme'></div>
    </div>
  </transition>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import hyElementTheme from '../hyElementTheme'
import hyButtons from '../hyButtons'
import config from '@/utils/config' 
export default {
  name: 'hyConfigTheme',
  props: {
    showConfigTheme:{
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      ifShowTabs: config.ifShowTabs,
      hy_logoBg: '',
      hy_headerBg: '',
      hy_sliderBg: '',
      hy_silderColor: '',
      hy_silderActiveColor: '',
      selectId: Number(config.themeType) - 1
    }
  },
  components: {
    hyElementTheme,
    hyButtons
  },
  created() {
      const selectThemeColor = JSON.parse(window.localStorage.getItem('selectThemeColor'))
      const hyTheme = window.localStorage.getItem('hyTheme')
      const ifShowTabs = window.localStorage.getItem('ifShowTabs')
      if(selectThemeColor){
        this.setThemeColor(selectThemeColor)
      }
      Object.assign(this, this.themeColor)
      this.appendStyle(this.objKeys(this.themeColor))
      if(hyTheme){
        this.selectId = hyTheme
      }
      if(ifShowTabs){
        if(ifShowTabs == 1) {
          this.ifShowTabs = true
        }else{
          this.ifShowTabs = false
        }
      }
      
  },
  methods: {
    closeConfigTheme() {
      this.$emit('closeConfigTheme')
    },
    logoChange(e) {
      this._selectColor(e,'hy_logoBg','rgb(84, 92, 100)')
    },
    headerChange(e) {
      this._selectColor(e,'hy_headerBg','rgb(84, 92, 100)')
    },
    sliderChange(e) {
      this._selectColor(e,'hy_sliderBg','rgb(84, 92, 100)')
    },
    sliderColorChange(e) {
      this._selectColor(e,'hy_silderColor','#f3f3f3')
    },
    sliderActiveColorChange(e) {
      this._selectColor(e,'hy_silderActiveColor','#409EFF')
    },
    _selectColor(e,val,color) {
       if(e){
        val = e
      }else{
        this[val] = color
      }
      this.$nextTick(()=>{
        this.setColor()
      })
      
    },
    setColor() {
      let selectThemeColor = {
        hy_logoBg: this.hy_logoBg,
        hy_headerBg: this.hy_headerBg,
        hy_sliderBg: this.hy_sliderBg,
        hy_silderColor: this.hy_silderColor,
        hy_silderActiveColor: this.hy_silderActiveColor
      }
      window.localStorage.setItem('selectThemeColor',JSON.stringify(selectThemeColor))
      this.setThemeColor(selectThemeColor)
    },
    appendStyle(themeStr) {
      var styleTag = document.createElement("style");
      styleTag.setAttribute("id", 'defaultTheme');
      styleTag.innerText = themeStr
      document.head.appendChild(styleTag);
    },
    deleteStyle() {
      const deleteNode = document.getElementById('defaultTheme')
      deleteNode.remove()
    },
    switchChange(e) {
      let type
      if(e) {
        type = 1
      }else{
        type = 2
      }
      window.localStorage.setItem('ifShowTabs', type)
      this.$emit('switchChange', e)
    },
    changeThemeHandle(e) {
      this.selectId = e
      this.$emit('changeThemeHandle', e)
      window.localStorage.setItem('hyTheme', e)
    },
    objKeys(val) {
      let themeStr = ''
      Object.keys(val).map((key)=>{
        if(key.indexOf('Bg')>-1) themeStr+= `.${key}{background:${val[key]}} `
        if(key.indexOf('Color')>-1) themeStr+= `.${key}{color:${val[key]}} `
      })
      return themeStr
    },
    ...mapMutations({
      setThemeColor:'SET_THEMECOLOR'
    })
  },
  watch:{
    themeColor(val){
      this.deleteStyle()
      this.appendStyle(this.objKeys(val))
    }
  },
  computed:{
    ...mapGetters([
      'themeColor'
    ])
  }
}
</script>

<style scoped>
@import './index.css';
</style>
<style>

</style>

<template>
  <ul class='threeTopMenu'>
    <li :class="selectTopId==item.id?'hy_silderActiveColor':'hy_silderColor'" v-for="item in threeTopMenuData" :key="item.id" @click='selectTopMenu(item)'>
      <i v-if='item.icon' :class='item.icon'></i>
      <span>{{item.title}}</span>
    </li>
  </ul>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'themeThreeTopMenu',
  props:{
    threeTopMenuData:{
      type: Array,
      default() {
        return []
      }
    },
    topMenuId:{
    	type:String,
    	default() {
    		return ''
    	}
    }
  },
  data() {
    return {
      selectTopId: '',
      selectPath: ''
    }
  },
  methods: {
    selectTopMenu(e) {
      this.selectTopId = e.id
      window.sessionStorage.setItem('selectTopId',this.selectTopId)
      const menuList = JSON.parse(JSON.stringify(this.menuList))
      menuList.map((item)=>{
      	if(item.id == e.id){
      		if(item.children){
      			this.$router.push(this._findLastChild(item.children[0]).path)
      			this.selectPath = this._findLastChild(item.children[0]).path 
      		}else{
      			this.$router.push(item.path)
      			this.selectPath = item.path 
      		}
      	}
      })
    },
    _findLastChild(val) {
      var lastChild 
      if(val.children&&val.children.length>0) {
        return this._findLastChild(val.children[0])
      }else {
        lastChild = val
        return lastChild
      }
    }
  },
  watch: {
    threeTopMenuData(val) {
      const selectTopId = window.sessionStorage.getItem('selectTopId')
      this.$nextTick(()=>{
	      if(selectTopId){
	        this.selectTopId = selectTopId
	      }else if(this.topMenuId){
	      	this.selectTopId = this.topMenuId
	      }else{
	      	this.selectTopId = this.threeTopMenuData[0].id
	      }
      })
      
    },
    selectTopId(e) {
      this.$emit('selectTopIdHandle',e)
    },
    selectPath(e) {
      this.$emit('selectPathHandle',e)
    },
    topMenuId(e){
    	this.selectTopId = e
    }
  },
  computed:{
    ...mapGetters([
      'menuList'
    ])
  }
}
</script>
<style scoped>
@import '../../styles/var/layout.css';
@import '../../styles/var/color.css';
.threeTopMenu{
  flex: 1;
  display: flex;
  & li{
    cursor: pointer;
    padding: 5px 15px;
    font-size: 14px;
    & span{
      margin-left: 5px;
    }
  }
}
</style>

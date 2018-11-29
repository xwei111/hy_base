<template>
    <div class='hyTabs'>
      <el-tabs class='tabs' v-model="mySelectTab" type="card" closable @tab-remove="removeTab" @tab-click='tabClick'>
        <el-tab-pane
          v-for="item in myTabData"
          :key="item.name"
          :label="item.title"
          :name="item.name"
        >
        </el-tab-pane>
      </el-tabs>
    </div>
</template>

<script>
/**
 * @param {tabData} 选项卡数据 {title:'',name:'',path:''},title:标题，name:唯一id值，path:跳转路由
 * @param {selectTab} 选中tab的name值
 * @function removeTab(removeData,tabsData,activeName,nextT) 移除tab,removeData:移除的数据,tabsData:移除后tabs数据，activeName:移除后的被选中的tab的name值,nexT下一个选中的tab数据
 * @function tabClick(e) 点击tab事件，e:选中的tab数据
 */
export default {
  name: "hyTabs",
  props:{
    tabData:{
      type:Array,
      default() {
        return []
      }
    },
    selectTab:{
      type:String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {
      myTabData: this.tabData,
      mySelectTab: this.selectTab
    };
  },
  methods: {
    removeTab(targetName) {
      if(this.myTabData.length<2) return
      let tabs = this.myTabData;
      let activeName = this.mySelectTab;
      var nextT
      if (activeName === targetName) {
        tabs.forEach((tab, index) => {
          if (tab.name === targetName) {
            let nextTab = tabs[index + 1] || tabs[index - 1];
            nextT = nextTab
            if (nextTab) {
              activeName = nextTab.name;
            }
          }
        });
      }
      this.mySelectTab = activeName;
      this.myTabData = tabs.filter(tab => tab.name !== targetName);
      var removeData = tabs.filter(tab => tab.name == targetName);
      this.$emit('removeTab',removeData,this.myTabData, activeName, nextT)
    },
    tabClick(tab, event){
      const { name } = tab
      this.myTabData.map((item)=>{
        if(item.name == name){
          this.$emit('tabClick', item)
        }
      })
    }
  },
  watch:{
    tabData(val){
      this.myTabData = val
    },
    selectTab(val){
      this.mySelectTab = val
    }
  }
};
</script>

<style scoped>
.hyTabs{
  height: 41px;
  background: #fff;
  width: 100%;
}
</style>
<template>
    <div>
        <el-button class='btn' v-for='item in buttonsData' size='small' :key='item.id' :type="mySelectId==item.id?'primary':''" @click='selectButtons(item.id)'>{{item.text}}</el-button>
    </div>
</template>

<script>
/**
 * @param {buttonsData} 按钮组数据 {id:0,text:'content'} id为按钮唯一ID值 text为按钮显示文本
 * @function selectButtons(e) 选择按钮事件 e为按钮唯一ID值
 */
export default {
  name: 'hyBUttons',
  props: {
    buttonsData: {
      type: Array,
      default() {
        return []
      }
    },
    selectId: {
      type: Number,
      default() {
        return 0
      }
    }
  },
  data() {
    return {
      mySelectId: this.selectId
    }
  },
  created() {
    if (this.buttonsData.length > 0 && this.buttonsData[0].id !== undefined) {
      if (!isNaN(this.buttonsData[0].id)) {
        this.mySelectId = this.buttonsData[0].id
      }
    }
  },
  methods: {
    selectButtons(e) {
      this.mySelectId = e
      this.$emit('selectButtons', e)
    }
  },
  watch:{
    selectId(val) {
      this.mySelectId = val
    }
  }
}
</script>

<style scoped>
</style>
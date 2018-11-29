<template>
  <div>
    <el-transfer
      filterable
      filter-placeholder= "请输入搜索内容"
      v-model= "selectTranData"
      :data= "transferData"
      :props= 'otherName'
      :titles= "transferTitles"
    >
      <el-button v-if='ifLeftHaveDone' class="transfer-footer" slot="left-footer" size="small">操作</el-button>
      <el-button v-if='ifrightHaveDone' class="transfer-footer" slot="right-footer" size="small">操作</el-button>
    </el-transfer>
  </div>
</template>

<script>
/**
 * 必填
 * @param {transferData} 穿梭框数据
 */
/**
 * 选填
 * @param {selectTranData} 右侧已选中数据
 * @param {otherName} 给字段起别名 默认{key:'id',label:'label'}
 * @param {transferTitles} 头部标题
 * @param {ifLeftHaveDone} 是否有左侧底部操作
 * @param {ifrightHaveDone} 是否有右侧底部操作
 */
export default {
  name: 'hyTransfer',
  props: {
    transferData: {
      type: Array,
      default() {
        return []
      }
    },
    selectTranData: {
      type: Array,
      default() {
        return []
      }
    },
    otherName: {
      type:Object,
      default() {
        return {
          key: 'id',
          label: 'label'
        }
      }
    },
    transferTitles: {
      type: Array,
      default() {
        return ['left', 'right']
      }
    },
    ifLeftHaveDone: {
      type: Boolean,
      default() {
        return false
      }
    },
    ifrightHaveDone: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  }
};
</script>

<style scoped>
@import './index.css'
</style>

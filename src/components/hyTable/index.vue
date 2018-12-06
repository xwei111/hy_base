<template>
  <div>
    <el-table :data="formatData" @selection-change="handleSelectionChange" @expand-change="handleExpandChange" :row-style="showRow" v-bind="$attrs" :header-cell-style='headerCellStyle' :cell-style='cellStyle' :size='size' style="width: 100%">
      <!-- 是否显示序列 -->
      <el-table-column type="index" width="55" v-if="ifHaveIndex" align='center'>
      </el-table-column>
      <!-- 是否多选 -->
      <el-table-column type="selection" width="55" v-if="ifHaveCheckBox" align='center'>
      </el-table-column>
      <!-- 是否展开 -->
      <el-table-column v-if="ifIsExpand&&expandCloumns.length===0" width="150">
        <template slot-scope="scope">
          <span v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
          <span class="tree-ctrl" v-if="iconShow(0,scope.row)" @click="toggleExpanded(scope.$index)">
            <i v-if="!scope.row._expanded" class="el-icon-plus pointer"></i>
            <i v-else class="el-icon-minus pointer"></i>
          </span>
          {{scope.$index}}
        </template>
      </el-table-column>
      <el-table-column v-if="ifIsExpand&&expandCloumns.length>0" v-for="(column, index) in expandCloumns" :key="column.value" :label="column.text" :width="column.width">
        <template slot-scope="scope">
          <span v-if="index === 0" v-for="space in scope.row._level" class="ms-tree-space" :key="space"></span>
          <span class="tree-ctrl" v-if="iconShow(index,scope.row)" @click="toggleExpanded(scope.$index)">
            <i v-if="!scope.row._expanded" class="el-icon-plus pointer"></i>
            <i v-else class="el-icon-minus pointer"></i>
          </span>
          {{scope.row[column.value]}}
        </template>
      </el-table-column>
      <!-- table数据 -->
      <el-table-column v-for='(item,index) in column' :key='item.key' :label='item.label' align='center'>
        <template slot-scope="scope">
          <span v-if="scope.row[item.key]===undefined||scope.row[item.key]===null||scope.row[item.key]===''||scope.row[item.key].toString().trim()==''">--</span>
          <el-popover placement="top" trigger="hover" v-else-if='scope.row[item.key].toString().trim().length>showLen&&showLen>0&&showLen!=0' :content="scope.row[item.key].toString()">
            <span slot="reference">{{ `${scope.row[item.key].toString().trim().slice(0,showLen)}...` }}</span>
          </el-popover>
          <span v-else>{{ scope.row[item.key] }}</span>
        </template>
      </el-table-column>
      <!-- 修改删除操作 -->
      <el-table-column label='操作' align='center' width='150' v-if='isHaveEdit||isHaveDelete||isHaveSuspend||isHaveRecovery||isHaveAdd'>
        <template slot-scope="scope">
          <i class="el-icon-edit pointer" v-if='isHaveEdit' @click='editHandle(scope)'></i>
          <i class="el-icon-delete pointer" v-if='isHaveDelete' @click='deleteHandle(scope)'></i>
          <i class="el-icon-circle-plus-outline pointer" v-if='isHaveAdd' @click="addHandle(scope)"></i>
          <span class="text pointer" v-if='isHaveSuspend&&!scope.row.ifZ' @click='suspendHandle(scope)'>暂停</span>
          <span class="text pointer" v-if='isHaveRecovery&&scope.row.ifZ' @click='recoveryHandle(scope)'>恢复</span>
        </template>
      </el-table-column>
      <slot></slot>
    </el-table>
  </div>
</template>

<script>
/**
 * 必填
 * @param {tableData} 表格数据
 * @param {column} 表格头数据{key:'',label:''} key代表唯一ID值,label代表名称
 */

/**
 * 选填
 * @param {showLen} 表格内容显示多长(超过改长度的显示...)
 * @param {isHaveEdit} 是否有修改
 * @function editHandle(scope) 修改事件,scope为修改行数据
 * @param {isHaveDelete} 是否有删除
 * @function deleteHandle(scope) 删除事件,scope为删除行数据
 * @param {isHaveAdd} 是否有添加
 * @function addHandle(scope) 添加事件,scope为添加行数据
 * @param {isHaveSuspend} 是否有暂停
 * @function suspendHandle(scope) 暂停事件,scope为暂停行数据
 * @param {isHaveSuspend} 是否有恢复
 * @function recoveryHandle(scope) 恢复事件,scope为恢复行数据
 * @param {ifHaveCheckBox} 是否显示多选
 * @function handleSelectionChange(val) 多选事件 val为选中项数据
 * @param {ifIsExpand} 是否展示tableTree
 * @function handleExpandChange(val) 展开事件 val为展开项数据
 * @param {ifHaveIndex} 是否显示序列号
 */
 import treeToArray from './eval'
export default {
  name: 'hyTable',
  props: {
    tableData: {
      type: Array,
      default() {
        return []
      }
    },
    column: {
      type: Array,
      default() {
        return []
      }
    },
    size:{
      type: String,
      default:()=>'medium '
    },
    expandCloumns: {
      type: Array,
      default: () => [{width: '100'}]
    },
    isHaveEdit: {
      type: Boolean,
      default() {
        return false
      }
    },
    isHaveDelete: {
      type: Boolean,
      default() {
        return false
      }
    },
    isHaveAdd: {
      type: Boolean,
      default() {
        return false
      }
    },
    isHaveSuspend: {
      type: Boolean,
      default() {
        return false
      }
    },
    isHaveRecovery: {
      type: Boolean,
      default() {
        return false
      }
    },
    showLen: {
      type: Number,
      default() {
        return 0
      }
    },
    ifHaveCheckBox: {
      type: Boolean,
      default() {
        return false
      }
    },
    ifIsExpand: {
      type: Boolean,
      default() {
        return false
      }
    },
    ifHaveIndex: {
      type: Boolean,
      default() {
        return false
      }
    },
    evalFunc: Function,
    evalArgs: Array,
    expandAll: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  computed: {
    // 格式化数据源
    formatData: function() {
      if(this.ifIsExpand){
        let tmp
        if (!Array.isArray(this.tableData)) {
          tmp = [this.tableData]
        } else {
          tmp = this.tableData
        }
        const func = this.evalFunc || treeToArray
        const args = this.evalArgs ? Array.concat([tmp, this.expandAll], this.evalArgs) : [tmp, this.expandAll]
        return func.apply(null, args)
      }else{
        return this.tableData
      }
    }
  },
  methods: {
    editHandle(scope) {
      this.$emit('editHandle', scope)
    },
    deleteHandle(scope) {
      this.$emit('deleteHandle', scope)
    },
    addHandle(scope){
      this.$emit('addHandle', scope)
    },
    suspendHandle(scope) {
      this.$emit('suspendHandle', scope)
    },
    recoveryHandle(scope) {
      this.$emit('recoveryHandle', scope)
    },
    handleSelectionChange(val) {
      this.$emit('handleSelectionChange', val)
    },
    handleExpandChange(val) {
      this.$emit('handleExpandChange', val)
    },
    showRow: function(row) {
      const show = (row.row.parent ? (row.row.parent._expanded && row.row.parent._show) : true)
      row.row._show = show
      return show ? 'animation:treeTableShow 1s;-webkit-animation:treeTableShow 1s;' : 'display:none;'
    },
    // 切换下级是否展开
    toggleExpanded: function(trIndex) {
      const record = this.formatData[trIndex]
      record._expanded = !record._expanded
    },
    // 图标显示
    iconShow(index, record) {
      return (index === 0 && record.children && record.children.length > 0)
    },
    cellStyle(param) {
      if (param.columnIndex === 0) {
        return {
          'text-align': 'center'
        }
      }
      return {}
    },
    headerCellStyle(param) {
      if (param.columnIndex === 0) {
        return {
          'text-align': 'center',
          'font-size': '14px'
        }
      }
      return {
        'font-size': '14px'
      }
    }
  }
}
</script>

<style scoped>
@import './index.css';
</style>

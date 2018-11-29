<template>
  <div class='treeBox'>
    <el-input v-if='ifShowTreeSearch'  placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
    <el-tree
      :accordion='accordion' 
      :data="treeData" 
      :props="defaultTreeProps" 
      @node-click="treeClick" 
      :show-checkbox='showTreeCheckBox' 
      @check-change="treeSelect"
      :draggable='draggable'
      :filter-node-method="filterNode"
      :node-key="treeNodeKey"
      :default-expand-all='ifExpandAll'
      :expand-on-click-node='ifClickNodeExpand'
      ref='hyTree'
    >
      <span class='treeSlot' slot-scope="{node, data}" @mouseover="mouseover(data[treeNodeKey])" @mouseout="mouseout(data[treeNodeKey])">
        <span style='padding-top:6px'>{{node.label}}</span>
        <span v-if='ifCanDoSomethings.ifPromise && data[treeNodeKey]==mouseHoverNode'>
          <i class="el-icon-circle-plus-outline icon" v-if='ifCanDoSomethings.operation.append' @click='append(node, data)'></i>
          <i class="el-icon-edit icon" v-if='ifCanDoSomethings.operation.edit' @click='edit(node, data)'></i>
          <i class="el-icon-delete icon" v-if='ifCanDoSomethings.operation.remove' @click='remove(node, data)'></i>
        </span>
      </span>
    </el-tree>
  </div>
</template>

<script>
/**
 * 必填
 * @param {treeData} 树形结构数据
 */

/**
 * 选填
 * @param {defaultTreeProps} 节点属性 {children: 'children', label: 'label'} children为子节点属性，label为该节点属性
 * @param {treeDefaultCheck} 被选中节点，key或者节点两种形式，建议以key为标准
 * @param {ifExpandAll} 是否展开所有节点
 * @param {accordion} 是否每次只打开一个同级树节点展开
 * @param {draggable} 是否可以拖拽
 * @param {ifShowTreeSearch} 是否提供搜索功能
 * @param {showTreeCheckBox} 是否可以多选(checkbox)
 * @param {treeDefaultExpand} 展开节点，该数据为节点唯一标识(node-key)，例如：id
 * @param {ifCanDoSomethings} 是否有增删改事件 {ifPromise:false,operation: {append: false,edit: false,remove: false}} ifPromise:是否有操作，append是否有添加，edit是否有编辑，remove是否有删除
 * @function treeAppendChild 增加子节点
 * @function treeEditChild 修改节点数据
 * @function treeRemoveChild 移除节点
 * @function treeClick(e) 点击节点事件，e为点击节点数据
 * @function treeSelect(data,treeCheckedKeys,treeCheckedNodes,checked,indeterminate) 选择checkbox事件 data:选中的节点数据，treeCheckedKeys:所有被选中节点key的集合,treeCheckedNodes:所有被选中节点的数据集合
 */
export default {
  name: 'hyTree',
  props: {
    treeData: {
      type: Array,
      default() {
        return []
      }
    },
    defaultTreeProps: {
      type: Object,
      default() {
        return { children: 'children', label: 'label' }
      }
    },
    showTreeCheckBox: {
      type: Boolean,
      default() {
        return false
      }
    },
    accordion: {
      type: Boolean,
      default() {
        return false
      }
    },
    draggable: {
      type: Boolean,
      default() {
        return false
      }
    },
    ifShowTreeSearch: {
      type: Boolean,
      default() {
        return false
      }
    },
    treeNodeKey: {
      type: String,
      default() {
        return 'id'
      }
    },
    treeDefaultCheck: {
      type: Array,
      default() {
        return []
      }
    },
    treeDefaultExpand: {
      type: Array,
      default() {
        return []
      }
    },
    ifExpandAll: {
      type: Boolean,
      default() {
        return false
      }
    },
    ifCanDoSomethings: {
      type: Object,
      default() {
        return {
          ifPromise: false,
          operation: {
            append: false,
            edit: false,
            remove: false
          }
        }
      }
    },
    ifClickNodeExpand: {
      type: Boolean,
      default() {
        return false
      }
    }
  },
  data() {
    return {
      filterText: '',
      allExpand: [],
      mouseHoverNode: ''
    }
  },
  created() {
    this.$nextTick(() => {
      this.$refs.hyTree.setCheckedKeys(this.treeDefaultCheck)
      !this.ifExpandAll && this.setDefaultCheck(this.treeDefaultExpand)
    })
  },
  watch: {
    filterText(val) {
      this.$refs.hyTree.filter(val)
    },
    treeDefaultCheck(val) {
      if (Object.prototype.toString.call(val[0]) === '[object Object]') {
        this.$refs.hyTree.setCheckedNodes(val)
      } else {
        this.$refs.hyTree.setCheckedKeys(val)
      }
    },
    treeDefaultExpand(val) {
      this.setDefaultCheck(val)
    }
  },
  methods: {
    setDefaultCheck(val) {
      this.allExpand = []
      this.closeAllExpand()
      const treeAllNodes = this.$refs.hyTree.store._getAllNodes()
      this.getAllExpandNodes(val)
        .then(data => {
          data.map(e => {
            treeAllNodes.map(item => {
              if (item.key === e) {
                item.expanded = true
              }
            })
          })
        })
        .catch(() => {
          this.closeAllExpand()
        })
    },
    getAllExpandNodes(val) {
      const len = val.length
      const p = new Promise((resolve, reject) => {
        let getAllNodes
        if (len > 0) {
          val.map(e => {
            const currentNode = this.$refs.hyTree.getNode(e)
            getAllNodes = this.getAllExpand(currentNode)
          })
          resolve(Array.from(new Set(getAllNodes)))
        } else {
          reject(0)
        }
      })
      return p
    },
    getAllExpand(val) {
      if (val.key) {
        this.allExpand.push(val.key)
      }
      if (val.parent) {
        this.getAllExpand(val.parent)
      }
      return this.allExpand
    },
    closeAllExpand() {
      const treeAllNodes = this.$refs.hyTree.store._getAllNodes()
      treeAllNodes.map(item => {
        item.expanded = false
      })
    },
    treeClick(e) {
      this.$emit('treeClick', e)
    },
    treeSelect(data, checked, indeterminate) {
      const treeCheckedKeys = this.$refs.hyTree.getCheckedKeys()
      const treeCheckedNodes = this.$refs.hyTree.getCheckedNodes()
      this.$emit(
        'treeSelect',
        data,
        treeCheckedKeys,
        treeCheckedNodes,
        checked,
        indeterminate
      )
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    mouseover(e) {
      this.mouseHoverNode = e
    },
    mouseout(e) {
      this.mouseHoverNode = ''
    },
    append(data) {
      // this.$refs.hyTree.append({id:10,label:'test'}, data.key) // 添加子节点
      this.$emit('treeAppendChild', data)
    },
    edit(data) {
      this.$emit('treeEditChild', data)
    },
    remove(data) {
      // this.$refs.hyTree.remove(data.key) // 删除tree节点
      this.$emit('treeRemoveChild', data)
    }
  }
}
</script>

<style scoped>
@import './index.css'
</style>


<template>
  <div>
    <el-dialog :title="title" :visible.sync="dialogVisible" width="600px" :before-close="closeHandle">
      <slot></slot>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeHandle">取 消</el-button>
        <el-button type="primary" @click="sureHandle">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
/**
 * 必填
 * @param { dialogVisible } 弹窗是否显示
 * @function closeHandle 关闭事件
 * @function sureHandle 确定事件
 */
/**
 * 选填
 * @param { title } 标题
*/
export default {
  name: 'hyModal',
  props: {
    dialogVisible: {
      type: Boolean,
      default() {
        return false
      }
    },
    title: {
      type: String,
      default() {
        return ''
      }
    }
  },
  data() {
    return {}
  },
  methods: {
    closeHandle() {
      this.$emit('closeHandle')
    },
    sureHandle() {
      this.$emit('sureHandle')
    }
  }
}
</script>

<style scoped>
</style>

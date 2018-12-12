<template>
  <el-form ref='form' :rules='rules' :inline="ifInLine" :model="formData" class="" :size='size' :label-position="labelPosition">

    <el-form-item v-for='item in formConfig' :key='item.key' :label="item.label" :prop='item.key'>
      <!-- input -->
      <el-input v-if="item.type == 'input'" v-model="formData[item.key]" :placeholder="item.placeholder" :disabled='item.disabled' :type='item.kind' @click.native='formSelectClick(item.key)'></el-input>
      <!-- select -->
      <el-select v-if="item.type == 'select'" class='elFormSelect' v-model="formData[item.key]" :placeholder="item.placeholder" @click.native='formSelectClick(item.key)' @change='formSelectchange'>
        <el-option
          v-for="v in item.options"
          :key="v.value"
          :label="v.label"
          :value="v.value"
        >
        </el-option>
      </el-select>
      <!-- cascader -->
      <el-cascader
        v-if="item.type == 'cascader'"
        :options="item.options"
        :props = "item.props"
        v-model="item.selectedOptions"
        @click.native='formSelectClick(item.key)'
        @change="formcascchange"
      >
      </el-cascader>

    </el-form-item>

    <slot></slot>
    <!-- submit -->
    <el-form-item :class="ifSearch2?'submitBox':''">
      <el-button v-if='ifSearch1' type="primary" icon="el-icon-search" @click="onSubmit"></el-button>
      <el-button v-if='ifSearch2' type="primary" @click="onSubmit">确定</el-button>
      <el-button v-if='ifSearch2' @click="onCancle">取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
/**
 * 必填
 * @param {formData} 表单显示数据
 * @param {formConfig} 表单配置
 */
export default {
  name: 'hySearchForm',
  props: {
    size:{
      type: String,
      default:()=>'small'
    },
    ifInLine:{
      type: Boolean,
      default:()=>true
    },
    ifSearch1:{
      type: Boolean,
      default:()=>false
    },
    ifSearch2:{
      type: Boolean,
      default:()=>false
    },
    labelPosition: {
      type: String,
      default:()=>'top'
    },
    rules: {
      type: Object,
      default:()=>{}
    },
    clearAll: {
      type: Boolean,
      default:()=>true
    },
    formConfig:{
      type: Array,
      default() {
        return []
        // return [{
        //   type:'input',
        //   placeholder: '常量编码',
        //   key: 'constcode',
        //   label: '常量编码',
        //   disabled: false
        // },{
        //   type:'select',
        //   placeholder:'有效状态',
        //   key: 'validstate',
        //   label: '有效状态',
        //   options:[{
        //     label:'有效',
        //     value:'1'
        //   },{
        //     label:'无效',
        //     value: '0'
        //   }]
        // },{
        //   type:'input',
        //   placeholder: '常量名字',
        //   key: 'constname',
        //   label: '常量名字',
        //   disabled: false
        // }]
      }
    },
    formData: {
      type: Object,
      default() {
        return {}
        // return {
        //   constcode: '',
        //   constname: '',
        //   validstate:''
        // }
      }
    }
  },
  data() {
    return {
      selectFormItem: ''
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.$emit('onSubmit', this.formData)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    onCancle() {
      this.$emit('onCancle')
    },
    formSelectClick(e) {
      this.selectFormItem = e
    },
    formSelectchange(e) {
      this.$emit('formSelectchange', e, this.selectFormItem)
    },
    formcascchange(e) {
      this.$emit('formcascchange', e, this.selectFormItem)
    }
  },
  watch: {
    clearAll(val){
      this.$refs.form.resetFields()
      this.$refs.form.clearValidate()
    },
    'formData.password'(val) {
      const reg = /^(?![^a-zA-Z]+$)(?!\D+$)/
      if(reg.test(val)) this.formData.checkPassword&&this.$nextTick(()=>this.$refs.form.validateField('checkPassword'))
    }
  }
}
</script>

<style scoped>
.elFormSelect{
  width: 100%;
}
.submitBox{
  display: flex;
  justify-content: flex-end;
}
</style>

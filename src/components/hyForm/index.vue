<template>
  <el-form ref='form' :rules='rules' :inline="ifInLine" :model="formData" class="" :size='size' :label-position="labelPosition">
    <!-- input -->
    <el-form-item v-if='formConfig.inputObj&&formConfig.inputObj.length>0' v-for='item in formConfig.inputObj' :key='item.key' :label="item.label" :prop='item.key'>
      <el-input v-model="formData[item.key]" :placeholder="item.placeholder"></el-input>
    </el-form-item>
    <!-- select -->
    <el-form-item v-if='formConfig.selectObj&&formConfig.selectObj.length>0' v-for='item in formConfig.selectObj' :key='item.key' :label="item.label" :prop='item.key'>
      <el-select class='elFormSelect' v-model="formData[item.key]" :placeholder="item.placeholder">
        <el-option
          v-for="v in item.options"
          :key="v.value"
          :label="v.label"
          :value="v.value">
        </el-option>
      </el-select>
    </el-form-item>
    <slot></slot>
    <!-- submit -->
    <el-form-item class='submitBox'>
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
      type: Object,
      default() {
        return {}
        // return {
        //   inputObj:[{
        //     placeholder: '常量编码',
        //     key: 'constcode',
        //     label: ''
        //   },{
        //     placeholder: '常量名称',
        //     key: 'constname',
        //     label: ''
        //   }],
        //   selectObj:[{
        //     placeholder:'有效状态',
        //     key: 'validstate',
        //     label: '',
        //     options:[{
        //       label:'有效',
        //       value:'1'
        //     },{
        //       label:'无效',
        //       value: '0'
        //     }]
        //   }]
        // }
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
    }
  },
  watch: {
    clearAll(val){
      !val&&this.$refs.form.resetFields()
      !val&&this.$refs.form.clearValidate()
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

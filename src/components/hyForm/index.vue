<template>
  <el-form ref='form' :inline="ifInLine" :model="formData" class="" :size='size'>
    <!-- input -->
    <el-form-item v-if='formConfig.inputObj&&formConfig.inputObj.length>0' v-for='item in formConfig.inputObj' :key='item.key' :label="item.label">
      <el-input v-model="formData[item.key]" :placeholder="item.placeholder"></el-input>
    </el-form-item>
    <!-- select -->
    <el-form-item v-if='formConfig.selectObj&&formConfig.selectObj.length>0' v-for='item in formConfig.selectObj' :key='item.key' :label="item.label">
      <el-select v-model="formData[item.key]" :placeholder="item.placeholder">
        <el-option
          v-for="v in item.options"
          :key="v.value"
          :label="v.label"
          :value="v.value">
        </el-option>
      </el-select>
    </el-form-item>
    <!-- submit -->
    <el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="onSubmit"></el-button>
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
          console.log('formData', this.formData)
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    }
  }
}
</script>

<style scoped>
</style>

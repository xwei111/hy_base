<template>
  <div>
    <div class='userTopSearch'>
      <div class='resetPass'>
        <el-button size='small' type='primary'>重置密码</el-button>
      </div>
      <div class='hy_searchBox'>
        <hyForm :formConfig='formConfig' :formData='formData' @onSubmit='onSubmit' :ifSearch1='ifSearch1'></hyForm>
        <div>
          <el-button class='hy_searchAddBtn' type="success" icon="el-icon-plus" size='small' @click='addUserHandle'></el-button>
        </div>
      </div>
    </div>
    <hyTable
      :tableData='tableData' 
      :column='column' 
      :ifHaveCheckBox='ifHaveCheckBox'
      :isHaveEdit='isHaveEdit' 
      :isHaveDelete='isHaveDelete' 
      :isHaveChangePass='isHaveChangePass'
    >
    </hyTable>
    <div class='hy_searchBox'>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="searchObj.page"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
    <hyModal :dialogVisible='userDialogVisible' :title='title' @closeHandle='closeHandle'>
      <hyForm 
        class='hy_userFrom'
        :formConfig='userformConfig' 
        :formData='userformData' 
        :ifInLine='ifInLine' 
        :ifSearch2='ifSearch2' 
        :rules='userRules'
        :clearAll ='userDialogVisible'
        @onSubmit='useronSubmit' 
        @onCancle='onCancle'
        @formSelectchange='formSelectchange'
        @formcascchange='formcascchange'
      >
      </hyForm>
    </hyModal>
  </div>
</template>

<script>
import { hyTable, hyForm, hyModal } from '@/components'
import { formConfig, columnConfig } from './config'
import { getUserData , getUserOrg, getUserCom, getUserDep } from '@/api/defineCenterUser'
export default {
  name: 'defineCenterUser',
  data () {
    return {
      ifSearch1: true,
      formConfig: formConfig.searchConfig,
      formData: formConfig.searchData,
      searchObj:{page: 1,rows: 10,userId: '',userName: ''},
      ifHaveCheckBox: true,
      isHaveEdit: true,
      isHaveDelete: true,
      isHaveChangePass: true,
      column: columnConfig,
      tableData: [],
      total: 0,
      userDialogVisible: false,
      ifInLine: false,
      ifSearch2: true,
      title: '新增用户',
      userformConfig: formConfig.userformConfig,
      userformData: formConfig.userformData,
      userRules: formConfig.userRules
    }
  },
  components: {
    hyTable,
    hyForm,
    hyModal
  },
  created() {
    this._getUserData(this.searchObj)
    this._getUserOrg()
  },
  methods: {
    onSubmit(e) {
      this.searchObj.page = 1
      this.searchObj.rows = 10
      this.searchObj = Object.assign(this.searchObj, e)
      this._getUserData(this.searchObj)
    },
    addUserHandle() {
      this.userDialogVisible = true
    },
    handleSizeChange(e) {
      this.searchObj.rows = e
      this._getUserData(this.searchObj)
    },
    handleCurrentChange(e) {
      this.searchObj.page = e
      this._getUserData(this.searchObj)
    },
    useronSubmit() {
      this.userDialogVisible = false
    },
    onCancle() {
      this.userDialogVisible = false
    },
    closeHandle() {
      this.userDialogVisible = false
    },
    formSelectchange(e, key) {
      if(key === 'organizeId') {
        const options = this.userformConfig[8].options
        const v = options.find(item=>item.value == e)
        const obj = { orgId: v.value, orgName: v.label }
        this._getUserCom(obj)
      }
    },
    formcascchange(e, key) {
      if(key === 'orgId') {
        getUserDep({companyId: e}).then(data=>console.log('data', data))
      }
    },
    _getUserData(searchObj){
      this.m_apiFn(getUserData,searchObj).then((data)=>{
        const { rows, total } = data.result
        this.tableData = rows
        this.total = total
      })
    },
    _getUserOrg() {
      this.m_apiFn(getUserOrg).then((data)=>{
        const { result } = data
        result.map(item=>{
          item.label = item.organizeName
          item.value = item.organizeId
        })
        this.userformConfig[8].options = result
      })
    },
    _getUserCom(obj) {
      getUserCom(obj).then(data=>this.userformConfig[9].options = data.result[0].children?data.result[0].children:[])
    }
  }
}
</script>
<style scoped>
@import './index.css'; 
</style>

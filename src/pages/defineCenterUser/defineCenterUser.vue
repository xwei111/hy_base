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
      @editHandle='editHandle'
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
        :class="title=='新增用户'?'hy_userFrom':'hy_changeUserFrom'"
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
import { getUserData , getUserOrg, getUserCom, getUserDep, addUser, userDetail } from '@/api/defineCenterUser'
import RSA from '@/utils/RSA'
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
      userRules: formConfig.userRules,
      userOrgList: [],
      orgType: ''
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
  watch: {
    userDialogVisible(val) {
      !val&&this.$nextTick(()=>this._resetSelect(true))
    }
  },
  methods: {
    onSubmit(e) {
      this.searchObj.page = 1
      this.searchObj.rows = 10
      this.searchObj = Object.assign(this.searchObj, e)
      this._getUserData(this.searchObj)
    },
    handleSizeChange(e) {
      this.searchObj.rows = e
      this._getUserData(this.searchObj)
    },
    handleCurrentChange(e) {
      this.searchObj.page = e
      this._getUserData(this.searchObj)
    },
    addUserHandle() {
      this.title = '新增用户'
      this.userDialogVisible = true
      this.userformConfig = formConfig.userformConfig
      this.userformData = formConfig.userformData
    },
    async editHandle(e) {
      const { userId } = e.row
      this.userformConfig = formConfig.changeUserformConfig
      const userDetail = await this._userDetail(userId)
      await this._setDetail(userDetail)
      await this._openDetail()
    },
    async useronSubmit(e) {
      switch(this.title) {
        case '新增用户':
          const key = await this.m_loginRcs()
          await this._addSubmit(e,key)
          break
      }
    },
    onCancle() {
      this.userDialogVisible = false
      if(this.title == '新增用户'){
        this._resetOptions(8,9,10)
      }else{
        this._resetOptions(6,7,8)
      }
      this.orgType = ''
    },
    closeHandle() {
      this.userDialogVisible = false
      if(this.title == '新增用户'){
        this._resetOptions(8,9,10)
      }else{
        this._resetOptions(6,7,8)
      }
      this.orgType = ''
    },
    async formSelectchange(e, key) {
      if(key === 'orgId') {
        const options = this.userformConfig[8].options
        const v = options.find(item=>item.value == e)
        const obj = { orgId: v.value, orgName: v.label }
        this.orgType = v.orgType
        this._getUserCom(this.userformConfig[9],obj)
        this.userformData.comId = []
        this.userformData.depId = []
      }
      if(key === 'workflowState') {
        await this._resetSelect(false)
        await this._resetVal()
        await this._filterUserOrg(e,this.userformConfig[8])
      }
    },
    formcascchange(e, key) {
      if(key === 'comId') {
        this._getUserDep(this.userformConfig[10], {companyId: e[e.length -1]})
        this.userformData.depId = []
      }
    },
    async _setDetail(userDetail) {
      const { userId, userName, workflowState, tel, email, shortTel, deptList } = userDetail.result
      await this.$nextTick(()=>{
        this.userformData = { 
          userId: userId, 
          userName: userName, 
          workflowState: workflowState, 
          tel: tel, 
          email: email, 
          shortTel: shortTel, 
          orgId: deptList[0].orgId, 
          comId: [deptList[0].compId], 
          depId: [deptList[0].deptId]
        }
      })
      await this._filterUserOrg(workflowState,this.userformConfig[6])
      await this._getUserCom(this.userformConfig[7], { orgId: deptList[0].orgId, orgName: deptList[0].orgName })
      await this._getUserDep(this.userformConfig[8], { companyId: deptList[0].compId })
      
    },
    _openDetail() {
      this.title = '修改用户'
      this.userDialogVisible = true
    },
    _addSubmit(e,key) {
      const { checkPassword, password, depId, comId, orgId, userId, ...userObj } = e
      userObj.userId = userId
      userObj.password = RSA.encryptedString(key, encodeURIComponent(password))
      userObj.deptList = []
      userObj.deptList[0] = { userId: userId, orgId: orgId, compId: comId[comId.length - 1], deptId: depId[depId.length - 1], orgType: this.orgType }
      this._addUser(userObj)
    },
    _resetSelect(type) {
      this.$nextTick(() => {
        if(this.title == '新增用户'){
          this.userformConfig[8].disabled = type
          this.userformConfig[9].disabled = type
          this.userformConfig[10].disabled = type
          this._resetOptions(8,9,10)
        }else{
          this.userformConfig[6].disabled = type
          this.userformConfig[7].disabled = type
          this.userformConfig[8].disabled = type
          this._resetOptions(6,7,8)
        }
        
      })
    },
    _resetVal() {
      this.userformData.orgId = ''
      this.userformData.comId = []
      this.userformData.depId = []
    },
    _resetOptions(a,b,c) {
      this.userformConfig[a].options = []
      this.userformConfig[b].options = []
      this.userformConfig[c].options = []
    },
    _filterUserOrg(e,v) {
      this.userOrgList.map(item=>{
        if(e == 1 || e == 2){
          item.orgType == 'SYS_ORG_ACTIVITY'&&this.$nextTick(()=>v.options.push({ label: item.organizeName, value: item.organizeId, orgType: item.orgType }))
        }else{
          this.$nextTick(()=>v.options.push({ label: item.organizeName, value: item.orgId, orgType: item.orgType }))
        }
      })
    },
    _getUserData(searchObj){
      this.m_apiFn(getUserData,searchObj).then((data)=>{
        const { rows, total } = data.result
        this.tableData = rows
        this.total = total
      })
    },
    _getUserOrg() {
      this.m_apiFn(getUserOrg).then((data)=>this.userOrgList = data.result)
    },
    _getUserCom(v,obj) {
      this.m_apiFn(getUserCom, obj).then(data=>v.options = data.result&&data.result[0].children?data.result[0].children:[])
    },
    _getUserDep(v,obj) {
      this.m_apiFn(getUserDep, obj).then(data=>v.options = data.result&&data.result.children?data.result.children:[])
    },
    _successFn() {
      this._getUserData(this.searchObj)
      this.userDialogVisible = false
    },
    _addUser(userObj) {
      this.m_apiFn(addUser, userObj, '新增用户成功').then(data=>this._successFn())
    },
    _userDetail(userId) {
      return this.m_apiFn(userDetail, userId).then((data)=> data)
    }
  }
}
</script>
<style scoped>
@import './index.css'; 
</style>

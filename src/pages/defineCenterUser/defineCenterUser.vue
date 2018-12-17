<template>
  <div>
    <div class='userTopSearch'>
      <div class='resetPass'>
        <el-button size='small' type='primary' @click='resetPass'>重置密码</el-button>
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
      @deleteHandle='deleteHandle'
      @changePassHandle='changePassHandle'
      @handleSelectionChange='handleSelectionChange'
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
        :class="title=='新增用户'?'hy_userFrom' : title=='修改用户' ? 'hy_changeUserFrom' : ''"
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
import { mapGetters } from 'vuex'
import { hyTable, hyForm, hyModal } from '@/components'
import { formConfig, columnConfig } from './config'
import { getUserData , getUserOrg, getUserCom, getUserDep, addUser, userDetail, changeUser, deleteUser, changePass, resetPass } from '@/api/defineCenterUser'
import RSA from '@/utils/RSA'
import common from '@/utils/common'
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
      userformData: JSON.parse(JSON.stringify(formConfig.userformData)),
      userRules: formConfig.userRules,
      userOrgList: [],
      orgType: '',
      uuid: '',
      passDetail: {},
      selectDetail: [],
      idList: []
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
    handleSizeChange(e) {
      this.searchObj.rows = e
      this._getUserData(this.searchObj)
    },
    handleCurrentChange(e) {
      this.searchObj.page = e
      this._getUserData(this.searchObj)
    },
    handleSelectionChange(e) {
      this.selectDetail = e
    },
    resetPass() {
      const len = this.selectDetail.length
      let idList = []
      if(len>0) {
        const { resetConfig, resetData, resetRules } = formConfig
        this.selectDetail.map(item => idList.push(item.userId))
        this.idList = idList
        this._setFormInfo('重置密码', resetConfig, JSON.parse(JSON.stringify(resetData)), resetRules)
      }else{
        this.$message.warning('请先选择用户')
      }
    },
    addUserHandle() {
      const { userformConfig, userformData, userRules } = formConfig
      this._setFormInfo('新增用户', userformConfig, JSON.parse(JSON.stringify(userformData)), userRules)
    },
    async editHandle(e) {
      const { userId } = e.row
      const userDetail = await this._userDetail(userId)
      userDetail && this._setDetail(userDetail)
    },
    async _setDetail(userDetail) {
      const { userName, workflowState, tel, email, shortTel, deptList, uuid } = userDetail.result
      const { changeUserformConfig, userformData, userRules } = formConfig
      this._setFormInfo('修改用户', changeUserformConfig, {}, userRules)
      this.uuid = uuid
      this.orgType = deptList&&deptList.length?deptList[0].orgType:''
      await this._filterUserOrg(workflowState,this.userformConfig[6])
      if(deptList.length&&deptList[0].orgId&&deptList[0].orgName) {
        var comList = await this._getUserCom(this.userformConfig[7], { orgId: deptList[0].orgId, orgName: deptList[0].orgName })
        var comIdAry = await common.getTreeDeepArr(deptList[0].compId,comList,'orgId')
      }
      if(deptList.length&&deptList[0].compId) {
        var depList = await this._getUserDep(this.userformConfig[8], { companyId: deptList[0].compId })
        var depIdAry = await common.getTreeDeepArr(deptList[0].deptId,depList,'id')
      }
      this.$nextTick(()=>{
        this.userformData = { 
          userId: userDetail.result.userId, 
          userName: userName, 
          workflowState: workflowState, 
          tel: tel, 
          email: email, 
          shortTel: shortTel, 
          orgId: deptList.length&&deptList[0].orgId?deptList[0].orgId:'', 
          comId: comIdAry?comIdAry:[], 
          depId: depIdAry?depIdAry:[]
        }
      })
    },
    deleteHandle(e) {
      const { userId, uuid, workflowState } = e.row
      const obj = { operationUserId: this.userId, userId: userId, uuid: uuid, workflowState: workflowState }
      this._deleteUser(obj)
    },
    changePassHandle(e) {
      this.passDetail = e.row
      const { passwordConfig, passwordData, passRules } = formConfig
      this._setFormInfo('修改密码', passwordConfig, JSON.parse(JSON.stringify(passwordData)), passRules)
    },
    async useronSubmit(e) {
      switch(this.title) {
        case '新增用户':
          const key = await this.m_loginRcs()
          var { checkPassword, password, depId, comId, orgId, userId, ...userObj } = e
          userObj.userId = userId
          userObj.password = RSA.encryptedString(key, encodeURIComponent(password))
          userObj.deptList = []
          userObj.deptList[0] = { userId: userId, orgId: orgId, compId: comId[comId.length - 1], deptId: depId[depId.length - 1], orgType: this.orgType }
          this._addUser(userObj)
          break
        case '修改用户':
          var { depId, comId, orgId, userId, ...userObj } = e
          userObj.userId = userId
          userObj.uuid = this.uuid
          userObj.deptList = []
          userObj.deptList[0] = { userId: userId, orgId: orgId, compId: comId[comId.length - 1], deptId: depId[depId.length - 1], orgType: this.orgType }
          this._changeUser(userObj)
          break
        case '修改密码':
          const passkey = await this.m_loginRcs()
          if(e.oldPassword == e.newPassword) return this.$message.warning('旧密码与新密码不能一样')
          const oldpass = RSA.encryptedString(passkey, encodeURIComponent(e.oldPassword))
          const newpass = RSA.encryptedString(passkey, encodeURIComponent(e.newPassword))
          const obj = { password: newpass, userId: this.passDetail.userId, workflowState: this.passDetail.workflowState }
          this._changePass(oldpass, obj)
          break
        case '重置密码':
          const resetkey = await this.m_loginRcs()
          let resetObj = {}
          resetObj.userId = this.userId
          resetObj.password = RSA.encryptedString(resetkey, encodeURIComponent(e.adminPassword))
          resetObj.newPassword = RSA.encryptedString(resetkey, encodeURIComponent(e.password))
          resetObj.userIdList = this.idList
          this._resetPass(resetObj)
          break
      }
    },
    onCancle() {
      this.userDialogVisible = false
      this._resetSelect()
      this.orgType = ''
    },
    closeHandle() {
      this.userDialogVisible = false
      this._resetSelect()
      this.orgType = ''
    },
    async formSelectchange(e, key) {
      if(key === 'orgId') {
        if(this.title == '新增用户') {
          var options = this.userformConfig[8].options
        }else{
          var options = this.userformConfig[6].options
        }
        const v = options.find(item=>item.value == e)
        const obj = { orgId: v.value, orgName: v.label }
        this.orgType = v.orgType
        if(this.title == '新增用户') {
          this._getUserCom(this.userformConfig[9], obj)
        }else{
          this._getUserCom(this.userformConfig[7], obj)
        }
        this.userformData.comId = []
        this.userformData.depId = []
      }
      if(key === 'workflowState') {
        await this._resetSelect()
        await this._resetVal()
        await this._filterUserOrg(e, this.userformConfig[8])
      }
    },
    formcascchange(e, key) {
      if(key === 'comId') {
        if(this.title == '新增用户') {
          this._getUserDep(this.userformConfig[10], {companyId: e[e.length -1]})
        }else{
          this._getUserDep(this.userformConfig[8], {companyId: e[e.length -1]})
        }
        this.userformData.depId = []
      }
    },
    _setFormInfo(title, config, formdata, rules) {
      this.title = title
      this.userformConfig = config
      this.userDialogVisible = true
      this.userformData = formdata
      this.userRules = rules
    },
    _resetSelect() {
      if(this.title == '新增用户'){
        this._resetOptions(8, 9, 10)
      }else if(this.title == '修改用户'){
        this._resetOptions(6, 7, 8)
      }
    },
    _resetVal() {
      this.userformData.orgId = ''
      this.userformData.comId = this.userformData.comId.length>0 ? [] :this.userformData.comId
      this.userformData.depId = this.userformData.depId.length>0 ? [] :this.userformData.depId
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
          this.$nextTick(()=>v.options.push({ label: item.organizeName, value: item.organizeId, orgType: item.orgType }))
        }
      })
    },
    _getUserData(searchObj) {
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
      return this.m_apiFn(getUserCom, obj).then(data=>v.options = data.result&&data.result[0]&&data.result[0].children?data.result[0].children:[])
    },
    _getUserDep(v,obj) {
      return this.m_apiFn(getUserDep, obj).then(data=>v.options = data.result&&data.result.children?data.result.children:[])
    },
    _successFn() {
      this._getUserData(this.searchObj)
      this.userDialogVisible = false
    },
    _addUser(userObj) {
      this.m_apiFn(addUser, userObj, '新增用户成功').then(data=>{
        this._successFn()
        this._resetOptions(8, 9, 10)
      })
    },
    _changeUser(userObj) {
      this.m_apiFn(changeUser, userObj, '修改用户成功').then(data=>{
        this._successFn()
        this._resetOptions(6, 7, 8)
      })
    },
    _userDetail(userId) {
       return this.m_apiFn(userDetail, userId).then(data=>data)
    },
    _deleteUser(userObj) {
      this.m_apiFn(deleteUser, userObj, '删除成功').then(data=>this._successFn())
    },
    _changePass(oldpass, obj) {
      this.m_apiFn(changePass, { oldpass: oldpass, obj: obj }, '修改成功').then(data=>{
        this.passDetail = {}
        this._successFn()
      })
    },
    _resetPass(obj) {
      this.m_apiFn(resetPass, obj, '重置成功').then(data=>this._successFn())
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  }
}
</script>
<style scoped>
@import './index.css'; 
</style>

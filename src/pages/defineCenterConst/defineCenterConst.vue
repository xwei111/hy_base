<template>
  <div>
    <div class='hy_searchBox'>
      <hyForm :formConfig='formConfig' :formData='formData' @onSubmit='onSubmit' :ifSearch1='ifSearch1'></hyForm>
      <div>
        <el-button class='hy_searchAddBtn' type="success" icon="el-icon-plus" size='small' @click='addConstHandle'></el-button>
      </div>
    </div>
    <hyTable 
      :tableData='tableData' 
      :column='column' 
      :ifIsExpand='ifIsExpand' 
      :isHaveEdit='isHaveEdit' 
      :isHaveDelete='isHaveDelete' 
      :isHaveAdd='isHaveAdd'
      @editHandle='editHandle'
      @addHandle='addHandle'
      @deleteHandle='deleteHandle'
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
    <hyModal :dialogVisible='constDialogVisible' :title='title' @closeHandle='closeHandle'>
      <hyForm 
        :formConfig='constformConfig' 
        :formData='constformData' 
        :ifInLine='ifInLine' 
        :ifSearch2='ifSearch2' 
        :rules='constRules'
        :clearAll ='constDialogVisible'
        @onSubmit='constonSubmit' 
        @onCancle='onCancle'
      >
      </hyForm>
    </hyModal>
  </div>
</template>

<script>
import { hyTable, hyForm, hyModal } from '@/components'
import { getConstData, addConst, changeConst, addConstVal, changeConstVal, deleteConst, deleteConstVal } from '@/api/defineCenterConst'
import { formConfig, columnConfig } from './config'
export default {
  name: 'defineCenterConst',
  data () {
    
    return {
      ifIsExpand: true,
      isHaveEdit: true,
      isHaveDelete: true,
      isHaveAdd: true,
      ifSearch1:true,
      ifSearch2: true,
      searchObj:{page: 1,rows: 10,dictHeadId: '',dictHeadName: '',dictHeadState: ''},
      tableData:[],
      total: 0,
      column: columnConfig,
      typeobj:{'0':'系统级常量','1':'常量级常量','2':'应用级常量'},
      stateobj:{'0':'无效','1':'有效'},
      formConfig:formConfig.searchConfig,
      formData:formConfig.searchData,
      constDialogVisible: false,
      title: '新增常量',
      ifInLine: false,
      constformConfig: formConfig.constConfig,
      constformData: formConfig.constFormData,
      constRules: formConfig.constRules,
      uuid: ''
    }
  },
  components:{
    hyTable,
    hyForm,
    hyModal
  },
  created() {
    this._getConstData(this.searchObj)
  },
  methods: {
    onSubmit(e) {
      this.searchObj.page = 1
      this.searchObj.rows = 10
      this.searchObj = Object.assign(this.searchObj, e)
      this._getConstData(this.searchObj)
    },
    handleSizeChange(e) {
      this.searchObj.rows = e
      this._getConstData(this.searchObj)
    },
    handleCurrentChange(e) {
      this.searchObj.page = e
      this._getConstData(this.searchObj)
    },
    addConstHandle() {
      this._setForm('新增常量',formConfig.constConfig,formConfig.constFormData,false,formConfig.constRules)
      this.constDialogVisible = true
    },
    closeHandle() {
      this.constDialogVisible = false
    },
    constonSubmit(e) {
      switch(this.title) {
        case '新增常量':
          var {dictHeadSort, ...otherObj} = e
          if(dictHeadSort) otherObj.dictHeadSort = dictHeadSort
          this._addConst(otherObj)
          break
        case '修改常量':
          this.constformData = Object.assign(this.constformData, e)
          var {dictHeadSort, ...otherObj} = this.constformData
          if(dictHeadSort) otherObj.dictHeadSort = dictHeadSort
          this._changeConst(this.uuid, otherObj)
          break
        case '新增常量值':
          var {dictSort, ...otherObj} = e
          if(dictSort) otherObj.dictSort = dictSort
          this._addConstVal(otherObj)
          break
        case '修改常量值':
          this.constformData = Object.assign(this.constformData, e)
          var {dictSort, ...otherObj} = this.constformData
          if(dictSort) otherObj.dictSort = dictSort
          this._changeConstVal(this.uuid, otherObj)
          break
      }
    },
    onCancle() {
      this.constDialogVisible = false
    },
    editHandle(e) {
      e.row.parent?this._SetConstValdetail(e):this._setConstdetail(e)
      this.constDialogVisible = true
    },
    addHandle(e){
      this._setForm('新增常量值',formConfig.constValConfig,formConfig.constValFormData,false,formConfig.constValRules)
      this.constformData.dictHeadId = e.row.dictHeadId
      this.constformData.parentId = e.row.floor === '1' ? '' : e.row.id
      this.constDialogVisible = true
    },
    deleteHandle(e) {
      const { floor, children, dictHeadId, uuid } = e.row
      if(children&&children.length>0){
        this.$message.warning('该父项有子项的值，请先删除子项')
        return
      }
      if(floor){
        this._deleteConst(uuid,{dictHeadId:dictHeadId})
      }else{
        this._deleteConstVal(uuid)
      }
    },
    _setConstdetail(e) {
      this._setForm('修改常量',formConfig.constConfig,formConfig.constFormData,true,formConfig.constRules)
      const { dictHeadId, dictHeadName, dictHeadType, dictHeadState, dictHeadDesc, dictHeadSort, uuid } = e.row
      this.$nextTick(()=>{
        this.constformData = {
          dictHeadId:dictHeadId, 
          dictHeadName:dictHeadName, 
          dictHeadType: dictHeadType,
          dictHeadState:dictHeadState, 
          dictHeadDesc:dictHeadDesc, 
          dictHeadSort:dictHeadSort,
        }
        this.uuid = uuid
      })
    },
    _SetConstValdetail(e) {
      this._setForm('修改常量值', formConfig.constValConfig, formConfig.constValFormData, true, formConfig.constValRules)
      const { dictId, dictName, dictDesc, dictSort, dictHeadId, id, uuid } = e.row
      this.$nextTick(()=>{
        this.constformData = {
          dictId:dictId, 
          dictName:dictName, 
          dictDesc: dictDesc,
          dictSort:dictSort,
          parentId: e.row.floor === '1' ? '' : id,
          dictHeadId: dictHeadId
        }
        this.uuid = uuid
      })
    },
    _setForm(title,config,formdata,dis,rule) {
      this.title = title
      this.constformConfig = config
      this.constformData = formdata
      this.constformConfig[0].disabled = dis
      this.constRules = rule
    },
    _getConstData(searchObj) {
      this.m_apiFn(getConstData,searchObj).then((data)=>{
        const { rows, total } = data.result
        rows.map(item=>{
          item.typeName = this.typeobj[item.type] || ''
          item.stateName = this.stateobj[item.state] || ''
        })
        this.tableData = rows
        this.total = total
      })
    },
    _successFn() {
      this._getConstData(this.searchObj)
      this.constDialogVisible = false
    },
    _addConst(obj) {
      this.m_apiFn(addConst,obj,'新增常量成功').then(()=>this._successFn())
    },
    _changeConst(uuid, obj) {
      const params = {uuid:uuid,obj:obj}
      this.m_apiFn(changeConst,params,'修改常量成功').then(()=>this._successFn())
    },
    _addConstVal(obj) {
      this.m_apiFn(addConstVal,obj,'新增常量值成功').then(()=>this._successFn())
    },
    _changeConstVal(uuid, obj) {
      const params = {uuid:uuid,obj:obj}
      this.m_apiFn(changeConstVal,params,'修改常量值成功').then(()=>this._successFn())
    },
    _deleteConst(uuid, obj) {
      const params = {uuid:uuid,obj:obj}
      this.m_apiFn(deleteConst,params,'删除常量成功').then(()=>this._successFn())
    },
    _deleteConstVal(uuid) {
      this.m_apiFn(deleteConstVal,uuid,'删除常量值成功').then(()=>this._successFn())
    }
  }
}
</script>

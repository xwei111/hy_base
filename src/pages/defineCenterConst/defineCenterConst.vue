<template>
  <div>
    <div class='hy_searchBox'>
      <hyForm :formConfig='formConfig' :formData='formData' @onSubmit='onSubmit' :ifSearch1='ifSearch1'></hyForm>
      <div>
        <el-button class='hy_searchAddBtn' type="success" icon="el-icon-plus" size='small' @click='addHandle'></el-button>
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
    <hyModal :dialogVisible='dialogVisible' :title='title' @closeHandle='closeHandle'>
      <hyForm 
        :formConfig='addConstformConfig' 
        :formData='addConstformData' 
        :ifInLine='ifInLine' 
        :ifSearch2='ifSearch2' 
        :rules='addConstRules'
        :clearAll ='dialogVisible'
        @onSubmit='addConstonSubmit' 
        @onCancle='onCancle'
      >
      </hyForm>
    </hyModal>
  </div>
</template>

<script>
import { hyTable, hyForm, hyModal } from '@/components'
import { getConstData, addConst } from '@/api/defineCenterConst'
export default {
  name: 'defineCenterConst',
  data () {
    var checkCode = (rule, value, callback) => {
      const reg = /^[A-Za-z0-9_]+$/
      if (reg.test(value)) {
        callback()
      } else {
        return callback(new Error('正确编码格式为:长度在1~100之间,只能包含字母数字或者下划线'))
      }
    }
    var checkOrder = (rule, value, callback) => {
      if (value === '' || value === null) {
        callback()
        return
      }
      if (value > 0 && value < 100) {
        callback()
      } else {
        return callback(new Error('顺序只能为1-99的数字'))
      }
    }
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
      column: [
        {key:'id',label: '常量编码'},
        {key:'name',label: '常量名称'},
        {key:'typeName',label: '常量类型'},
        {key:'desc',label: '常量描述'},
        {key:'stateName',label: '是否有效'},
        {key:'sort',label: '顺序'}
      ],
      typeobj:{'0':'系统级常量','1':'常量级常量','2':'应用级常量'},
      stateobj:{'0':'无效','1':'有效'},
      formConfig:{
        inputObj:[
          { placeholder: '常量编码', key: 'dictHeadId', label: '' },
          { placeholder: '常量名称', key: 'dictHeadName', label: '' }
        ],
        selectObj:[
          {placeholder:'有效状态',key: 'dictHeadState',label: '',options:[{label:'有效',value:'1'},{label:'无效',value: '0'}]}
        ]
      },
      formData:{dictHeadId: '',dictHeadName: '',dictHeadState:''},
      dialogVisible: false,
      title: '新增常量',
      ifInLine: false,
      addConstformConfig: {
        inputObj: [
          { placeholder: '请输入常量编码', key: 'dictHeadId', label: '常量编码' },
          { placeholder: '请输入常量名称', key: 'dictHeadName', label: '常量名称' },
          { placeholder: '请输入常量描述', key: 'dictHeadDesc', label: '常量描述' },
          { placeholder: '请输入顺序', key: 'dictHeadSort', label: '顺序' },
        ],
        selectObj: [
          {placeholder:'请选择',key: 'dictHeadType',label: '常量类型',options:[{label:'系统级常量',value:'0'},{label:'常量级常量',value: '1'},{label:'应用级常量',value: '2'}]},
          {placeholder:'有效状态',key: 'dictHeadState',label: '有效性',options:[{label:'有效',value:'1'},{label:'无效',value: '0'}]}
        ]
      },
      addConstformData: {dictHeadId: '',dictHeadName:'',dictHeadType:'',dictHeadState:'',dictHeadDesc:'',dictHeadSort:''},
      addConstRules: {
        dictHeadName: [
          { required: true, message: '常量名称不能为空', trigger: 'blur' }
        ],
        dictHeadType: [
          { required: true, message: '常量类型不能为空', trigger: 'blur' }
        ],
        dictHeadSort: [
          { required: false, trigger: 'blur' },
          { validator: checkOrder, trigger: 'blur' }
        ],
        dictHeadId: [
          { required: true, message: '常量编码不能为空', trigger: 'blur' },
          { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' },
          { validator: checkCode, trigger: 'blur' }
        ]
      }
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
    addHandle() {
      this.dialogVisible = true
    },
    closeHandle() {
      this.dialogVisible = false
    },
    addConstonSubmit(e) {
      this.addConstformData = Object.assign(this.addConstformData, e)
      this._addConst(this.addConstformData)
    },
    onCancle() {
      this.dialogVisible = false
    },
    editHandle(e) {
      console.log('e',e)
    },
    _getConstData(searchObj) {
      getConstData(searchObj).then((data)=>{
        if(data.statusCode == '200') {
          const { rows, total } = data.result
          rows.map(item=>{
            item.typeName = this.typeobj[item.type] || ''
            item.stateName = this.stateobj[item.state] || ''
          })
          this.tableData = rows
          this.total = total
        }
      })
    },
    _addConst(obj) {
      addConst(obj).then((data)=>{
        if(data.statusCode == '200'){
          this.$message.success('新增常量成功')
          this._getConstData(this.searchObj)
          this.dialogVisible = false
        }
      })
    }
  }
}
</script>
<style scoped>
/* @import './index.css'; */
</style>

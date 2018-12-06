<template>
  <el-scrollbar>
    <div class='hy_searchBox'>
      <hyForm :formConfig='formConfig' :formData='formData'></hyForm>
      <div>
        <el-button class='hy_searchAddBtn' type="success" icon="el-icon-plus" size='small'></el-button>
      </div>
    </div>
    <hyTable 
      :tableData='tableData' 
      :column='column' 
      :ifIsExpand='ifIsExpand' 
      :isHaveEdit='isHaveEdit' 
      :isHaveDelete='isHaveDelete' 
      :isHaveAdd='isHaveAdd'
    >  
    </hyTable>
  </el-scrollbar>
</template>

<script>
import { hyTable, hyForm } from '@/components'
import { getConstData } from '@/api/defineCenterConst'
export default {
  name: 'defineCenterConst',
  data () {
    return {
      ifIsExpand: true,
      isHaveEdit: true,
      isHaveDelete: true,
      isHaveAdd: true,
      searchObj:{page: 1,rows: 10,dictHeadId: '',dictHeadName: '',dictHeadState: ''},
      tableData:[],
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
        inputObj:[{
          placeholder: '常量编码',
          key: 'constcode',
          label: ''
        },{
          placeholder: '常量名称',
          key: 'constname',
          label: ''
        }],
        selectObj:[{
          placeholder:'有效状态',
          key: 'validstate',
          label: '',
          options:[{
            label:'有效',
            value:'1'
          },{
            label:'无效',
            value: '0'
          }]
        }]
      },
      formData:{
        constcode: '',
        constname: '',
        validstate:''
      }
    }
  },
  components:{
    hyTable,
    hyForm
  },
  created() {
    this._getConstData(this.searchObj)
  },
  methods: {
    _getConstData(searchObj) {
      getConstData(searchObj).then((data)=>{
        if(data.statusCode == '200') {
          const { rows, total } = data.result
          rows.map(item=>{
            item.typeName = this.typeobj[item.type] || ''
            item.stateName = this.stateobj[item.state] || ''
          })
          this.tableData = rows
        }
      })
    }
  }
}
</script>
<style scoped>
/* @import './index.css'; */
</style>

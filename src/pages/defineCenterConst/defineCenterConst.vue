<template>
  <div class='div'>
    <hyTable :tableData='tableData' :column='column' :ifIsExpand='ifIsExpand' :isHaveEdit='isHaveEdit'></hyTable>
  </div>
</template>

<script>
import { hyTable } from '@/components'
export default {
  name: 'defineCenterConst',
  data () {
    return {
      ifIsExpand: true,
      isHaveEdit: true,
      tableData:[{
        id: 1,
        name:'hehe',
        children:[{
          id:3,
          name:'xixi',
          children:[{
            id:5,
            name:'xixi'
          }]
        }]
      },{
        id: 2,
        name:'hehe',
        children:[{
          id:4,
          name:'enen'
        }]
      },{
        id:6,
        name:'666'
      }],
      column: [{
        key:'id',
        label: '标识'
      },{
        key:'name',
        label: '姓名'
      }]
    }
  },
  components:{
    hyTable
  },
  created() {
    
  },
  methods: {
  }
}
</script>
<style scoped>
/* @import './index.css'; */
</style>

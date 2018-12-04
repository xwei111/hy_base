<template>
  <div class='div'>
    <hyTableTree :data='data' :columns='columns'></hyTableTree>
  </div>
</template>

<script>
import { hyTableTree } from '@/components'
export default {
  name: 'defineCenterConst',
  data () {
    return {
      data:[{
        id: 1,
        name:'hehe',
        children:[{
          id:3,
          name:'xixi'
        }]
      },{
        id: 2,
        name:'hehe'
      }],
      columns: [{
        value: 'id',
        text: '标识'
      },{
        value: 'name',
        text: '姓名'
      }],
      tableData: [{
        id: 1,
        name:'hehe'
      },{
        id: 2,
        name:'hehe'
      }],
      column: [{
        key: 'id',
        label: '标识'
      },{
        key: 'name',
        label: '姓名'
      }],
    }
  },
  components:{
    hyTableTree
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

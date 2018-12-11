import regex from '@/utils/regex'

export const formConfig = {
  searchConfig:[
    { type: 'input', placeholder: '常量编码', key: 'dictHeadId', label: '' },
    { type: 'input', placeholder: '常量名称', key: 'dictHeadName', label: '' },
    { type: 'select', placeholder:'有效状态',key: 'dictHeadState',label: '', options:[{label:'有效',value:'1'},{label:'无效',value: '0'}]}
  ],
  searchData: {
  	dictHeadId: '',
  	dictHeadName: '',
  	dictHeadState:''
  },
  constConfig:[
    { type: 'input', placeholder: '请输入常量编码', key: 'dictHeadId', label: '常量编码' },
    { type: 'input', placeholder: '请输入常量名称', key: 'dictHeadName', label: '常量名称' },
    { type: 'select', placeholder:'请选择',key: 'dictHeadType',label: '常量类型',options:[{label:'系统级常量',value:'0'},{label:'常量级常量',value: '1'},{label:'应用级常量',value: '2'}]},
    { type: 'select', placeholder:'有效状态',key: 'dictHeadState',label: '有效性',options:[{label:'有效',value:'1'},{label:'无效',value: '0'}]},
    { type: 'input', placeholder: '请输入常量描述', key: 'dictHeadDesc', label: '常量描述' },
    { type: 'input', placeholder: '请输入顺序', key: 'dictHeadSort', label: '顺序' }
  ],
  constFormData:{
  	dictHeadId: '',
  	dictHeadName:'',
  	dictHeadType:'',
  	dictHeadState:'',
  	dictHeadDesc:'',
  	dictHeadSort:''
  },
  constRules: {
    dictHeadName: [
      { required: true, message: '常量名称不能为空', trigger: 'blur' }
    ],
    dictHeadType: [
      { required: true, message: '常量类型不能为空', trigger: 'change' }
    ],
    dictHeadSort: [
      { required: false, trigger: 'blur' },
      { validator: regex.checkOrder, trigger: 'blur' }
    ],
    dictHeadId: [
      { required: true, message: '常量编码不能为空', trigger: 'blur' },
      { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' },
      { validator: regex.checkCode, trigger: 'blur' }
    ]
  },
  constValConfig: [
    { type: 'input', placeholder: '请输入常量编码', key: 'dictId', label: '常量编码' },
    { type: 'input', placeholder: '请输入常量名称', key: 'dictName', label: '常量名称' },
    { type: 'input', placeholder: '请输入常量描述', key: 'dictDesc', label: '常量描述' },
    { type: 'input', placeholder: '请输入顺序', key: 'dictSort', label: '顺序' },
  ],
  constValFormData: {
  	dictHeadId: '',
  	dictId:'',
  	dictName: '',
  	dictDesc: '',
  	dictSort: '',
  	parentId: ''
  },
  constValRules: {
    dictName: [
      { required: true, message: '常量值名称不能为空', trigger: 'blur' }
    ],
    dictSort: [
      { required: false, trigger: 'blur' },
      { validator: regex.checkOrder, trigger: 'blur' }
    ],
    dictId: [
      { required: true, message: '常量值编码不能为空', trigger: 'blur' },
      { min: 1, max: 100, message: '长度在 1 到 100 个字符', trigger: 'blur' },
      { validator: regex.checkCode, trigger: 'blur' }
    ]
  }
}

export const columnConfig = [
  {key:'id',label: '常量编码'},
  {key:'name',label: '常量名称'},
  {key:'typeName',label: '常量类型'},
  {key:'desc',label: '常量描述'},
  {key:'stateName',label: '是否有效'},
  {key:'sort',label: '顺序'}
]
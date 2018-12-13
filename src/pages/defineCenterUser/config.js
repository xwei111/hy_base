import regex from '@/utils/regex'


const configChild1 = [
  { type: 'input', placeholder: '请输入用户名', key: 'userId', label: '用户名' },
  { type: 'input', placeholder: '请输入姓名', key: 'userName', label: '姓名' },
  { type: 'select', placeholder: '请选择', key: 'workflowState', label: '人员标签', options:[{label:'运维',value:'2'},{label:'省综',value:'1'},{label:'客户',value:'0'}] }
]
const configChild2 = [
  { type: 'input', placeholder: '请输入密码', key: 'password', label: '密码', kind: 'password' },
  { type: 'input', placeholder: '请再次输入密码', key: 'checkPassword', label: '确认密码', kind: 'password' }
]
const configChild3 = [
  { type: 'input', placeholder: '请输入手机号', key: 'tel', label: '手机' },
  { type: 'input', placeholder: '请输入邮箱', key: 'email', label: '邮箱' },
  { type: 'input', placeholder: '请输入座机号', key: 'shortTel', label: '座机号' }
]
const configChild4 = [
  { type: 'select', placeholder: '请选择组织', key: 'orgId', label: '所属组织', disabled: true, options: [] },
  { type: 'cascader', placeholder: '请选择单位', key: 'comId', label: '所属单位', disabled: true, options: [], props: { value: 'orgId', label: 'orgName' } },
  { type: 'cascader', placeholder: '请选择部门', key: 'depId', label: '所属部门', disabled: true, options: [], props: { value: 'id' }  }
]
const configChild5 = [
  { type: 'select', placeholder: '请选择组织', key: 'orgId', label: '所属组织', disabled: false, options: [] },
  { type: 'cascader', placeholder: '请选择单位', key: 'comId', label: '所属单位', disabled: false, options: [], props: { value: 'orgId', label: 'orgName' } },
  { type: 'cascader', placeholder: '请选择部门', key: 'depId', label: '所属部门', disabled: false, options: [], props: { value: 'id' }  }
]
const formData1 = { userId: '', userName: '', workflowState: '', tel: '', email: '', shortTel: '', orgId: '', comId: [], depId: []}
const formData2 = { password: '', checkPassword: ''}

export const formConfig = {
	searchConfig:[
		{ type: 'input', placeholder: '用户名', key: 'userId', label: '' },
    { type: 'input', placeholder: '姓名', key: 'userName', label: '' },
	],
	searchData: { userId: '', userName: '' },
	userformConfig: [...configChild1,...configChild2,...configChild3,...configChild4],
  changeUserformConfig: [...configChild1,...configChild3,...configChild5],
	userformData: { ...formData1, ...formData2 },
	changeUserformData: { ...formData1 },
  userRules:{
		userId: [
      { required: true, message: '用户名不能为空', trigger: 'blur' },
      {  validator: regex.checkUsername, trigger: ['blur','change'] }
    ],
    userName: [
      { required: true, message: '姓名不能为空', trigger: 'blur' }
    ],
    workflowState: [
      { required: true, message: '请选择人员标签', trigger: ['blur','change'] }
    ],
    password: [
    	{ required: true, message: '请输入密码', trigger: 'blur' },
    	{  validator: regex.checkPass, trigger: ['blur','change'] }
    ],
    checkPassword: [
    	{ required: true, message: '请再次输入密码', trigger: 'blur' },
    	{  validator: regex.checkPassAgain, trigger: ['blur','change'] }
    ],
    tel: [
    	{ required: true, message: '请输入手机号', trigger: 'blur' },
      {  validator: regex.checkPhone, trigger: ['blur','change'] }
    ],
    email: [
      {  validator: regex.checkEmail, trigger: ['blur','change'] }
    ],
    orgId: [
    	{ required: true, message: '请选择组织', trigger: ['blur','change'] }
    ],
    comId: [
    	{ required: true, message: '请选择单位', trigger: ['blur'] },
      {  validator: regex.checkcomId, trigger: 'change' }
    ],
    depId: [
    	{ required: true, message: '请选择部门', trigger: ['blur'] },
      {  validator: regex.checkdepId, trigger: 'change' }
    ]
	}
}

export const columnConfig = [
	{key:'userId',label: '用户名'},
	{key:'userName',label: '姓名'},
	{key:'tel',label: '电话'},
	{key:'email',label: '邮箱'},
	{key:'shortTel',label: '座机号'}
]

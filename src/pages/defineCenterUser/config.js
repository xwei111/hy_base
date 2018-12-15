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
  { type: 'select', placeholder: '请选择组织', key: 'orgId', label: '所属组织', options: [] },
  { type: 'cascader', placeholder: '请选择单位', key: 'comId', label: '所属单位', options: [], props: { value: 'orgId', label: 'orgName' } },
  { type: 'cascader', placeholder: '请选择部门', key: 'depId', label: '所属部门', options: [], props: { value: 'id' }  }
]
const configChild5 = [
  { type: 'select', placeholder: '请选择组织', key: 'orgId', label: '所属组织', options: [] },
  { type: 'cascader', placeholder: '请选择单位', key: 'comId', label: '所属单位', options: [], props: { value: 'orgId', label: 'orgName' } },
  { type: 'cascader', placeholder: '请选择部门', key: 'depId', label: '所属部门', options: [], props: { value: 'id' }  }
]

export const formConfig = {
	searchConfig:[
		{ type: 'input', placeholder: '用户名', key: 'userId', label: '' },
    { type: 'input', placeholder: '姓名', key: 'userName', label: '' },
	],
	searchData: { userId: '', userName: '' },
	userformConfig: [...configChild1,...configChild2,...configChild3,...configChild4],
  changeUserformConfig: [...configChild1,...configChild3,...configChild5],
	userformData: { userId: '', userName: '', workflowState: '', tel: '', email: '', shortTel: '', orgId: '', comId: [], depId: [], password: '', checkPassword: ''},
  userRules:{
		userId: [
      { required: true, message: '用户名不能为空', trigger: 'blur' },
      {  validator: regex.checkUsername, trigger: ['blur'] }
    ],
    userName: [
      { required: true, message: '姓名不能为空', trigger: 'blur' }
    ],
    workflowState: [
      { required: true, message: '请选择人员标签', trigger: ['blur', 'change'] }
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
      {  validator: regex.checkPhone, trigger: ['blur'] }
    ],
    email: [
      {  validator: regex.checkEmail, trigger: ['blur'] }
    ],
    orgId: [
    	{ required: true, message: '请选择组织', trigger: ['blur', 'change'] }
    ],
    comId: [
    	{ required: true, message: '请选择单位', trigger: ['blur', 'change'] }
    ],
    depId: [
    	{ required: true, message: '请选择部门', trigger: ['blur', 'change'] }
    ]
	},
  passwordConfig: [
    { type: 'input', placeholder: '请输入旧密码', key: 'oldPassword', label: '旧密码', kind: 'password' },
    { type: 'input', placeholder: '请输入新密码', key: 'newPassword', label: '新密码', kind: 'password' },
  ],
  passwordData: { oldPassword: '', newPassword: '' },
  passRules: {
    oldPassword: [
      { required: true, message: '旧密码不能为空', trigger: 'blur' }
    ],
    newPassword: [
      { required: true, message: '新密码不能为空', trigger: 'blur' },
      {  validator: regex.checkPass, trigger: ['blur'] }
    ]
  },
  resetConfig: [
    { type: 'input', placeholder: '请输入管理员密码', key: 'adminPassword', label: '管理员密码', kind: 'password' },
    { type: 'input', placeholder: '请输入新密码', key: 'password', label: '新密码', kind: 'password' },
    { type: 'input', placeholder: '请再次输入新密码', key: 'checkPassword', label: '确认新密码', kind: 'password' }
  ],
  resetData: { adminPassword: '', password: '',  checkPassword: '' },
  resetRules: {
    adminPassword: [
      { required: true, message: '请输入管理员密码', trigger: 'blur' }
    ],
    password: [
      { required: true, message: '请输入新密码', trigger: 'blur' },
      {  validator: regex.checkPass, trigger: ['blur','change'] }
    ],
    checkPassword: [
      { required: true, message: '请再次输入新密码', trigger: 'blur' },
      {  validator: regex.checkPassAgain, trigger: ['blur','change'] }
    ],
  }
}

export const columnConfig = [
	{key:'userId',label: '用户名'},
	{key:'userName',label: '姓名'},
	{key:'tel',label: '电话'},
	{key:'email',label: '邮箱'},
	{key:'shortTel',label: '座机号'}
]

import regex from '@/utils/regex'

export const formConfig = {
	searchConfig:[
		{ type: 'input', placeholder: '用户名', key: 'userId', label: '' },
    { type: 'input', placeholder: '姓名', key: 'userName', label: '' },
	],
	searchData: { userId: '', userName: '' },
	userformConfig: [
		{ type: 'input', placeholder: '请输入用户名', key: 'userId', label: '用户名' },
		{ type: 'input', placeholder: '请输入姓名', key: 'userName', label: '姓名' },
		{ type: 'select', placeholder: '请选择', key: 'workflowState', label: '人员标签', options:[{label:'运维',value:'2'},{label:'省综',value:'1'},{label:'客户',value:'0'}] },
		{ type: 'input', placeholder: '请输入密码', key: 'password', label: '密码' },
		{ type: 'input', placeholder: '请再次输入密码', key: 'checkPassword', label: '确认密码' },
		{ type: 'input', placeholder: '请输入手机号', key: 'tel', label: '手机' },
		{ type: 'input', placeholder: '请输入邮箱', key: 'email', label: '邮箱' },
		{ type: 'input', placeholder: '请输入座机号', key: 'shortTel', label: '座机号' },
		{ type: 'select', placeholder: '请选择组织', key: 'organizeId', label: '所属组织' },
		{ type: 'cascader', placeholder: '请选择单位', key: 'orgId', label: '所属单位', options: [{value: 'zhinan',label: '指南',children:[{value:'hehe',label: '呵呵'}]},{value: 'haha',label: '哈哈'}] },
		{ type: 'select', placeholder: '请选择部门', key: 'id', label: '所属部门' }
	],
	userformData: { userId: '', userName: '', workflowState: '', password: '', checkPassword: '', tel: '', email: '', shortTel: '', organizeId: '', orgId: '', id: ''},
	userRules:{
		userId: [
      { required: true, message: '用户名不能为空', trigger: 'blur' },
      {  validator: regex.checkUsername, trigger: 'change' }
    ],
    userName: [
      { required: true, message: '姓名不能为空', trigger: 'blur' }
    ],
    workflowState: [
      { required: true, message: '请选择人员标签', trigger: 'change' }
    ],
    password: [
    	{ required: true, message: '请输入密码', trigger: 'blur' },
    	{  validator: regex.checkPass, trigger: 'change' }
    ],
    checkPassword: [
    	{ required: true, message: '请再次输入密码', trigger: 'blur' },
    	{  validator: regex.checkPassAgain, trigger: 'change' }
    ],
    tel: [
    	{ required: true, message: '请输入手机号', trigger: 'blur' },
      {  validator: regex.checkPhone, trigger: 'change' }
    ],
    email: [
      {  validator: regex.checkEmail, trigger: 'change' }
    ],
    organizeId: [
    	{ required: true, message: '请选择组织', trigger: 'blur' }
    ],
    orgId: [
    	{ required: true, message: '请选择单位', trigger: 'blur' }
    ],
    id: [
    	{ required: true, message: '请选择部门', trigger: 'blur' }
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

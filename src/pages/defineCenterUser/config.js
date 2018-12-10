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
		{ type: 'input', placeholder: '请输入座机号', key: 'shortTel', label: '座机号' }
	],
	userformData: { userId: '', userName: '', workflowState: '', password: '', checkPassword: '', tel: '', email: '', shortTel: ''},
	userRules:{
		userId: [
      { required: true, message: '用户名不能为空', trigger: 'blur' }
    ],
    userName: [
      { required: true, message: '姓名不能为空', trigger: 'blur' }
    ],
    workflowState: [
      { required: true, message: '请选择人员标签', trigger: 'blur' }
    ],
    password: [
    	{ required: true, message: '请输入密码', trigger: 'blur' }
    ],
    checkPassword: [
    	{ required: true, message: '请再次输入密码', trigger: 'blur' }
    ],
    tel: [
    	{ required: true, message: '请输入手机号', trigger: 'blur' }
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

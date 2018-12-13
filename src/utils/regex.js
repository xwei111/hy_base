// 手机
const phoneNumber = phoneNumber => {
  // 中国移动
  const cm = phoneNumber => {
    let reg = /^1(34[0-8]|(3[5-9]|5[017-9]|78|98|8[2-478])\d)\d{7}$/
    let regex = new RegExp(reg)
    let isPhoneNumber = regex.test(phoneNumber)
    return isPhoneNumber
  }
  // 中国联通
  const cu = phoneNumber => {
    let reg = /^1(3[0-2]|5[256]|76|66|8[56])\d{8}$/
    let regex = new RegExp(reg)
    let isPhoneNumber = regex.test(phoneNumber)
    return isPhoneNumber
  }
  // 中国电信
  const ct = phoneNumber => {
    let reg = /^1((33|53|77|99|8[019])[0-9]|349)\d{7}$/
    let regex = new RegExp(reg)
    let isPhoneNumber = regex.test(phoneNumber)
    return isPhoneNumber
  }
  // 其他
  const other = phoneNumber => {
    let reg = /^1(3[0-9]|5[0-35-9]|70|8[0-9])\d{8}$/
    let regex = new RegExp(reg)
    let isPhoneNumber = regex.test(phoneNumber)
    return isPhoneNumber
  }
  let info = {}
  cm(phoneNumber)
    ? (info = { phoneNumber: true, serviceProvider: '中国移动' })
    : cu(phoneNumber)
      ? (info = { phoneNumber: true, serviceProvider: '中国联通' })
      : ct(phoneNumber)
        ? (info = { phoneNumber: true, serviceProvider: '中国电信' })
        : other(phoneNumber)
          ? (info = { phoneNumber: true, serviceProvider: '其他服务商' })
          : (info = { phoneNumber: false, serviceProvider: '' })
  return info
}

// 邮箱验证
const email = val => /^([A-Za-z0-9_\-\.\u4e00-\u9fa5])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,8})$/.test(val)

class Regex{
	constructor() {
		this.pass = null
  }
  checkCode(rule, value, callback) {
  	const reg = /^[A-Za-z0-9_]+$/
	  if (reg.test(value)) {
	    callback()
	  } else {
	    return callback(new Error('正确编码格式为:长度在1~100之间,只能包含字母数字或者下划线'))
	  }
  }
  checkOrder(rule, value, callback) {
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
  checkUsername(rule, value, callback) {
    const reg = /^[p.][0-9]{1,19}$/
    const telReg = /^[1][3,4,5,7,8][0-9]{9}$/
    if (reg.test(value) || telReg.test(value)) {
      callback()
    } else {
      callback(new Error('请输入格式为：p+数字且不能超过20位的组合或者有效手机号'))
    }
  }
  checkPass = (rule, value, callback) => {
    const reg = /^(?![^a-zA-Z]+$)(?!\D+$)/
    this.pass = value
    if (!reg.test(value)) {
      callback(new Error('密码必须包含至少一位数字和一位字母'))
    }
    callback()
  }
  checkPassAgain = (rule, value, callback) => {
  	if(value!=this.pass){
  		callback(new Error('两次输入密码不一致'))
  	}
  	callback()
  }
  checkPhone(rule, value, callback) {
    const tell = phoneNumber(value)
    if (value === '') {
      callback()
      return
    }
    if (tell.phoneNumber) {
      callback()
    } else {
      callback('手机号格式错误')
    }
  }
  checkEmail(rule, value, callback) {
    const ifEmail = email(value)
    if (value === '' || value === null || value === undefined || !value) {
      callback()
    }
    if (ifEmail) {
      callback()
    } else {
      callback('邮箱格式错误')
    }
  }
}

export default new Regex()
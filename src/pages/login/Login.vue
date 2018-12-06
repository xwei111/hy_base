<template>
  <div class='loginBox'>
    <el-form class='loginForm' ref='loginFormRef' :rules='rules' :model='loginForm'>
      <el-form-item prop="username">
        <el-input v-model="loginForm.username" prefix-icon="el-icon-service" placeholder="用户名"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input v-model="loginForm.password" prefix-icon="el-icon-view" type="password" placeholder="密码" @keyup.enter.native="submitForm('ruleForm')"></el-input>
      </el-form-item>
      <div class='remberPass'>
        <el-checkbox class='remberCheck' v-model="checked">记住密码</el-checkbox>
      </div>
      <el-button class='loginBtn' type="primary" @click="submitForm">登录</el-button>
    </el-form>
  </div>
</template>

<script>
import addMenuRouter from '@/utils/addMenuRouter'
import RSA from '@/utils/RSA'
import {mapMutations} from 'vuex'
import { login, loginRcs, getWorkBenchData } from '@/api/login'

export default {
  name: 'Login',
  data () {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [{required: true,message: '请输入用户名',trigger: 'blur'}],
        password: [{required: true,message: '请输入密码',trigger: 'blur'}]
      },
      checked: true
    }
  },
  created() {
    const userInfo = this.m_getCookies('userInfo')
    if(userInfo) this.loginForm = { username: userInfo.username, password: userInfo.pass }
  },
  methods: {
    submitForm(){
      this.$refs.loginFormRef.validate((valid)=>{
        if(valid) {
          this.oneByone()
        } else {
          console.log('error submit!!');
          return false;
        }
      })
    },
    async oneByone(){
      const userInfo = await this._loginRcs()
      const loginData = await this._login(userInfo.username, userInfo.pass)
      if(loginData){
        await this.setToken(loginData.token)
        await this._setUserInfoCookie(loginData.userInfo)
        await this.setUserid(loginData.username)
        const benData = await this._getWorkBenchData(loginData.username)
        benData&&await this.setAppid(benData[0].appId)
        const menuRouter = await this._addMenuRouter()
        await this.setMenuRouterData(JSON.parse(JSON.stringify(menuRouter)))
        await this.$router.addRoutes(menuRouter)
        await this.$router.push('/main')
      }
    },
    _loginRcs(){
      return loginRcs().then((res)=>{
        if(res.statusCode == '200'){
          RSA.setMaxDigits(130)
          const { publicExponent, publicModulus } = res.result
          const { username, password } = this.loginForm
          const key = new RSA.RSAKeyPair(publicExponent, '', publicModulus)
          const pass = password.length < 32 ? RSA.encryptedString(key, encodeURIComponent(password)) : password;
          return { username: username, pass: pass }
        }
      })
    },
    _login(username,pass){
      return login(username,pass).then((res)=>{
        if(res.statusCode == '200') {
          const { accessToken } = res.result
          const { expireTime, token } = JSON.parse(accessToken)
          const saveToken = { accessToken: token, xHyToken: res.result['x-hy-token'] }
          const userInfo = { username: username, pass: pass }          
          return { username: username, userInfo: userInfo, token: saveToken }
        }
      })
    },
    _getWorkBenchData(username) {
      return getWorkBenchData(username).then((res)=>{
        if(res.statusCode == '200') return res.result
      })
    },
    _addMenuRouter() {
      return addMenuRouter.getMenuRouter().then((data)=> data)
    },
    _setUserInfoCookie(userInfo) {
      if(this.checked) {
        this.m_setCookies({
          keyName: 'userInfo',
          value: userInfo,
          time: 60*60*24*7
        })
      }else{
        this.m_removeCookies('userInfo')
      }
    },
    ...mapMutations({
      setMenuRouterData: 'SET_MENUROUTERDATA',
      setToken: 'SET_TOKEN',
      setAppid:'SET_APPID',
      setUserid:'SET_USERID'
    })
  }
}
</script>
<style scoped>
@import './index.css';
</style>

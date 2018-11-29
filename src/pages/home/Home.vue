<template>
  <div class='hyHome'>
    <div class='fml'>
      <h1>应用开发管理平台</h1>
      <h3>Application Development Management Platform</h3>
    </div>
    <div class='loginForm'>
      <p class='title fml'>用户登录</p>
      <Login></Login>
    </div>
    <div class='footer fml'>
      <p>
        &nbsp;&nbsp; @&nbsp;2018-2019&nbsp;&nbsp;浙江华云信息科技有效公司 &nbsp;&nbsp;版权所有
      </p>
      <p>
        &nbsp;&nbsp; @&nbsp;2018-2019&nbsp;&nbsp;zhejiang huayun info &amp; tech co.,LTD. &nbsp;&nbsp;All RIghts Reserved
      </p>
    </div>
  </div>
</template>

<script>
import Login from '../login/Login'
export default {
  name: 'Home',
  data () {
    return {
    }
  },
  components: {
    Login
  }
}
</script>
<style>
@import './index.css';
</style>

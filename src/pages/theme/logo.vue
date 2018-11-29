<template>
  <div class='logoBox hy_logoBg'>
    <img class='logo' v-if='isCollapse' src='../../assets/smallLogo.png' />
    <img class='logo' v-else src='../../assets/logo.png' />
  </div>
</template>

<script>
export default {
  name: 'logo',
  props:{
    isCollapse: {
      type: Boolean,
      default() {
        return false
      }
    }
  }
}
</script>
<style scoped>
.logoBox{
  width: 100%;
  height: 48px;
  line-height: 48px;
  & .logo{
    margin-left: 15px;
  }
}
</style>

import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

//  reset CSS
import "normalize.css/normalize.css";
import '@/styles/base.css'
import '@/styles/hyCommon.css'

import VueCookies from 'vue-cookies'
Vue.use(VueCookies)

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI);
Vue.config.productionTip = false

import vuePlugin from './vuePlugin';
Vue.use(vuePlugin)

const vm = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')

export default vm
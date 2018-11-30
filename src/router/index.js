import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import addMenuRouter from '@/utils/addMenuRouter'

const Home = resolve => require(['@/pages/home/Home'], resolve)
const Notfound = resolve => require(['@/pages/404/Notfound'], resolve)

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/404',
      component: Notfound
    },
    {
      path: '*',
      redirect: '/404',
      component: Notfound
    }
  ]
})

function addcom(val){
  val.map((item)=>{
    item.component = addMenuRouter.getr(item.name)
    if(item.children){
      addcom(item.children)
    }
  })
}

if(store.state.menuRouterData){
  let menuRouterData = JSON.parse(JSON.stringify(store.state.menuRouterData))
  addcom(menuRouterData)
  router.addRoutes(menuRouterData)
}

router.beforeEach((to,from,next) => {
  const toName = to.name;
  const token = store.state.token.accessToken?store.state.token.accessToken:null
  
  if(!token&&toName!=='Home'){
      next({
        name:'Home'
      })
  }else{
    if(to.path){
      if(token&&(to.name == 'Home')){
        next({name:from.name})
      }else{
        next()
      }
    }else{
      next({path:'/404'})
    }
  }
})

export default router
import { getMenuData } from '@/api/menu'
import store from '@/store'
import config from './config'

const main = resolve => require(['@/pages/main/main'], resolve)

const mainRoutes = [{
  path: '/main',
  name: 'main',
  component: main
}]

let child = [],
	obj = {},
	menuRouteList = [],
	keepAliveArr = {}

export const getr =(com)=>{
  return resolve => require([`@/pages/${com}/${com}.vue`], resolve)
}

function getchild(val) {
	if(val) {
		val.map((item)=>{
			item.meta = { keepAlive: true }
			item.icon = item.icon ?item.icon : ''
			item.id = item.id ? item.id : item.catalogId
			item.title = item.title ? item.title : item.catalogName
			if(!item.children){
		        item.name = item.name ? item.name : item.menuMark
		        item.path = `/main/${item.menuMark}`
		        item.component = getr(item.menuMark)
		        child.push(item)
		        keepAliveArr[item.menuMark] = {
		            keepAlive: item.meta.keepAlive,
		            closeTabs: item.meta.keepAlive
		        }
	      	}else if(item.children&&item.children.length>0){
	        	getchild(item.children)
	      	}
		})
	}
}

function  addwelcome() {
	menuRouteList.push({
		id:'welcome',
		title:'welcome',
		name:'welcome',
		path:'/welcome',
		meta:{keepAlive:true},
		component:getr('welcome')
	})
	keepAliveArr['welcome'] = {
		keepAlive: true,
    	closeTabs: true
	}
	mainRoutes[0].redirect = '/welcome'
}

function _findLastChild(val) {
  var lastChild 
  if(val.children&&val.children.length>0) {
    return _findLastChild(val.children[0])
  }else {
    lastChild = val
    return lastChild
  }
}

const addMenuRouter = ()=> {
	const p = new Promise((resolve,reject)=>{
		getMenuData().then((data)=>{
			if(data.statusCode == '200'){
				const res = data.result.children;
				// const res = [{
			 //          title:'定义中心',
			 //          id:'1',
			 //          icon:'el-icon-setting',
			 //          children:[{
			 //            title:'常量123123123',id:'1-1',path:'/main/defineCenterConst',name:'defineCenterConst',component:'defineCenterConst',menuMark:'defineCenterConst',children:[{
			 //            	title:'tes23123123t1',id:'1-1-1',path:'/main/test1',name:'test1',component:'test1',menuMark:'test1'
			 //            }]
			 //          },{
			 //            title:'用户111111',id:'1-2',path:'/main/defineCenterUser',name:'defineCenterUser',component:'defineCenterUser',menuMark:'defineCenterUser'
			 //          },{
			 //            title:'用户组22222222222',id:'1-3',path:'/main/defineCenterUserGroup',name:'defineCenterUserGroup',component:'defineCenterUserGroup',menuMark:'defineCenterUserGroup'
			 //          },{
			 //            title:'组织33333333333',id:'1-4',path:'/main/defineCenterOrganize',name:'defineCenterOrganize',component:'defineCenterOrganize',menuMark:'defineCenterOrganize'
			 //          },{
			 //            title:'角色4444444444',id:'1-5',path:'/main/defineCenterRole',name:'defineCenterRole',component:'defineCenterRole',menuMark:'defineCenterRole'
			 //          },{
			 //            title:'页面11111111111',id:'1-6',path:'/main/defineCenterPage',name:'defineCenterPage',component:'defineCenterPage',menuMark:'defineCenterPage'
			 //          },{
			 //            title:'应用222222',id:'1-7',path:'/main/defineCenterApp',name:'defineCenterApp',component:'defineCenterApp',menuMark:'defineCenterApp'
			 //          },{
			 //            title:'菜123123123单',id:'1-8',path:'/main/defineCenterMenu',name:'defineCenterMenu',component:'defineCenterMenu',menuMark:'defineCenterMenu'
			 //          },{
			 //            	title:'test12311131231232',id:'1-10',path:'/main/test2',name:'test2',component:'test2',menuMark:'test2'
			 //          }]
			 //        },
			 //        {
			 //          title:'权限配置',
			 //          id:'2',
			 //          icon:'el-icon-setting',
			 //          name:'authorityConfigureCenter',
			 //          path:'/main/authorityConfigureCenter',
			 //          component:'authorityConfigureCenter',
			 //          menuMark:'authorityConfigureCenter'
			 //        },
			 //        {
			 //          title:'消息中心',
			 //          id:'3',
			 //          icon:'el-icon-setting',
			 //          children:[{
			 //            title:'消息发123123123123送',id:'3-1',path:'/main/msgSendList',name:'msgSendList',component:'msgSendList',menuMark:'msgSendList'
			 //          },{
			 //            title:'消息接123123123收',id:'3-2',path:'/main/msgReceiveList',name:'msgReceiveList',component:'msgReceiveList',menuMark:'msgReceiveList',children:[{
			 //            	title:'test123123123123',id:'3-2-1',path:'/main/test3',name:'test3',component:'test3',menuMark:'test3'
			 //            }]
			 //          }]
			 //        },
			 //        {
			 //          title:'配置中心',
			 //          id:'4',
			 //          icon:'el-icon-setting',
			 //          children:[{
			 //            title:'数据权限基础配置',id:'4-1',path:'/main/defineTest',name:'defineTest',component:'defineTest',menuMark:'defineTest'
			 //          },{
			 //            title:'定时任务管理',id:'4-2',path:'/main/timeMessage',name:'timeMessage',component:'timeMessage',menuMark:'timeMessage'
			 //          }]
			 //        }
			 //      ]
				getchild(res)
				store.commit('SET_MENULIST',JSON.parse(JSON.stringify(res)))
				child.map((item)=>{
					obj = {
						id: item.id,
						title: item.title,
						name: item.name,
						path: `/main/${item.name}`,
						meta: item.meta,
						component: item.component
					}
					menuRouteList.push(obj)
				})
				if(!config.ifToWelcome){
					mainRoutes[0].redirect =  _findLastChild(menuRouteList[0])
				}else{
					addwelcome()
				}
        		mainRoutes[0].children = menuRouteList
        		store.commit('SET_KEEPALIVEARR',keepAliveArr)
				resolve(mainRoutes)
			}
		})
	})
	return p
}

export default addMenuRouter
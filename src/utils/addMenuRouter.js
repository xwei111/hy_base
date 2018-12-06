import { getMenuData } from '@/api/menu'
import store from '@/store'
import { config } from './config'
import common from './common.js'

const main = resolve => require(['@/pages/main/main'], resolve)

class AddMenuRouter {
	constructor() {
		this.mainRoutes = [{path: '/main',name: 'main',component: main}]
		this.child = []
		this.obj = {}
		this.menuRouteList = []
		this.keepAliveArr = {}
	}
	getr(com) {
		return resolve => require([`@/pages/${com}/${com}.vue`], resolve)
	}
	getchild(val) {
		if(val&&val.length>0) {
			val.map((item)=>{
				item.meta = { keepAlive: true }
				item.icon = item.icon ?item.icon : ''
				item.id = item.id ? item.id : item.catalogId
				item.title = item.title ? item.title : item.catalogName
				if(!item.children){
					item.name = item.name ? item.name : item.menuMark
					item.path = `/main/${item.menuMark}`
					item.component = this.getr(item.menuMark)
					this.child.push(item)
					this.keepAliveArr[item.menuMark] = {keepAlive: item.meta.keepAlive,closeTabs: item.meta.keepAlive}
				}else if(item.children&&item.children.length>0){
					this.getchild(item.children)
				}
			})
		}
	}
	addwelcome() {
		this.menuRouteList.push({
			id:'welcome',
			title:'welcome',
			name:'welcome',
			path:'/welcome',
			meta:{keepAlive:true},
			component:this.getr('welcome')
		})
		this.keepAliveArr['welcome'] = {
			keepAlive: true,
			closeTabs: true
		}
		this.mainRoutes[0].redirect = '/welcome'
	}
	_getMenuData() {
		return getMenuData().then((data)=>{
			if(data.statusCode == '200') return data.result.children
		})
	}
	addMainRoutes() {
		this.child.map((item)=>{
			this.obj = {
				id: item.id,
				title: item.title,
				name: item.name,
				path: `/main/${item.name}`,
				meta: item.meta,
				component: item.component
			}
			this.menuRouteList.push(this.obj)
		})
		if(!config.ifToWelcome){
			this.mainRoutes[0].redirect =  common.findLastChild(this.menuRouteList[0])
		}else{
			this.addwelcome()
		}
		this.mainRoutes[0].children = this.menuRouteList
		return this.mainRoutes
	}
	async getMenuRouter(){
		const menudata = await this._getMenuData()
		await this.getchild(menudata)
		await store.commit('SET_MENULIST',JSON.parse(JSON.stringify(menudata)))
		await store.commit('SET_KEEPALIVEARR',this.keepAliveArr)
		const mainRoutes = await this.addMainRoutes()
		return mainRoutes
	}
}

export default new AddMenuRouter()
import axios from '@/utils/axios'
import store from '@/store'
import qs from 'qs'

// 获取常量列表
export const getUserData = (obj) => {
	const { appId } = store.state
	const searchObj = qs.stringify(obj)
	return axios.get(`/hyitframe_sys_user/users/${appId}?${searchObj}`).then(res => res.data)
}
// 组织列表
export const getUserOrg = () => {
	const { appId, userId } = store.state
	return axios.get(`/hyitframe_sys_org/userAllOrg/${appId}?userId=${userId}`).then(res => res.data)
}
// 单位列表
export const getUserCom = (obj) => {
	const { appId, userId } = store.state
	const strObj = qs.stringify(obj)
	return axios.get(`/hyitframe_sys_org/userCompany/${appId}?userId=${userId}&${strObj}`).then(res => res.data)
}
// 部分列表
export const getUserDep = (obj) => {
	const { appId } = store.state
	const strObj = qs.stringify(obj)
	return axios.get(`/hyitframe_sys_org/userDept/${appId}?${strObj}`).then(res => res.data)
}
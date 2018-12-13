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
// 部men列表
export const getUserDep = (obj) => {
	const { appId } = store.state
	const strObj = qs.stringify(obj)
	return axios.get(`/hyitframe_sys_org/userDept/${appId}?${strObj}`).then(res => res.data)
}
// 新增用户
export const addUser = (obj) => {
	const { appId } = store.state
	return axios.post(`/hyitframe_sys_user/user/${appId}/zhnyxxpt`, obj).then(res => res.data)
}
// 用户详情
export const userDetail = (userId) => {
	const { appId } = store.state
	return axios.get(`/hyitframe_sys_user/users/${appId}/${userId}`).then(res => res.data)
}
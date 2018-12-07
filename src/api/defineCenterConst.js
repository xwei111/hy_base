import axios from '@/utils/axios'
import store from '@/store'
import qs from 'qs'

// 获取常量列表
export const getConstData = (obj) => {
	const { appId } = store.state
	const searchObj = qs.stringify(obj)
	return axios.get(`/hyitframe_sys_dict/dicts/${appId}?${searchObj}`).then(res => res.data)
}
// 常量新增
export const addConst = (obj) => {
	const { appId } = store.state
	return axios.post(`/hyitframe_sys_dict/dictHead/${appId}`, obj).then(res => res.data)
}
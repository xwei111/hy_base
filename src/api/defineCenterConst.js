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
// 常量修改
export const changeConst = ({ uuid, obj}) => {
	const { appId } = store.state
	return axios.put(`/hyitframe_sys_dict/dictHead/${appId}/${uuid}`, obj).then(res => res.data)
}
// 常量值新增
export const addConstVal = (obj) => {
	const { appId } = store.state
  return axios.post(`/hyitframe_sys_dict/dict/${appId}`, obj).then(res => res.data)
}
// 常量值修改
export const changeConstVal = ({ uuid, obj }) => {
	const { appId } = store.state
  return axios.put(`/hyitframe_sys_dict/dict/${appId}/${uuid}`, obj).then(res => res.data)
}
// 常量删除
export const deleteConst = ({ uuid, obj }) => {
	const { appId } = store.state
	const deleteObj = qs.stringify(obj)
  return axios.delete(`/hyitframe_sys_dict/dictHead/${appId}/${uuid}?${deleteObj}`).then(res => res.data)
}
// 常量值删除
export const deleteConstVal = (uuid) => {
	const { appId } = store.state
  return axios.delete(`hyitframe_sys_dict/dict/${appId}/${uuid}`).then(res => res.data)
}
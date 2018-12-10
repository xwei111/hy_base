import axios from '@/utils/axios'
import store from '@/store'
import qs from 'qs'

// 获取常量列表
export const getUserData = (obj) => {
	const { appId } = store.state
	const searchObj = qs.stringify(obj)
	return axios.get(`/hyitframe_sys_user/users/${appId}?${searchObj}`).then(res => res.data)
}
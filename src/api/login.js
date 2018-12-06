import axios from '@/utils/axios'
import store from '@/store'

const id = 'zhnyxxpt'

// 加密
export const loginRcs = () => {
	return axios.get(`/hyitframe_sys_login/getPublicKey/${id}`).then(res => res.data)
}
// 登录
export const login = (username,pass) => {
    return axios.get(`/hyitframe_sys_login/login/${id}/${username}/${pass}`).then(res => res.data)
}
// 获得workbench数据(导航数据)
export const getWorkBenchData = (username) => {
	return axios.get(`/hyitframe_sys_login/apps/${id}/${username}`).then(res => res.data)
}
// 退出
export const loginOut = () => {
	const { token, appId } = store.state
	return axios.get(`/hyitframe_sys_system/logOut/${appId}?token=${token.accessToken}`).then(res => res.data)
}

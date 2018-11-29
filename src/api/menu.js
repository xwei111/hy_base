import axios from '@/utils/axios'
import store from '@/store'

// 获取菜单栏信息
export const getMenuData = () => {
	const { appId, userId } = store.state
	return axios.get(`/hyitframe_sys_menu/menus/${appId}/${userId}`).then(res => res.data)
}

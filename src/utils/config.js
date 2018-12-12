const { NODE_ENV } = process.env
// const devhost = 'http://172.30.8.72:8080/hyitframeworks-dubbox-rest-war' // 覃兆俊
// const devhost = 'http://172.30.9.162:8080/hyitframeworks-dubbox-rest-war' // 陈志
// const devhost = 'http://172.30.9.43:8080/hyitframeworks-dubbox-rest-war' // 伟伟
const devhost = 'http://172.30.83.29:8080/hyitframeworks-dubbox-rest-war' // 服务器

const productionUrl = window.location.hostname === '172.30.83.29' ? 'http://172.30.83.29:8080/hyitframeworks-dubbox-rest-war' : 'http://183.134.216.97:58080/hyitframeworks-dubbox-rest-war'

const httpObj = {
  devtest: `http://172.30.83.35:8080/hyitframeworks-dubbox-rest-war`,
  cz: `http://172.30.83.107:8080/hyitframeworks-dubbox-rest-war`,
  cn: `http://10.146.247.68:8080/hyitframeworks-dubbox-rest-war`,
  production: productionUrl,
  development: devhost
}

const loginOutUrl = NODE_ENV === 'development' ? '/' : '/frame-front'

export const config = {
	ifToWelcome: false,//首次进入是否进入欢迎页
	ifShowTabs: true,//是否显示tabs
	themeColor: {
	    hy_logoBg: 'rgb(84, 92, 100)',//logo背景色
	    hy_headerBg: 'rgb(84, 92, 100)',//头部背景色
	    hy_sliderBg: 'rgb(84, 92, 100)',//左侧导航栏背景色
	    hy_silderColor: '#f3f3f3',//左侧导航栏字体颜色
	    hy_silderActiveColor: '#409EFF',//左侧导航栏选中字体颜色
	    hy_element: '#409EFF' //element主题色
	},
	themeType: '1',//布局（1,2,3,4）
	baseURL: httpObj[NODE_ENV], //ipbaseURL
	loginOutUrl: loginOutUrl
}

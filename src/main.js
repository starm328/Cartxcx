import Vue from 'vue'
import App from './App'
import wxpro from '@/utils/wx-pro.js';
Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()

export default {
	// 这个字段走 app.json
	config: {
		// 页面前带有 ^ 符号的，会被编译成首页，其他页面可以选填，我们会自动把 webpack entry 里面的入口页面加进去
		pages: [
			'pages/index/main',
			'pages/user/main',
			'^pages/ticket/list/main',
			'pages/member/main',
			'pages/shop/main',
			'pages/product/page/main',
			'pages/store/assistants/home/main',
			'pages/store/assistants/list/main',
			'pages/store/assistants/show/main',
			'pages/store/assistants/accepting/main',
			'pages/store/assistants/receipt/main',
		],
		window: {
			backgroundTextStyle: 'light',
			navigationBarBackgroundColor: '#fff',
			navigationBarTitleText: '牛爸爸',
			navigationBarTextStyle: "black",
		},
		tabBar:{
			borderStyle: 'black',
			selectedColor:'#39b54a',
			list:[
				{
					text:'牛爸爸',
					pagePath:'pages/index/main',
					iconPath:'static/images/home.png',
					selectedIconPath:'static/images/home-active.png'
				},
				{
					text:'宗道名品',
					pagePath:'pages/shop/main',
					iconPath:'static/images/car.png',
					selectedIconPath:'static/images/car-active.png'
				},
				{
					text:'会员',
					pagePath:'pages/member/main',
					iconPath:'static/images/member.png',
					selectedIconPath:'static/images/member-active.png'
				},
				{
					text:'我',
					pagePath:'pages/user/main',
					iconPath:'static/images/user.png',
					selectedIconPath:'static/images/user-active.png'
				}
			]
		}
	}
}

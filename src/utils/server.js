export default {
	env: 'test', //测试环境
	cowdad: {
		shopName: 'cowdad',
		shopTitle: '牛爸爸家电清洗',
		apiBaseUrl: 'https://shop.mallkd.com/api/v1/zh-CN/c-cowdad/',
		apiGlobalUrl: 'https://shop.mallkd.com/api/v1/zh-CN/',
		rootArea:1, //地址选择配置
	},
	catShop: {
		shopName: 'test',
		shopTitle: 'test',
		apiBaseUrl: 'https://shop.test.mallkd.com/api/v1/zh-CN/c-test/',
		apiGlobalUrl: 'https://shop.test.mallkd.com/api/v1/zh-CN/',
		rootArea:1, //地址选择配置
	},
	MobileEnd: {
		apiBaseUrl: 'https://mbe.test.mallkd.com/',  //手机接口地址
		userProvider: 2,
		app: 1,
	},
	wechatEnd: {
		apiBaseUrl: 'https://wxe.test.mallkd.com/',  //微信接口地址
		userProvider: 4,
		wxApp: 2,
		app: 4,
	},
	Advert:{
		apiBaseUrl:'https://adv.cat.mallkd.com/api/',
		app:2,
	},
	Store: {
		ExtensionApp:6,
		Service:1,
		url:'https://stores.test.mallkd.com/api/a-1/'
	},
	Titcket: {
		ExtensionApp:3,
		url:'https://tkt.test.mallkd.com/api/extension-app/1/',
		Authurl:'https://tkt.test.mallkd.com/api/extension-app/1/auth-code/',
	},
}


import configs from '@/utils/server';
class AuthManager
{
	// 放在组件里用的
	proxy= {

		// 是否完成加载
		loaded: false,

		// 是否登录
		logined: false,

		// 平台用户
		user: undefined,

		// 主登录令牌
		token: undefined,

		// 所有登录令牌
		tokens: [],
	};
	constructor()
	{
		if(wx.getStorageSync('token') && new Date(wx.getStorageSync('token').expired_at) > new Date()) {
			this.proxy.token = wx.getStorageSync('token');
			this.getUser(wx.getStorageSync('token').token)
		// 如果token过期刷新token
		}else if(wx.getStorageSync('token') && new Date(wx.getStorageSync('token').expired_at) <= new Date()){
			this.refresh()
		}else{
			this.proxy.loaded = true
		}

	}

	// 获取token
	login(e) {
		var _this = this;
		wx.showLoading({
			mask: true,
			title: '加载中',
		})
		wx.login({
			success: function(res) {
				if (res.code) {
					//发起网络请求
					wx.pro.request({
						url:  `${configs.wechatEnd.apiBaseUrl}oauth/w-${configs.wechatEnd.wxApp}/a-${configs.wechatEnd.app}/wxa-login/`+res.code ,
						method: 'POST',
						data:{
							encryptedData:e.encryptedData,
							iv:e.iv
						}
					})
					.then(d => {
						if(d.statusCode == 200){
							wx.hideLoading();
							_this.proxy.logined =true
							_this.getUser(d.data.token)
							_this.proxy.token = d.data
							wx.setStorageSync('token',d.data)
						}

						// 2XX, 3XX
					})
					.catch(err => {
						wx.hideLoading();
						// 网络错误、或服务器返回 4XX、5XX
					})
				} else {

				}
			}
		})
	}

	// 获取用户
	getUser( token )
	{
		// 基于时间的缓存，缓存未失效时，用任何Token都能拿到此User，以避免429
		// let cachedUser= Storage.get( `User-Until` );
		// if( cachedUser && (new Date( cachedUser.expiredAt ) <= new Date) )
		// {
		// 	return Promise.resolve( cachedUser.user );
		// }
		wx.pro.request({
			url: configs.catShop.apiBaseUrl+'user',
			method: 'GET',
			header:{token:token}
		})
		.then(d => {
			if(d.statusCode == 204){
				this.proxy.loaded =true
				this.proxy.logined =false
			}else if(d.statusCode == 200){
				this.proxy.loaded =true
				this.proxy.logined =true
				this.proxy.user = d.data
			}
			// 2XX, 3XX
		})
		.catch(err => {
			if(err.statusCode == 401){
				console.log(this.proxy.token)
				if(this.proxy.token){
					this.refresh()
				}else{
					 wx.removeStorageSync('token')
					this.proxy.token = ''
					this.proxy.loaded =true
					console.log('11',this.proxy.token )
				}
			}
			// 网络错误、或服务器返回 4XX、5XX
		})
	}
	// 刷新token
	refresh() {
		var  _this = this;
		wx.pro.request({
			url:  `${configs.catShop.apiBaseUrl}token/${wx.getStorageSync('token').token}`,
			method: 'POST',
		})
		.then(d => {
			if(d.statusCode == 200){
				_this.proxy.loaded =true
				_this.proxy.token = d.data
				wx.setStorageSync('token',d.data)
			}
			// 2XX, 3XX
		})
		.catch(err => {
			if(err.statusCode == 404){
				console.log(err)
				wx.removeStorageSync('token')
				this.proxy.token = ''
				this.proxy.loaded =true
			}
			// 网络错误、或服务器返回 4XX、5XX
		})
	}


}
export default new AuthManager();

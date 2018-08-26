// 分润身份
import configs from '@/utils/server';
class CommissionRoles{
	constructor(data){
		this.data = data;
	}

	get id()
	{
		return this.data.id;
	}

	get label()
	{
		return this.data.label;
	}


	get is_default()
	{
		return this.data.is_default;
	}

}


export default (local=> (
	(local
		? Promise.resolve( local )
		: wx.pro.request({
			url: configs.catShop.apiBaseUrl+'commission-roles',
			method: 'GET',
			})
			.then(d => {
				// 2XX, 3XX
			})
			.catch(err => {
				wx.removeStorageSync('token')
				this.login()
				// 网络错误、或服务器返回 4XX、5XX
			})
	)
) )( wx.getStorageSync('CommissionRoles')).then(commission_roles=>commission_roles.map(commission_roles=>new CommissionRoles(commission_roles)));


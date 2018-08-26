// 下单选择地址跳转
import configs from '@/utils/server';
import Auth from '@/utils/Server/Auth';

export default {
	adding: false,

	add( product_id, quantity,receiver_type='',receiver_id='',callback=null){
		if( this.adding )
		{
			return;
		}
		this.adding= true;
		let promise = wx.pro.request({
					url:`${configs.catShop.apiBaseUrl}orders`,
					method: 'POST',
					data:{
						product_id,
						quantity,
						receiver_type,
						receiver_id
					},
					header: {
						token:Auth.token
					}
				})
				.then(d => {
					// 2XX, 3XX
					console.log(d)
				})
				.catch(err => {
					if(err.statusCode == 401){
						Auth.login();
					}
				})
		;
		callback && (promise = callback(promise));


		return promise;
	},
};

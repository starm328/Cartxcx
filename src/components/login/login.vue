<template>
	<div class="login-form">
		<form @submit="formSubmit" v-if="login">
			<div class="form-li">
				<div class="item" style="position:relative">
					<div class="item-left">
						手机号：
					</div>
					<div class="item-right">
						<input type="number" name="phone" maxlength="11" v-model="sendcode.mobile" placeholder="请输入手机号" @confirm="formSubmit">
					</div>
					<div class="getcode has" @click="getCode" v-if="count == 0" >
						<p>
							获取验证码
						</p>
					</div>
					<div class="getcode" v-if="count !== 0" >
						<p>
							{{count}}秒后获取
						</p>
					</div>
				</div>
				<p class="errors" v-if="errors.mobile">{{errors.mobile}}</p>
			</div>
			<div class="form-li">
				<div class="item">
					<div class="item-left">
						验证码：
					</div>
					<div class="item-right">
						<input type="tel" name="code" v-model="code" placeholder="请输入验证码" >
					</div>
				</div>
				<p class="errors" v-if="errors.code">{{errors.code}}</p>
			</div>
			<div class="form-li">
				<div class="item">
					<div class="item-left">
						用户名：
					</div>
					<div class="item-right">
						<input type="text" name="username" v-model="fields.username" placeholder="请输入用户名" >
					</div>

				</div>
				<p class="errors" v-if="errors.username">{{errors.username}}</p>
			</div>
			<div class="form-li">
				<div class="item">
					<div class="item-left">
						密码：
					</div>
					<div class="item-right">
						<input type="password" name="password" v-model="fields.password" placeholder="请输入密码" >
					</div>
				</div>
				<p class="errors" v-if="errors.password">{{errors.password}}</p>
			</div>
			<button formType="submit" class="stm-main-button stm-mt10" style="margin-top:30px;">注册</button>
		</form>
		<stm-bind v-else></stm-bind>


		<button type="default" v-if="login" class="stm-mt10" @click="login = !login">绑定已有用户</button>
		<button type="default" class="stm-mt10" v-else @click="login = !login">注册新用戶</button>
	</div>
</template>

<script>
import Auth from '@/utils/Server/Auth';
import configs from '@/utils/server';
import Bind from '@/components/login/bind';
export default {
	name: 'cart-loged',
	data () {
		return {
			login:true,
			auth:Auth,
			code:'',
			count:0,
			timer: null,
			show:false,
			fields:{
				username:'',
				password:'',
				referrer: '',
			},
			sendcode:{
				mobile:'',
				title:configs.catShop.shopTitle,
			},
			errors:{},
		}
	},
	components:{
		'stm-bind':Bind
	},
	methods: {

		formSubmit(e) {
			wx.showLoading({title: '加载中'})
			if(this.sendcode.mobile === '' || this.code=== ''){
				wx.removeStorageSync('tokenPack')
			}
			var tokenPack = wx.getStorageSync('tokenPack');
			console.log(tokenPack)
			if(tokenPack && new Date(tokenPack.expired_at) > new Date()){
				wx.pro.request({
					url:  `${configs.catShop.apiBaseUrl}user` ,
					method: 'POST',
					header:{
						token:tokenPack.token
					},
					data:this.fields
				})
				.then(t => {
					if(t.statusCode == 200){
						wx.hideLoading()
						Auth.bindUser(this.auth.token,this.fields.username,this.fields.password)
					}
					// 2XX, 3XX
				})
				.catch(err => {
					// 网络错误、或服务器返回 4XX、5XX
					if(err.statusCode == 422){
						wx.hideLoading()
						this.errors= err.data.errors
					}else if(err.statusCode == 409){
						wx.hideLoading()
						wx.showToast({
							title: '您已注册',
							icon: 'none',
							duration: 2000
						})
					}
				})
			}else{
				wx.pro.request({
					url:  `${configs.MobileEnd.apiBaseUrl}a-${configs.MobileEnd.app}/login` ,
					method: 'POST',
					data:{
						mobile:this.sendcode.mobile,
						code:this.code
					}
				})
				.then(d => {
					if(d.statusCode == 200){
						wx.hideLoading()
						wx.setStorageSync('tokenPack',d.data)
						wx.pro.request({
							url:  `${configs.catShop.apiBaseUrl}user` ,
							method: 'POST',
							header:{
								token:d.data.token
							},
							data:this.fields
						})
						.then(t => {
							wx.hideLoading()
							if(t.statusCode == 200){
								wx.removeStorageSync('tokenPack')
								Auth.bindUser(this.auth.token,this.fields.username,this.fields.password)
							}
							// 2XX, 3XX
						})
						.catch(err => {
							// 网络错误、或服务器返回 4XX、5XX
							wx.hideLoading()
							if(err.statusCode == 422){
								this.errors= err.data.errors
							}else if(err.statusCode == 409){
								wx.removeStorageSync('tokenPack')
								wx.showToast({
									title: '您已注册',
									icon: 'none',
									duration: 2000
								})
							}
						})
					}
					// 2XX, 3XX
				})
				.catch(err => {
					wx.hideLoading()
					// 网络错误、或服务器返回 4XX、5XX
					if(err.statusCode == 422){
						this.errors= err.data.errors
					}
				})
			}
			// wx.pro.request({
			// 	url:  `${configs.catShop.apiBaseUrl}user` ,
			// 	method: 'POST',
			// 	header:{
			// 		token:this.auth.token
			// 	},
			// 	data:e.target.value
			// })
			// .then(d => {
			// 	if(d.statusCode == 200){
			// 		Auth.loaded =true
			// 		Auth.logined =true
			// 		Auth.user = d.data
			// 	}
			// 	// 2XX, 3XX
			// })
			// .catch(err => {
			// 	// 网络错误、或服务器返回 4XX、5XX
			// })
		},
		getCode() {
			wx.pro.request({
				url:  `${configs.MobileEnd.apiBaseUrl}send-code` ,
				method: 'POST',
				data:this.sendcode
			})
			.then(d => {
				if(d.statusCode == 200){
					const TIME_COUNT = 60;
					if (!this.timer) {
						this.count = TIME_COUNT;
						this.show = false;
						this.timer = setInterval(() => {
						if (this.count > 0 && this.count <= TIME_COUNT) {
							 this.count--;
						} else {
							this.show = true;
							clearInterval(this.timer);
							this.timer = null;
							}
						}, 1000)
					}
				}
				// 2XX, 3XX
			})
			.catch(err => {
				if(err.statusCode == 422){
					this.errors= err.data.errors
				}
				// 网络错误、或服务器返回 4XX、5XX
			})
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../global/button.less';
@import '../../global/formLi.less';
.login-form{
	min-height:100vh;
	background:#fff;
	padding:0 20px 0 20px;
}
</style>

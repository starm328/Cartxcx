<template>
	<div class="login-bind">
		<form @submit="formSubmit">
			<div class="form-li">
				<div class="item">
					<div class="item-left">
						用户名：
					</div>
					<div class="item-right">
						<input type="text" name="username" v-model="username" placeholder="请输入用户名" class="text-right">
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
						<input type="password" name="password" v-model="password" placeholder="请输入密码" class="text-right">
					</div>
				</div>
				<p  class="errors" v-if="errors.password">{{errors.password}}</p>
			</div>
			<button formType="submit"  class="stm-main-button stm-mt10" style="margin-top:30px;" :disabled="disabled">绑定用户</button>
		</form>
	</div>
</template>

<script>
import Auth from '@/utils/Server/Auth';
import configs from '@/utils/server';
export default {
	name: 'login-bind',
	data () {
		return {
			auth:Auth,
			username:'',
			password:'',
			errors: {},
		}
	},
	computed: {
		disabled() {
			if(!this.username == '' && !this.password == '') {
				return false
			}else{
				return true
			}
		}
	},
	methods: {
		formSubmit(e) {
			wx.showLoading({title: '加载中'})
			wx.pro.request({
				url: configs.catShop.apiBaseUrl+'user/bind',
				method: 'POST',
				header:{
					token:this.auth.proxy.token.token,
					'X-Http-Method-Override': 'PATCH',
				},
				data:{
					username:e.target.value.username,
					password:e.target.value.password
				}
			})
			.then(d => {
				if(d.statusCode == 204){
					wx.hideLoading()
					this.loaded =true
					this.logined =true
				}else if(d.statusCode == 200){
					wx.hideLoading()
					Auth.getUser(this.auth.proxy.token.token)
				}
				// 2XX, 3XX
			})
			.catch(err => {
				if(err.statusCode == 401){
					wx.hideLoading()
					wx.removeStorageSync('token')
					Auth.login()
				}else if(err.statusCode == 422){
					wx.hideLoading()
					console.log(err.data)
					this.errors= err.data.errors
				}else if(err.statusCode == 403){
					wx.hideLoading()
					wx.showToast({
						title: '用户名或密码错误',
						icon: 'none',
						duration: 2000
					})
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
.login-bind{
}
</style>

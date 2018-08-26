<template>
	<div class="store-top-warp" v-if="assistants">
		<div class="store-top-bg"></div>
		<div class="store-welcome">{{lange.store}}编号：{{assistants.store.name}}</div>
		<div class="store-top">
			<dl>
				<dt>
					<img :src="assistants.store.logo">
				</dt>
				<dd>
					<p>{{lange.store}}名：{{assistants.store.label}}</p>
					<p>{{lange.store_master}}ID：{{assistants.store.id}}</p>
					<p>{{lange.store_master}}手机：{{assistants.store.mobile}}</p>

				</dd>
			</dl>
			<div class="other">
				<p>
					<span>{{lange.store}}名：{{assistants.label}}</span>
				</p>
				<p>
					<span>{{lange.store}}手机：{{assistants.mobile}}</span>
				</p>
			</div>
			<div class=""></div>
		</div>
		<div class="nav">
			<ul>
				<li @click="scanQRCode">
					<i class="store store-saoyisao"></i>
					<p>扫一扫</p>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
import configs from '@/utils/server';
import Auth from '@/utils/Server/Auth';

export default {
	name: 'assistants-index',
	data () {
		return {
			assistants:'',
			lange:''
		}
	},
	props: {
		lange:Object
	},
	onLoad () {
		var _this = this;
		wx.pro.request({
			url: `${configs.catShop.apiBaseUrl}exa-${configs.Store.ExtensionApp}/proxy?url=` + encodeURIComponent(configs.Store.url + 'assistant'),
			method: 'GET',
			header: {
				token:Auth.proxy.token.token
			}
		})
		.then(d => {
			if(d.statusCode == 200){
				_this.assistants =  d.data
			}
			// 2XX, 3XX
		})
		.catch(err => {
			if(err.statusCode == 401){
				Auth.refresh();
			}
			// 网络错误、或服务器返回 4XX、5XX
		})



	},
	methods: {
		scanQRCode() {
			wx.scanCode({
				success: (res) => {
					var URLSearchParams = require('url-search-params');
					var data = res.result;
					var split = data.split('?');
					var params = new URLSearchParams(split[1]);
					if(params.get('type') === 'for-stores'){
						wx.pro.request({
							url: `${configs.catShop.apiBaseUrl}exa-${configs.Store.ExtensionApp}/proxy?url=${encodeURIComponent(configs.Store.url+'assistant/check-ticket')}`,
							method: 'POST',
							data: {
								user_id:Auth.proxy.user.id,
								ticket_code:params.get('ticket_code'),
								auth_code:params.get('authcode'),
							},
							header: {
								token:Auth.proxy.token.token
							}
						})
						.then(d => {
							if(d.statusCode == 200){
								wx.showToast({
								  title: '使用成功',
								  icon: 'success',
								  duration: 2000
								})
							}
							// 2XX, 3XX
						})
						.catch(err => {
							console.log(err)
							if(err.statusCode == 500){
								wx.showToast({
									title: '系统错误',
									icon: 'none',
									duration: 2000
								})
							}
							// 网络错误、或服务器返回 4XX、5XX
						})
					}
				}
			})
		}
	}
}
</script>

<style lang="less" scoped>
.store-top-warp{
	.store-welcome{
		position:absolute;
		top:0;
		width:100%;
		max-width:375px;
		text-align:center;
		line-height:40px;
		color:rgba(255,255,255,0.5)
	}
	overflow:hidden;
	position: relative;
	.nav{
		background:#fff;
		padding-top:310px;
		padding-bottom:10px;
		ul{
			display:flex;
			li{
				flex:1;
				text-align:center;
				color:#bbb;
				line-height: 40px;
				i{
					font-size:121px;
				}
				a{
					color:#888
				}
			}
		}
	}
	.store-top-bg{
		padding:20px;
		background:linear-gradient(#d95940, #bc8d45);
		clip-path:ellipse(95% 100% at 50% 0%);
		position:absolute;
		top:0;
		left:50%;
		width:100%;
		padding-bottom:150px;
		background:linear-gradient(#d95940, #bc8d45);
		max-width:375px;
		margin-left:-187.5px;
	}
	.store-top{
		background:-webkit-linear-gradient(left, #d95940, #d98a40);
		color:#888;
		position:absolute;
		background:#fff;
		width:90%;
		left:50%;
		top:40px;
		border-radius:5px;
		box-shadow:0 2px 10px 0 rgba(0, 0, 0, 0.1);
		margin-left:-45%;
		dl{
			dt{
				width:70px;
				height:70px;
				border-radius:5px;
				overflow:hidden;
				margin-right:10px;
				img{
					width:100%;
				}
			}
			padding:20px;
			font-size:15px;
			display:flex;
			display:-webkit-flex;
			dd{
				line-height: 25px;
				flex:1;
				-webkit-flex:1;
				position:relative;
				i{
					position:absolute;
					top:50%;
					margin-top:-15px;
					right:10px;
					font-size:25px;

				}
				p{
					word-wrap: break-word;
					word-break: break-all;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					/* autoprefixer: off */
					-webkit-box-orient: vertical;
					/* autoprefixer: on */
					-webkit-line-clamp: 1;
				}
			}
		}
		.other{
			padding:0 20px 20px 20px;
			line-height:30px;
			p{
				display: flex;
				strong{
					flex:0 70px;
				}
				i{
					display:inline-block;
					margin-right:10px
				}
				span{
				   word-wrap: break-word;
				   word-break: break-all;
				   overflow: hidden;
				   text-overflow: ellipsis;
				   display: -webkit-box;
				   /* autoprefixer: off */
					-webkit-box-orient: vertical;
					/* autoprefixer: on */
				   -webkit-line-clamp: 1;
				}
				em{
				  text-align: right;
				  flex:1;
				  a{
					color: #888
				  }
				}
			}

		}
	}
}
</style>

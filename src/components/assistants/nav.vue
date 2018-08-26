<template>
	<div class="assistants-nav">
		<ul>
			<li :class="[active == 1?'active':'']" @click="nav('home')">
				<img src="http://picture.mallkd.com/2194ff5f5de104f96490b4d33f5b8bd8?x-oss-process=image/resize,m_fill,limit_0,w_200,h_200"v-if="active == 1">
				<img src="http://picture.mallkd.com/95e8048c485524259b669e347e0a944e?x-oss-process=image/resize,m_fill,limit_0,w_200,h_200" v-else>
				<p>首页</p>
			</li>
			<li :class="[active == 2?'active':'']" @click="nav('accepting')" v-if="show">
				<img src="http://picture.mallkd.com/2194ff5f5de104f96490b4d33f5b8bd8?x-oss-process=image/resize,m_fill,limit_0,w_200,h_200"v-if="active == 2">
				<img src="http://picture.mallkd.com/95e8048c485524259b669e347e0a944e?x-oss-process=image/resize,m_fill,limit_0,w_200,h_200" v-else>
				<p>我接的</p>
			</li>
			<li :class="[active == 2?'active':'']" @click="nav('list')" v-else>
				<img src="http://picture.mallkd.com/2194ff5f5de104f96490b4d33f5b8bd8?x-oss-process=image/resize,m_fill,limit_0,w_200,h_200"v-if="active == 2">
				<img src="http://picture.mallkd.com/95e8048c485524259b669e347e0a944e?x-oss-process=image/resize,m_fill,limit_0,w_200,h_200" v-else>
				<p>私人订单</p>
			</li>

			<li :class="[active == 3?'active':'']" @click="nav('receipt')">
				<img src="http://picture.mallkd.com/2194ff5f5de104f96490b4d33f5b8bd8?x-oss-process=image/resize,m_fill,limit_0,w_200,h_200"v-if="active == 3">
				<img src="http://picture.mallkd.com/95e8048c485524259b669e347e0a944e?x-oss-process=image/resize,m_fill,limit_0,w_200,h_200" v-else>
				<p>抢单</p>
			</li>
		</ul>
	</div>
</template>

<script>
import Auth from '@/utils/Server/Auth';
import configs from '@/utils/server';
export default {
	name: 'assistants-nav',
	props:{
		active:Number
	},
	data () {
		return {
			show:''
		}
	},
	onLoad () {
		wx.showLoading({
			mask: true,
			title: '加载中',
		})
		var _this = this;
		wx.pro.request({
			url: `${configs.catShop.apiBaseUrl}exa-${configs.Store.ExtensionApp}/proxy?url=` + encodeURIComponent(configs.Store.url + 'assistant/accepting-booking'),
			method: 'GET',
			header: {
				token:Auth.proxy.token.token
			}
		})
		.then(d => {
			if(d.statusCode == 200){
				wx.hideLoading();
				_this.show = d.data
			}else if(d.statusCode == 204){
				wx.hideLoading();
				_this.show = d.data
			}
			// 2XX, 3XX
		})
		.catch(err => {
			wx.hideLoading();
			if(err.statusCode == 401){
				Auth.refresh();
			}
			// 网络错误、或服务器返回 4XX、5XX
		})

	},
	methods: {
		nav(e){
			wx.navigateTo({
			  url: '/pages/store/assistants/'+e+'/main'
			})
		},
	}
}
</script>

<style lang="less" scoped>
@import '../../global/style.less';

.assistants-nav{
	position:fixed;
	bottom:0;
	width:100%;
	height:55px;
	background:#fff;
	border-top:1px solid #f1f1f1;
	ul{
		display:flex;
		li{
			flex:1;
			text-align:center;
			font-size:13px;
			img{
				width:30px;
				height:30px;
			}
			&.active{
				color:@maincolor;
			}
		}
	}
}
</style>

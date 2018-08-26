<template>
	<div class="user-compent">
		<div class="user-top">
			<h6>
				<open-data type="userAvatarUrl" class="img" mode="widthFix"></open-data>
			</h6>
			<div>
				<p>昵称：{{auth.proxy.user.username}}</p>
				<p>ID：{{auth.proxy.user.id}}</p>
				<p class="identity">我的身份：</p>
			</div>
		</div>
		<div class="user-main">
			<ul>
				<li>
					<i class="catxcx catxcx-daifukuan"><em>2</em></i>
					<em>待付款</em>
				</li>
				<li>
					<i class="catxcx catxcx-daishouhuo"></i>
					<em>待发货</em>
				</li>
				<li>
					<i class="catxcx catxcx-delivery"></i>
					<em>待收货</em>
				</li>
				<li>
					<i class="catxcx catxcx-yiwancheng"></i>
					<em>已完成</em>
				</li>
				<li>
					<i class="catxcx catxcx-yiwancheng"></i>
					<em>全部订单</em>
				</li>
			</ul>
			<div class="stm-pr10 stm-pb10 " v-if="store.label">
				<button type="default" class="stm-button stm-m10 stm-aux-button" @click="storeNav('store')">{{lange.store_master}}服务</button>
			</div>
			<div class="stm-pr10 stm-pb10 " v-if="assistants.label">
				<button type="default" class="stm-button stm-m10 stm-aux-button" @click="storeNav('assistants')">{{lange.assistant}}服务</button>
			</div>
			<stm-list-warp>
				<stm-list title="我的服务券" type="navigateTo" Licon="catxcx-kefu" url="/pages/ticket/list/main">
				</stm-list>
				<stm-list title="设置" type="navigateTo" Licon="catxcx-icon_set_up" >
				</stm-list>
				<stm-list title="关注公众号" type="navigateTo" Licon="catxcx-msnui-weixin" size="24">
				</stm-list>
				<stm-list title="在线客服" type="contact" Licon="catxcx-kefu" >
				</stm-list>
			</stm-list-warp>
		</div>
	</div>
</template>

<script>
import WarpList from '@/components/list/warp'
import List from '@/components/list/index'
import Auth from '@/utils/Server/Auth';
import CommissionRoles from '@/utils/Server/CommissionRoles';
import configs from '@/utils/server';
export default {

	name: 'user-compent',
	components: {
		'stm-list-warp': WarpList,
		'stm-list': List,
	},
	data () {
		return {
			auth:Auth,
			lange:'',
			assistants:'',
			store:''
		}
	},
	onLoad() {
		this.data()
	},
	onShow() {
		this.data()
	},
	methods: {
		data() {
			var _this = this;
			// 门店权限
			wx.pro.request({
				url: `${configs.catShop.apiBaseUrl}exa-${configs.Store.ExtensionApp}/proxy?url=` + encodeURIComponent(configs.Store.url + 'store'),
				method: 'GET',
				header: {
					token:Auth.proxy.token.token
				}
			})
			.then(d => {
				if(d.statusCode == 200){
					_this.store =  d.data
				}
				// 2XX, 3XX
			})
			.catch(err => {
				if(err.statusCode == 401){
					Auth.refresh();
				}
				// 网络错误、或服务器返回 4XX、5XX
			})
			// 店员权限
			wx.pro.request({
				url: `${configs.catShop.apiBaseUrl}exa-${configs.Store.ExtensionApp}/proxy?url=` + encodeURIComponent(configs.Store.url + 'assistant'),
				method: 'GET',
				header: {
					token:Auth.proxy.token.token
				}
			})
			.then(d => {
				if(d.statusCode == 200){
					console.log(d.data)
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

			wx.pro.request({
				url: `${configs.Store.url}lang-configs`,
				method: 'GET',
			})
			.then(d => {
				if(d.statusCode == 200){
					_this.lange = d.data;
				}
				// 2XX, 3XX
			})
			.catch(err => {
				// 网络错误、或服务器返回 4XX、5XX
			})
		},
		storeNav(e) {
			wx.navigateTo({
				url: '/pages/store/'+e+'/home/main'
			})
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../global/style.less';
@import '../../global/button.less';
.user-compent{
	.user-top{
		width:100%;
		height:80px;
		padding:10px 0;
		background:#9c3;
		display:flex;
		h6{
			width:60px;
			height:60px;
			border-radius:50%;
			border:3px solid #fff;
			margin:0 20px;
			display:block;
			overflow:hidden;
			img{width:100%;}
		}
		p{
			font-size:@fonttwo;
			color:#fff;
		}
		p.identity {
			border: 1px solid #fff;
			width: -webkit-fit-content;
			width: -moz-fit-content;
			width: fit-content;
			display: block;
			margin: 4px auto;
			border-radius: 10px;
			font-size: 12px;
			padding: 2px 10px;
		}

	}
	.user-main{
		ul{
			display:flex;
			padding:15px 0;
			border-top:1px solid #eee;
			background:#fff;
			margin-bottom:10px;
			li{
				flex:1;
				text-align:center;
				position:relative;
				i{
					font-size:20px;
					color:#757575;
					position:relative;
					em{
						font-style:normal;
						font-size:13px;
						position:absolute;
						top:0;
						right:20px;
						background:@auxiliary;
						color:#fff;
						border-radius: 30px;
						padding: 1.2px 6px;
					}
				}
				em{
					font-size:@fontone;
				}
				&:last-child:after{
					display:block;
					content:'';
					position:absolute;
					left:0;
					top:10px;
					width:1px;
					height:20px;
					background:#ccc;
				}
				&:last-child:before{
					display: block;
					content: "";
					position: absolute;
					left: 0;
					top: 15px;
					height: 100%;
					width: 10px;
					width: 0;
					height: 0;
					border-top: 5px solid transparent;
					border-bottom: 5px solid transparent;
					border-left: 5px solid #ccc;
				}
			}


		}
	}
}
</style>

<template>
	<div class="cart-member">
		<div class="banner">
				<img src="http://picture.mallkd.com/dfea4416667c212a34e166dbb31a2da2" style="width:100%; vertical-align: middle;" mode="widthFix">
			</div>
			<div class="li">
				<dl v-for="(item,key) in products" :key="key" @click="navigateTo(item.id)">
					<dt><i class="cowdadicon cowdadicon-3"></i></dt>
					<dd>
						<div>
							<p>{{item.title}}</p>
							<span>{{item.price}}</span>
						</div>
						<h6 >立即订购</h6>
					</dd>
				</dl>
			</div>
	</div>
</template>

<script>
import configs from '@/utils/server';
export default {
	name: 'cart-member',
	data () {
		return {
			products:''
		}
	},
	onLoad() {
		wx.setNavigationBarTitle({
			title:'会员充值'
		})
	},
	onShow() {
		wx.showLoading({
			title: '加载中',
		})
		wx.pro.request({
			url: `${configs.cowdad.apiBaseUrl}products/tagged?tag=87&take=5`,
			method: 'GET',
		})
		.then(d => {
			if(d.statusCode == 200){
				 wx.hideLoading()
				this.products = d.data
			}
			// 2XX, 3XX
		})
		.catch(err => {
			 wx.hideLoading()
			// 网络错误、或服务器返回 4XX、5XX
		})
	},
	methods: {
		navigateTo(i) {
			wx.navigateTo({
			  url: '/pages/product/page/main?id='+i
			})
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../global/style.less';

.cart-member{
	.li{
		background:#fff;
		dl{
			padding:10px 20px;
			margin:0 0 20px 0;
			display:flex;
			display:-webkit-flex;
			dt{
				margin-right:20px;
				margin-top:2px;
				i{
					font-size:20px;
				}
			}
			dd{
				display:flex;
				flex:1;
				-webkit-flex:1;
				display:-webkit-flex;
				>div{
					color:#999999;
					flex:1;
					-webkit-flex:1;
					p{
						margin-bottom:4px;
						font-size:@fontthree;
						color:#99cc33;
					}
					span{
						font-size:@fonttwo;
					}
				}
				h6{
					border-radius:5px;
					border:1px solid #cccccc;
					color:#99cc33;
					height:40px;
					line-height:40px;
					font-size:@fonttwo;
					text-align:center;
					padding:0 10px;
					font-weight:normal;
				}
			}

		}
		a{
			&:nth-child(1){
				dt{
					color:#cccc33;
				}
			}
			&:nth-child(2){
				dt{
					color:#ff9933;
				}
			}
			&:nth-child(3){
				dt{
					color:#ff9933;
				}
			}
			&:nth-child(4){
				dt{
					color:#ff6633;
				}
			}
			&:nth-child(5){
				dt{
					color:#ff3333;
				}
			}
		}
	}
}
</style>

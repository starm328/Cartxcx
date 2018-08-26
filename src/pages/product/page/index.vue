<template>
	<div class="product-page">
		<swiper v-if="product&&product.carousels&&product.carousels.length == 0">
			<block >
				<swiper-item>
					<image :src="product.main_picture['400x400']" class="slide-image" mode="widthFix"/>
				</swiper-item>
			</block>
		</swiper>

		<swiper v-else :indicator-dots="true" indicator-color="rgba(255,255,255,0.5)" indicator-active-color="#fff">
			<block v-for="(img,i) in product.carousels" :key="i">
				<swiper-item>
					<image :src="img['640x640']" class="slide-image" mode="widthFix"/>
				</swiper-item>
			</block>
		</swiper>
		<div class="pro-tit">
			<h5>{{product.title}}</h5>
			<p v-html='product.price'></p>
		</div>
		<div class="article">
			<div v-html="info"></div>
		</div>
		<div class="footer">
			<div class="warp">
				<div class="box">
					<ul>
						<li>
							<span>进店</span>
						</li>
						<li>
							<span>购物车</span>
						</li>
					</ul>
				</div>
				<div class="box">
					<p @click="buy('buy')">立即购买</p>
					<p @click="buy('cart')">加入购物车</p>
				</div>
			</div>
		</div>
		<div style="height:60px;"></div>
		<cart-property :productId='productId' :product="product" :action="action" v-if="action" @change="toggle" ></cart-property>
	</div>
</template>

<script>
import server from '@/utils/server'
import Property from '@/components/product/property'
export default {

	name: 'product-page',

	data () {
		return {
			product:'',
			productId:'',
			info:'',
			action:''
		}
	},
	components: {
		'cart-property': Property
	},
	onShareAppMessage: function (res) {
		if (res.from === 'button') {
			// 来自页面内转发按钮
			console.log(res.target)
		}
		return {
			title: this.product.title,
			path: '/pages/product/page/main?id='+ this.product.id,
			imageUrl: this.product.main_picture['400x400']
		}
	},
	onLoad(options){
		this.productId = options.id
		wx.showNavigationBarLoading()
		// 获取基础数据
		wx.pro.request({
			url:server.catShop.apiBaseUrl + 'products/' + options.id,
			method: 'GET',
		})
		.then(d => {
			if(d.statusCode == '200'){
				this.product = d.data
				wx.hideNavigationBarLoading()
				wx.setNavigationBarTitle({
				  title: d.data.title
				})
			}
			// 2XX, 3XX
		})
		.catch(err => {
			alert('服务错误')
			// 网络错误、或服务器返回 4XX、5XX
		})
		// 获取图文详情
		wx.pro.request({
			url:server.catShop.apiBaseUrl + 'products/' + options.id + '/info',
			method: 'GET',
		})
		.then(d => {
			if(d.statusCode == '200'){
				var data = d.data.article.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;vertical-align:top" ')
				this.info = data;
			}
			// 2XX, 3XX
		})
		.catch(err => {
			alert('服务错误')
			// 网络错误、或服务器返回 4XX、5XX
		})
	},
	created () {

	},
	methods: {
		buy(action){
			this.action = action;
		},
		toggle() {
			this.action =''
		}
	},
	onUnload () {
		this.action = '',
		this.info = ''
	}
}
</script>

<style lang="less" scoped>
@import '../../../global/style.less';
.product-page{
	swiper{
		height:370px;
	}
	.slide-image{
		width:100%;
	}
	.pro-tit{
		padding:5px 10px;
		background:#fff;
		margin-bottom:10px;
		h5{
			font-size:@fontthree;
		}
		p{
			color:@auxiliary;
			font-size:@fonttwo
		}
	}
	.article{
		background:#fff;
		image{
			display:block;
			vertical-align: top;
			vertical-align: text-top;
			vertical-align: bottom;
			vertical-align: text-bottom;
		}
	}
	.footer{
		width:100%;
		position:fixed;
		bottom:0;
		background:#fff;
		    border-top: 1px solid #f1f1f1;
		.warp{
			display:flex;
			flex:1;
			.box{
				display:flex;
				flex:1;
				p{
					flex:1;
					text-align:center;
					padding:0 3px;
					font-size: @fonttwo;
					line-height:50px;
					height:50px;
					color:#fff;
					&:nth-child(1){
						background:@buycolor;
					}
					&:nth-child(2){
						background:@auxiliary;
					}
				}
				ul{
					flex:1;
					display:flex;
					li{
						flex:1;
						text-align:center;
						font-size: @fonttwo;
					}
				}
			}
		}
	}
}
</style>

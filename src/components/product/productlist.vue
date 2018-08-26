<template>
	<div class="cart-product-list">
		<div class="title">
			<p>{{tag.name}}</p>
			<span>更多></span>
		</div>
		<cart-productitem  v-for="item in products" :key="item.id" :product="item"></cart-productitem>
	</div>
</template>

<script>
import server from '@/utils/server'
import ProductItem from '@/components/product/productitem'
export default {
	name: 'cart-product-list',
	props:{
		tag:{},
		number: {
			type:Number,
			default: 4,
		}
	},
	components: {
		'cart-productitem': ProductItem
	},
	data () {
		return {
			products:[]
		}
	},
	created () {
		wx.pro.request({
			url:server.catShop.apiBaseUrl + 'products/tagged?tag=' + this.tag.id + '&take=' + this.number,
			method: 'GET',
		})
		.then(d => {
			if(d.statusCode == '200'){
				this.products = d.data

			}
			// 2XX, 3XX
		})
		.catch(err => {
			alert('服务错误')
			// 网络错误、或服务器返回 4XX、5XX
		})
	}
}
</script>

<style lang="less" scoped>
@import '../../global/style.less';
.cart-product-list{
	.title{
		padding:0 10px;
		height:45px;
		line-height:45px;
		background:#fff;
		margin-bottom:10px;
		p{
			float:left;
			font-size:@fontthree
		}
		span{
			float:right;
			font-size:@fontone;
			color:@fontcolor;
		}
	}
	&:after{
		clear:both;
		display:block;
		content:'';
	}
}
</style>

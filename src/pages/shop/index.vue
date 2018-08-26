<template>
	<div class="cart-shop-index">
		<cart-productlist v-for="(item,index) in tags" :key="inxex" :tag="item"></cart-productlist>
	</div>
</template>

<script>
import configs from '@/utils/server';
import ProductList from '@/components/product/productlist'
export default {
	name: 'cart-shop-index',
	components: {
		'cart-productlist': ProductList,
	},
	data () {
		return {
			tags: []
		}
	},
	onShow () {
		wx.pro.request({
			url:configs.catShop.apiBaseUrl + 'products/set-index/tags',
			method: 'GET',
		})
		.then(d => {
			if(d.statusCode == '200'){
				this.tags =  d.data
				console.log(d)
			}
			// 2XX, 3XX
		})
		.catch(err => {

			// 网络错误、或服务器返回 4XX、5XX
		})
	}
}
</script>

<style lang="less" scoped>
</style>

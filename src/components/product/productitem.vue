<template>
	<div class="cart-product-item" @click="navigateTo(product.id)">
				<img :src="product.main_picture['400x400']" mode="widthFix">
				<div class="detail">
						<h6>
							{{product.title}}
						</h6>
						<p v-html="product.price"></p>
				</div>
	</div>
</template>

<script>
export default {
	name: 'cart-product-item',
	props:{
		product:{}
	},
	data () {
		return {

		}
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
	.cart-product-item{
		width:calc(50% - 7px);
		margin:0 0 5px 5px;
		float: left;
		background:#fff;
		border-radius:5px;
		img{
			width:100%;
		}
		.detail{
			padding:10px;
			h6{
				font-size: @fonttwo;
				color: #666;
				display: block;
				word-wrap: break-word;
				word-break: break-all;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 1;
				height: 30px;
				line-height: 30px;
				position: relative;
				padding-right: 15px;
			}
			p{
				color:@auxiliary;
				font-size:@fonttwo;
			}
		}

	}
</style>

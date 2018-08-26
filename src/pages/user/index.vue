<template>
	<div class="cart-user">
		<cart-loged  :needUser="true" >
			<stm-user></stm-user>
		</cart-loged>
	</div>
</template>

<script>

import Loged from '@/components/loged'
import User from '@/components/user/index'
import Auth from '@/utils/Server/Auth';

export default {

	name: 'cart-user',
	components: {
		'cart-loged': Loged,
		'stm-user':User
	},
	data () {
		return {
		}
	},
	onShow() {
	},
	onLoad() {
		wx.setNavigationBarTitle({
			title:'个人中心'
		})
		wx.setNavigationBarColor({
			frontColor:'#ffffff',
			backgroundColor:'#9c3',
			animation: {
				duration: 400,
				timingFunc: 'easeIn'
			}
		})


	},
}
</script>

<style lang="less" scoped>

</style>

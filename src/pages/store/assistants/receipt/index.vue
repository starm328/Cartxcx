<template>
	<div class="store-assistants-receipt">
		<cart-loged  :needUser="true" >
			<stm-assistants-receipt></stm-assistants-receipt>
			<stm-store-nav :active='3'></stm-store-nav>
		</cart-loged>
	</div>
</template>

<script>
import Loged from '@/components/loged';
import AssistantsReceipt from '@/components/assistants/receipt'
import StoreNav from '@/components/assistants/nav';
export default {
	name: 'store-assistants-receipt',
	components: {
		'cart-loged': Loged,
		'stm-assistants-receipt': AssistantsReceipt,
		'stm-store-nav': StoreNav,
	},
	data () {
		return {

		}
	},
	onLoad() {
		wx.setNavigationBarTitle({
			title: '抢单'
		})
	}
}
</script>

<style lang="less" scoped>
</style>

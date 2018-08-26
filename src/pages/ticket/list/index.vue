<template>
	<div class="cart-ticket-list">
		<cart-loged  :needUser="true" >
			<stm-ticket-list></stm-ticket-list>
		</cart-loged>
	</div>
</template>

<script>
import Loged from '@/components/loged';
import TicketList from '@/components/ticket/list'
export default {
	name: 'cart-ticket-list',
	components: {
		'cart-loged': Loged,
		'stm-ticket-list': TicketList,
	},
	data () {
		return {

		}
	},

	onLoad() {
		wx.setNavigationBarTitle({
			title:'券列表'
		})
	}
}
</script>

<style lang="less" scoped>
</style>

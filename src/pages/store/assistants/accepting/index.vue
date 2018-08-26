<template>
	<div class="store-assistants-show">
		<cart-loged  :needUser="true" >
			<stm-assistants-accepting></stm-assistants-accepting>
		</cart-loged>
	</div>
</template>

<script>
import Loged from '@/components/loged';
import AssistantsAccepting from '@/components/assistants/accepting'
export default {
	name: 'store-assistants-show',
	components: {
		'cart-loged': Loged,
		'stm-assistants-accepting': AssistantsAccepting,
	},
	data () {
		return {

		}
	},
	onLoad() {
		wx.setNavigationBarTitle({
			title: '我接的'
		})
	}
}
</script>

<style lang="less" scoped>
</style>

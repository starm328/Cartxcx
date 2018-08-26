<template>
	<div class="store-assistants-show">
		<cart-loged  :needUser="true" >
			<stm-assistants-show></stm-assistants-show>
		</cart-loged>
	</div>
</template>

<script>
import Loged from '@/components/loged';
import AssistantsShow from '@/components/assistants/show'
export default {
	name: 'store-assistants-show',
	components: {
		'cart-loged': Loged,
		'stm-assistants-show': AssistantsShow,
	},
	data () {
		return {

		}
	},
	onLoad() {
		wx.setNavigationBarTitle({
			title: '详情'
		})
	}
}
</script>

<style lang="less" scoped>
</style>

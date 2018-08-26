<template>
	<div class="store-assistants-list">
		<cart-loged  :needUser="true" >
			<stm-assistants-list></stm-assistants-list>
			<stm-store-nav :active='2'></stm-store-nav>
		</cart-loged>
	</div>
</template>

<script>
import Loged from '@/components/loged';
import AssistantsList from '@/components/assistants/list'
import StoreNav from '@/components/assistants/nav';
export default {
	name: 'store-assistants-list',
	components: {
		'cart-loged': Loged,
		'stm-assistants-list': AssistantsList,
		'stm-store-nav': StoreNav,
	},
	data () {
		return {

		}
	},
	onLoad() {
		wx.setNavigationBarTitle({
			title: '私人接单'
		})
	}
}
</script>

<style lang="less" scoped>
</style>

<template>
	<div class="store-assistants-home">
		<cart-loged  :needUser="true" >
			<stm-assistants :lange="lange"></stm-assistants>
			<stm-store-nav :active='1'></stm-store-nav>
		</cart-loged>
	</div>
</template>

<script>
import Loged from '@/components/loged'
import Assistants from '@/components/assistants/index'
import StoreNav from '@/components/assistants/nav'
import configs from '@/utils/server';

export default {
	name: 'store-assistants-home',
	components: {
		'cart-loged': Loged,
		'stm-assistants': Assistants,
		'stm-store-nav': StoreNav,
	},
	data () {
		return {
			assistants:'',
			lange:''
		}
	},
	onShow() {

		wx.pro.request({
			url: `${configs.Store.url}lang-configs`,
			method: 'GET',
		})
		.then(d => {
			if(d.statusCode == 200){
				this.lange = d.data;
				wx.setNavigationBarTitle({
					title: d.data.assistant+'管理'
				})
			}
			// 2XX, 3XX
		})
		.catch(err => {
			// 网络错误、或服务器返回 4XX、5XX
		})
	},

}
</script>

<style lang="less" scoped>

</style>

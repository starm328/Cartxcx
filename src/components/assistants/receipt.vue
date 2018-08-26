<template>
	<div class="assistants-list">
		<div class="list" v-if="records && records.length > 0">
			<dl  v-for="(item, i) in records" :key="i">
				<dd>
					<p>预约用户：{{item.user.username}}(id:{{item.user.user_id}})</p>
					<p>服务：{{item.service_summary}}</p>
					<p>日期：{{item.date}}</p>
					<p>时间：{{item.time_range}}</p>
				</dd>
				<dt>
					<p @click="receipt(item.id)">抢单</p>
				</dt>
			</dl>
		</div>
		<div v-else-if="records&&records.length === 0">
			<st-nodata content="暂无预定">
			</st-nodata>
		</div>
	</div>
</template>

<script>
import configs from '@/utils/server';
import Auth from '@/utils/Server/Auth';
import Nodata from '@/components/nodata'

export default {
	name: 'assistants-list',
	components: {
		'st-nodata': Nodata,
	},
	data () {
		return {
			records:[],
			pageSize:15,
			page:15,
		}
	},
	onLoad () {
		this.getdata()
	},
	onPullDownRefresh() {
		this.getdata()
	},
	onReachBottom() {
		var _this = this
		wx.showLoading({
			title: '玩命加载中',
		})
		wx.pro.request({
			url: `${configs.catShop.apiBaseUrl}exa-${configs.Store.ExtensionApp}/proxy?url=` + encodeURIComponent(configs.Store.url + 'assistant/sv-'+configs.Store.Service+'/bookings/of-store?take='+_this.pageSize+'&skip='+_this.page),
			method: 'GET',
			header: {
				token:Auth.proxy.token.token
			}
		})
		.then(d => {
			if(d.statusCode == 200){
				wx.showLoading();
				const _list = d.data;
				_this.records = [..._this.records,..._list];
				if(_list.length < _this.pageSize) {
					return
				}
				_this.page = _this.page + 15
				// _this.records = d.data
			}
			// 2XX, 3XX
		})
		.catch(err => {
			wx.showLoading();
			if(err.statusCode == 401){
				Auth.refresh();
			}
			// 网络错误、或服务器返回 4XX、5XX
		})

	},
	methods: {
		receipt(i) {
			wx.navigateTo({
			  url: '/pages/store/assistants/show/main?id='+i
			})
		},
		getdata() {
			wx.showLoading({
				mask: true,
				title: '加载中',
			})
			var _this = this;
			wx.pro.request({
				url: `${configs.catShop.apiBaseUrl}exa-${configs.Store.ExtensionApp}/proxy?url=` + encodeURIComponent(configs.Store.url + 'assistant/sv-'+configs.Store.Service+'/bookings/of-store?take=15'),
				method: 'GET',
				header: {
					token:Auth.proxy.token.token
				}
			})
			.then(d => {
				if(d.statusCode == 200){
					wx.hideLoading();
					_this.records = d.data
				}
				// 2XX, 3XX
			})
			.catch(err => {
				wx.hideLoading();
				// 网络错误、或服务器返回 4XX、5XX
			})
		}
	}
}
</script>

<style lang="less" scoped>
@import '../../global/style.less';
.assistants-list{
	.list{
		dl{
			background:#fff;
			padding:10px;
			display:flex;
			dd{
				flex:1;
				color:@fontcolor;
				font-size:@fonttwo;
			}
			dt{
				display:-webkit-box;
				-webkit-box-align:center;
				p{
					font-size:@fonttwo;
					color: #fff;
					padding: 0 10px;
					height: 80px;
					line-height:80px;
					border-radius: 5px;
					background: @maincolor;
				}
			}
		}
	}
}
</style>

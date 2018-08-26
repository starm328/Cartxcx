<template>
	<div class="ticket-list-component">
		<div  v-for="(item,i) in titcket" :key="i">
			<!-- 失效或则已使用过的 -->
			<div class="stm-titcket-item" v-if="item && item.type && itemDate[i] < newDate && item.expired_at !== null || item.status_id == 'used' " :class="[itemDate[i] > newDate || item.expired_at !== null || item.status_id == 'used'?  'stm-titcket-item--disabled' : '' ]">
					<div class="stm-titcket-item__head">
						<div class="stm-titcket-item__lines"></div>
						<div class="stm-titcket-item__gradient">
							<h2>{{item.type.label}}</h2>
							<p v-if="itemDate[i] < newDate && item.expired_at !== null"><span>失效</span></p>
							<p v-else-if="item.status_id == 'new'">未使用</p>
							<p v-else-if="item.status_id == 'not_active'">未激活</p>
							<p v-else-if="item.status_id == 'used'">已使用</p>
							<p v-else-if="item.status_id == 'binded'">绑定用户</p>
						</div>
					</div>
					<div class="stm-titcket-item__body">
						<h2 v-if="item.expired_at == null">长期有效</h2><h2 v-else><Sttime  :time="item.expired_at"/></h2>	<span>{{item.label}}</span>
					</div>
			</div>

			<div class="stm-titcket-item" v-else-if="item.status_id == 'not_active'" :class="[item.status_id == 'not_active'?  'stm-titcket-item--active' : '' ]">
					<div class="stm-titcket-item__head">
						<div class="stm-titcket-item__lines"></div>
						<div class="stm-titcket-item__gradient">
							<h2>{{item.type.label}}</h2>
							<p v-if="itemDate[i] < newDate && item.expired_at !== null"><span>失效</span></p>
							<p v-else-if="item.status_id == 'new'">未使用</p>
							<p v-else-if="item.status_id == 'not_active'">未激活</p>
							<p v-else-if="item.status_id == 'used'">已使用</p>
							<p v-else-if="item.status_id == 'binded'">绑定用户</p>
						</div>
					</div>
					<div class="stm-titcket-item__body">
						<h2 v-if="item.expired_at == null">长期有效</h2><h2 v-else><Sttime  :time="item.expired_at"/></h2>	<span>{{item.label}}</span>
					</div>
			</div>

			<div class="stm-titcket-item" v-else :class="[itemDate[i] < newDate && item.expired_at !== null? 'stm-titcket-item--disabled' : '' || item.status_id == 'used']">
					<div class="stm-titcket-item__head">
						<div class="stm-titcket-item__lines"></div>
						<div class="stm-titcket-item__gradient">
							<h2>{{item.type.label}}</h2>
							<p v-if="itemDate[i] < newDate && item.expired_at !== null"><span>失效</span></p>
							<p v-else-if="item.status_id == 'new'">未使用</p>
							<p v-else-if="item.status_id == 'not_active'">未激活</p>
							<p v-else-if="item.status_id == 'used'">已使用</p>
							<p v-else-if="item.status_id == 'binded'">绑定用户</p>
						</div>
					</div>

					<div class="stm-titcket-item__body">
						<h2 v-if="item.expired_at == null">长期有效</h2><h2 v-else><Sttime  :time="item.expired_at"/></h2>	<span>{{item.label}}</span>
					</div>
			</div>
		</div>
		<div class="datano" v-if="!onReachBottom">没有更多数据了</div>
		<div class="screen" @click="screen">
			<i class="catxcx catxcx-icon_set_up"></i>
		</div>
	</div>
</template>

<script>
import configs from '@/utils/server';
import Auth from '@/utils/Server/Auth';
import Nodata from '@/components/nodata';
import Sttime from '@/components/time';

export default {
	name: 'ticket-list-component',
	components: {
		'st-nodata': Nodata,
		Sttime,

	},
	data () {
		return {
			titcket:[],
			itemDate:[],
			pageSize:15,
			page:15,
			onReachBottom:true,
			statusId:[]
		}
	},
	computed: {
		newDate() {
			return new Date().getTime()
		}
	},
	created () {
		this.getdata()
	},
	onShow () {
		this.getdata()
	},
	onPullDownRefresh() {
		this.getdata()
	},
	methods: {
		screen() {
			var _this = this;
			wx.showActionSheet({
				itemList: ['未使用', '已使用', '绑定的', '全部'],
				success: function(res) {
					if(res.tapIndex == 0){
						_this.statusId=['new']
						console.log(_this.statusId=['new'])
						_this.getdata()

					}else if(res.tapIndex == 1){
						this.statusId=['used']
						_this.getdata()

					}else if(res.tapIndex == 2){
						this.statusId=['binded']
						_this.getdata()

					}else{
						console.log('22')
						this.statusId=[]
						_this.getdata()

					}
				},
				fail: function(res) {
					console.log(res.errMsg)
				}
			})
		},
		getdata() {
			var _this = this;
			wx.showLoading({
				title: '玩命加载中',
			})
			wx.pro.request({
				url:`${configs.catShop.apiBaseUrl}exa-${configs.Titcket.ExtensionApp}/proxy?url=` + encodeURIComponent(configs.Titcket.url +'tickets/list/'+ (this.statusId.length == 0 ? '?' : '?statuses='+this.statusId.join('-') + '&') + 'take=15&skip=0')  ,
				method: 'GET',
				header: {
					token:Auth.proxy.token.token
				}
			})
			.then(d => {
				if(d.statusCode == 200){
					wx.hideLoading ();
					for(var i = 0 ; i < d.data.length ; i++){
						_this.titcket = d.data;
						_this.itemDate.push(new Date(d.data[i].expired_at).getTime())
					}
				}
				// 2XX, 3XX
			})
			.catch(err => {
				wx.hideLoading ();
				if(err.statusCode == 401){
					Auth.refresh();
				}
				// 网络错误、或服务器返回 4XX、5XX
			})
		}
	},
	onReachBottom() {
		var _this = this;
		if(_this.onReachBottom){
			wx.showLoading({
				title: '玩命加载中',
			})
			wx.pro.request({
				url:`${configs.catShop.apiBaseUrl}exa-${configs.Titcket.ExtensionApp}/proxy?url=` + encodeURIComponent(configs.Titcket.url +'tickets/list/'+ (this.statusId.length == 0 ? '?' : '?statuses='+this.statusId.join('-') + '&') + 'take='+_this.pageSize+'&skip='+_this.page)  ,
				method: 'GET',
				header: {
					token:Auth.proxy.token.token
				}
			})
			.then(d => {
				if(d.statusCode == 200){
					wx.hideLoading ();
					const _list = d.data;
					_this.titcket = [..._this.titcket,..._list];
					for(var i = 0 ; i < _list.length ; i++){
						_this.itemDate.push(new Date(d.data[i].expired_at).getTime())

					}
					if(_list.length < _this.pageSize) {
						this.onReachBottom =  false
						return
					}
					_this.page = _this.page + 15
					// _this.records = d.data
				}
				// 2XX, 3XX
			})
			.catch(err => {
				wx.hideLoading ();
				if(err.statusCode == 401){
					Auth.refresh();
				}
				// 网络错误、或服务器返回 4XX、5XX
			})
		}


	},
}
</script>

<style lang="less" scoped>
.ticket-list-component{
	padding-top:10px;
	.datano{
		width:100%;
		height:30px;
		line-height:30px;
		color:#999;
		font-size:13px;
		text-align:center;
	}
	.screen{
		width:50px;
		height:50px;
		background:#fff;
		border-radius:50%;
		position:fixed;
		bottom:20px;
		right:20px;
		text-align:center;
		line-height:50px;
		box-shadow:0px 0 5px 1px #d8d8d8;
		color:#999;
	}
	.stm-titcket-item {
		display: -webkit-box;
		display: -webkit-flex;
		display: flex;
		height: 100px;
		margin: 0 15px 10px;
		.stm-titcket-item__head {
				display: -webkit-box;
				display: -webkit-flex;
				display: flex;
				height: 100%;
				line-height: 1;
				min-width: 126px;
				.stm-titcket-item__lines {
						height: 100%;
						border-left:3px dashed #f75656;

				}
				.stm-titcket-item__gradient {
						-webkit-box-flex: 1;
						-webkit-flex: 1;
						flex: 1;
						color: #fff;
						display: -webkit-box;
						display: -webkit-flex;
						display: flex;
						text-align: center;
						-webkit-box-orient: vertical;
						-webkit-box-direction: normal;
						-webkit-flex-direction: column;
						flex-direction: column;
						-webkit-box-pack: center;
						-webkit-justify-content: center;
						justify-content: center;
						background-image: linear-gradient(45deg, #f23030, #ff8c8c);
						h2 {
								font-size:18px;
								font-weight: normal;
								margin: 0 0 10px;
								span {
										font-size: 16px;
								}
						}
						p {
								margin: 0;
								font-size: 14px;
								font-weight: 300;
								overflow: hidden;
								white-space: nowrap;
								text-overflow: ellipsis;
						}
				}
		}
		.stm-titcket-item__body {
				-webkit-box-flex: 1;
				-webkit-flex: 1;
				flex: 1;
				height: 100%;
				display: -webkit-box;
				display: -webkit-flex;
				display: flex;
				padding: 0 15px;
				overflow: hidden;
				position: relative;
				background-color: #fff;
				-webkit-box-orient: vertical;
				-webkit-box-direction: normal;
				-webkit-flex-direction: column;
				flex-direction: column;
				-webkit-box-pack: center;
				-webkit-justify-content: center;
				justify-content: center;
				border-radius: 0 4px 4px 0;
				p,h2,span{
					line-height: 1.4;
					overflow: hidden;
					white-space: nowrap;
					text-overflow: ellipsis;
					color: #999;
					font-size: 12px;
					margin: 5px 0 0;
				}
				h2{
					margin: 0;
					opacity: .8;
					font-size: 16px;
					font-weight: normal;
				}
		}
		&.stm-titcket-item--disabled .stm-titcket-item__gradient {
			background-image: linear-gradient(45deg, #a4a9b2, #b7bcc3);
		}
		&.stm-titcket-item--active .stm-titcket-item__gradient {
			background-image: linear-gradient(45deg, #a4a9b2, #b7bcc3);
		}
		&.stm-titcket-item--disabled .stm-titcket-item__lines {
			border-left:3px dashed #abb0b8;
		}
		&.stm-titcket-item--disabled .stm-titcket-item__gradient {
			background-image: linear-gradient(45deg, #a4a9b2, #b7bcc3);
		}


		&.stm-titcket-item--active .stm-titcket-item__gradient {
			background-image: linear-gradient(45deg, #8422f1, #c076ff)
		}
		&.stm-titcket-item--active .stm-titcket-item__gradient {
			background-image: linear-gradient(45deg, #8422f1, #c076ff);
		}
		&.stm-titcket-item--active .stm-titcket-item__lines {
			border-left:3px dashed #8422f1;
		}
		&.stm-titcket-item--active .stm-titcket-item__gradient {
			background-image: linear-gradient(45deg, #8422f1, #c076ff)
		}

	}
}
</style>

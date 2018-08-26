<template>
	<div class="assistants-show">
		<div class="record-show-main" v-if="show">
			<div class="ticket-show-content">
				<h5>已抢单</h5>
			</div>
			<div class="ticket-show-other" v-if="show.user">
				<div class="assistant">
					<p>{{show.user.username}}<em>预约客户</em></p>
				</div>
			</div>
			<div class="ticket-show-other" v-else>
				<p class="no-assistant" style="height:20px;">  </p>
			</div>
			<div class="ticket-show-content store-box" >
					<div class="cell" v-if="show.store">
						<!-- <img slot="icon" :src="show.store.logo"> -->
						<span>{{show.store.labal}}</span>
						<span></span>
					</div>
					<ul>
						<li>
							<p><em>预约服务</em>{{show.service_summary}}</p>
							<p v-if="show.service_data"><em>券编号：</em>{{show.service_data.ticket_code}}</p>
							<p><em>地址</em>{{show.address.area.long_label}}{{show.address.address}}</p>
							<p><em>预约时间</em><Sttime  :time="show.created_at"/></p>
						</li>

					</ul>
					<Map :address="show.address"></Map>
			</div>
			<div class="ticket-show-other store" v-if="show.address">
				<p @click="tel(show.address.phone)">联系客户</p>
			</div>

			<div class="ticket-show-other st-mt5 " v-if="show.time_range">
				<div class="other">
					<dl>
						<dt>上门时间</dt><dd>{{show.date}} {{show.time_range.label}}{{show.time_range.starts_at}}-{{show.time_range.ends_at}}</dd>
					</dl>
					<dl><dt>订单时间</dt><dd><Sttime  :time="show.created_at"/></dd></dl>
				</div>

			</div>
		</div>
	</div>
</template>

<script>
import configs from '@/utils/server';
import Auth from '@/utils/Server/Auth';
import Sttime from '@/components/time';
import Map from '@/components/assistants/map';

export default {
	name: 'assistants-show',
	data () {
		return {
			show:'',
			showId:''

		}
	},
	components: {
		Sttime,
		Map
	},
	onLoad(e) {
		console.log('1')
		wx.showLoading({
			mask: true,
			title: '加载中',
		})
		var _this = this;
		wx.pro.request({
			url: `${configs.catShop.apiBaseUrl}exa-${configs.Store.ExtensionApp}/proxy?url=` + encodeURIComponent(configs.Store.url + 'assistant/accepting-booking'),
			method: 'GET',
			header: {
				token:Auth.proxy.token.token
			}
		})
		.then(d => {
			if(d.statusCode == 200){
				wx.hideLoading();
				_this.show = d.data
			}
			// 2XX, 3XX
		})
		.catch(err => {
			wx.hideLoading();
			if(err.statusCode == 401){
				Auth.refresh();
			}
			// 网络错误、或服务器返回 4XX、5XX
		})
	},
	methods: {
		tel(num){
			wx.makePhoneCall({
				phoneNumber: num //仅为示例，并非真实的电话号码
			})
		},
	},
}
</script>

<style lang="less" scoped>
@import '../../global/store.less';
@import '../../global/style.less';

.assistants-show{
	padding-top:20px;
	.ticket-show-other{margin-bottom:10px;

		&.store{
			p{
				text-align:center;
				padding:10px 0;
				color:#484848;
				font-size:@fonttwo;
			}

		}
	}
	.ticket-show-content {
		h5{
			width:75px;
			height:75px;
			line-height:75px;
			background:#33cc33;
			font-size:18px;
			padding:0;
			margin:0 auto;
			border-radius:50%;
			color:#fff;
			position:relative;
			z-index:2;
			&:after{
				position:absolute;
				width:70px;
				height:70px;
				content:'';
				border:5px solid #e2f7e2;
				border-radius:50%;
				left:-1px;
				top:-1px;

			}
		}
		&.store-box{
			padding-top:0;
			.cell{
				display:flex;
				line-height:30px;
				font-size:@fonttwo;
				text-indent:10px;
			}
			ul{
				background:#f1f1f1;
				padding:0 12px;
				li{
					text-align:left;
					padding:10px 0;
					p{
						line-height:20px;
						text-align:right;
						font-size:@fonttwo;
						em{
							float:left;
							color:#999;
						}
						&:after{
							content:'';
							clear:both;
							display:block;
						}
					}

				}
			}
		}
	}
	.ticket-show-content,.ticket-show-other{width:95%;margin-left:auto;margin-right:auto}
	.ticket-show-other{text-align:left; text-indent:10px;
		.other{
			dl{
				width:100%;
				display:table;
				text-indent:0;
				font-size:@fonttwo;
				dt{
					display:table-cell;
					width:90px;
					text-indent:10px;

				}
				dd{
					width:calc(100% - 4px);
					text-align:left;
					color:#000;
				}
				&:after{
					clear:both;
					display:block;
					content:''
				}
			}
		}
		p{
			color:#000;

		}
		em{margin-right:10px;color:#999;}
		.no-assistant{
			text-align:center;
		}
		.assistant{
			padding:10px;
			p{float:left;
				display:flex;
				font-size:@fonttwo;
				em{
					background:#f23030;
					color:#fff;
					font-size:11px;
					border-top-left-radius:5px;
					border-bottom-right-radius:5px;
					margin-left:10px;
					padding:0 5px;
					text-indent:0;
				}
			}
			a{color:#000}
			i{float:right;margin-right:10px}
			&:after{
				content:'';
				clear:both;
				display:block;
			}
		}
	}

}
</style>

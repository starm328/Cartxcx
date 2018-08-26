<template>
	<div class="cart-index cart-warp">
		<div class="cart-main">
			<!-- <div v-for="item in regions" >
				<div v-html="item"></div>
			</div>
			<swiper >
				<block >
					<swiper-item>
						<div v-html="regions[0]"></div>
					</swiper-item>
				</block>
			</swiper> -->
			<div class="nav">
				<div class="title">家电清洗	</div>
				<ul>
					<li>
							<img src="http://picture.mallkd.com/a012d5978b1a2b75a7f1db2196bd5c5a">
							<p>清洗空调</p>
					</li>
					<li>
							<img src="http://picture.mallkd.com/ac9b8f6a86f291f26fe229552381ceb9">
							<p>清洗油烟机</p>
					</li>
					<li>
							<img src="http://picture.mallkd.com/29ff177a179da827631c51b02093b63f">
							<p>清洗冰箱</p>
					</li>
					<li>
							<img src="http://picture.mallkd.com/48ec16f4bb1464829c209d34196444dd">
							<p>清洗洗衣机</p>
					</li>
					<li>
							<img src="http://picture.mallkd.com/faa1eb376fc61f53392a07d32f0a7086">
							<p>清洗热水器</p>
					</li>
					<li>
							<img src="http://picture.mallkd.com/b6b0f4afe07e19e47fe03e1771bc92d6">
							<p>清洗灶台</p>
					</li>
					<li>
							<img src="http://picture.mallkd.com/97c0060205fc2dcd289495db59e613a3">
							<p>清洗微波炉</p>
					</li>
					<li>
							<img src="http://picture.mallkd.com/d3a264f17d316a30cbe51327c1ba8ff9">
							<p>清洗车空调</p>
					</li>
					<li>
							<img src="http://picture.mallkd.com/7a478487366c68926f73ba5212bdaa2b">
							<p>清洗电烤箱</p>
					</li>
					<li>
							<img src="http://picture.mallkd.com/52c80151f3ef604b91f053cac631302e">
							<p>清洗饮水机</p>
					</li>
					<li>
							<img src="http://picture.mallkd.com/35b0d48695ce9d90a49df73037062950">
							<p>清洗消毒柜</p>
					</li>
					<li>
							<img src="http://picture.mallkd.com/4d0425120db0575e80c1989c09454c81">
							<p>清洗自来水管</p>
					</li>
				</ul>
			</div>
		</div>
		<cart-copyright></cart-copyright>
	</div>
</template>

<script>
import configs from '@/utils/server';
import Copyright from '@/components/copyright';
export default {
	data () {
		return {
			regions:[]
		}
	},

	components: {
		'cart-copyright': Copyright
	},

	methods: {

	},
	onLoad() {
		wx.setNavigationBarTitle({
			title:'首页'
		});
		wx.setNavigationBarColor({
			frontColor:'#000000',
			backgroundColor:'#ffffff',
			animation: {
				duration: 400,
				timingFunc: 'easeIn'
			}
		})
	},
	onLoad () {
		wx.pro.request({
			url:`${configs.Advert.apiBaseUrl}a-${configs.Advert.app}/sp/global/Niuindex`,
			method: 'GET',
		})
		.then(d => {
			if(d.statusCode == '200'){
				// var data = d.data.content.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;vertical-align:top" ')
				this.regions =  d.data;
				for (var i =0; i<d.data.length;i++) {
					var data = d.data[i].content.replace(/\<img/gi, '<img style="max-width:100%;height:auto;display:block;vertical-align:top" ')
					this.regions.push(data)
				}

			}
			// 2XX, 3XX
		})
		.catch(err => {
			// 网络错误、或服务器返回 4XX、5XX
		})
	}
}
</script>

<style lang="less" scoped>
@import '../../global/style.less';
.cart-index{
	.nav{
		background:#fff;
		.title{
			border-bottom:1px solid #cccccc;
			line-height:40px;
			font-size:16px;
			text-indent:10px;
		}
		ul{
			padding-bottom:10px;
			&:after{
				clear:both;
				display:block;
				content:'';
			}
			li{
				img{
					width:60px;
					height:60px;
				}
				p{
					font-size:@fonttwo;
				}
				a{
					color:#000;
				}
				width:25%;
				text-align:center;
				float:left;
				padding-bottom:5px;
			}
		}

	}
}

</style>

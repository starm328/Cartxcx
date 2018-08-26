<template>
	<div v-if="!Auth.loaded">
		<div class="loding"><span>加载中</span></div>
	</div>
	<div v-else-if="Auth.logined">
		<div v-if="!needUser || Auth.user">
			<slot></slot>
		</div>
	</div>
	<div v-else-if="!Auth.token">
		<div class="getUserInfo">
			<p>
				<i class="catxcx catxcx-msnui-weixin"></i>
			</p>
			<button type="default" class="stm-mt10" open-type="getUserInfo" @getuserinfo="onGotUserInfo">微信授权</button>
		</div>

	</div>
	<div v-else>
		<stm-login></stm-login>
	</div>
</template>

<script>
import Auth from '@/utils/Server/Auth';
import Login from '@/components/login/login';
export default {
	name: 'cart-loged',
	data () {
		return {
			Auth: Auth.proxy,
		}
	},
	components:{
		'stm-login':Login,
	},
	props:{
		needUser:Boolean,
	},
	methods:{
		onGotUserInfo(e) {
			if(e.target.errMsg == 'getUserInfo:ok'){
				Auth.login(e.target)
			}else{
				// Auth.ullogin(e.target)
			}
		},
	}
}
</script>

<style lang="less" scoped>
@import '../../static/font/iconfont.css';
@import '../global/style.less';

.getUserInfo{padding-top: 40%;width: 100%;text-align: center;overflow: hidden;
	i{display: inline-block;font-size: 48px;width: 110px;height: 110px;line-height: 110px;background-color: #fff;border-radius: 100%;color: rgb(4,174,15);}
	button{
		margin:10px auto;
		padding:0;
		display:inline-block;
		border-radius:40px;
		background:@maincolor;
		color:#fff;
		font-size:@fontthree;
		padding:0 20px;

	}
}
.loding{
	position:fixed;
	width:100%;
	height:100%;
	text-align:center;
	span{
		display:block;
		width:90px;
		height:90px;
		border-radius:10px;
		background:rgba(000,000,000,0.5);
		color:#fff;
		text-align:center;
		margin:0 auto;
		line-height:90px;
		font-size:13px;
		margin-top:50%;

	}
}
</style>

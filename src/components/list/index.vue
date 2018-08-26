<template>
	<div class="stmui-list stml" v-if="url !== '' && type == 'navigateTo'" @click="navigateTo">
		<div class="l" v-if="Licon !== ''">
			<i class="catxcx" :style="'font-size:'+size+'px'" :class="[Licon]"></i>
		</div>
		<div class="c">
			<em>{{title}}</em>
		</div>
		<div class="r">
			<span>{{Other}}</span>
			<i class="catxcx" :style="'font-size:'+size+'px'" :class="[iconClass]"></i>
		</div>
	</div>
	<div class="stmui-list stml" v-else-if="url !== '' && type == 'switchTab'" @click="switchTab">
		<div class="l" v-if="Licon !== ''">
			<i class="catxcx" :style="'font-size:'+size+'px'" :class="[Licon]"></i>
		</div>
		<div class="c">
			<em>{{title}}</em>
		</div>
		<div class="r">
			<span>{{Other}}</span>
			<i class="catxcx" :style="'font-size:'+size+'px'" :class="[iconClass]"></i>
		</div>
	</div>

	<div class="stmui-list stml" v-else-if="type == 'contact'">
		<div class="l" v-if="Licon !== ''">
			<i class="catxcx" :style="'font-size:'+size+'px'" :class="[Licon]"></i>
		</div>
		<div class="c">
			<button open-type ="contact">{{title}}</button>
		</div>
		<div class="r">
			<span>{{Other}}</span>
			<i class="catxcx" :style="'font-size:'+size+'px'" :class="[iconClass]"></i>
		</div>
	</div>
	<div class="stmui-list stml" v-else>
		<div class="l" v-if="Licon !== ''">
			<i class="catxcx" :style="'font-size:'+size+'px'" :class="[Licon]"></i>
		</div>
		<div class="c">
			<em>{{title}}</em>
		</div>
		<div class="r">
			<span>{{Other}}</span>
			<i class="catxcx" :style="'font-size:'+size+'px'" :class="[iconClass]"></i>
		</div>
	</div>
</template>

<script>
export default {
	name: 'stmui-list',
	props: {
		// 列表坐标图标
		Licon:{
			type:String,
			default:''
		},
		// 列表标题
		title: {
			type:String,
			default:''
		},
		// 列表右边图标
		iconClass: {
			type:String,
			default:'catxcx-jiantou1'
		},
		// 列表跳转页面
		url: {
			type:String,
			default:''
		},
		// 左边其他文字
		Other: {
			type:String,
			default:''
		},
		type: {
			type:String,
			default:'navigateTo'
		},
		size: {
			type:Number,
			default:'22'
		}
	},
	data () {
		return {

		}
	},
	methods: {
		navigateTo() {
			wx.navigateTo({
			  url: this.url
			})
		},
		switchTab() {
			wx.switchTab({
			  url: this.url
			})
		}

	}
}
</script>

<style lang="less" scoped>
@import '../../global/stml.less';
@import '../../../static/font/iconfont.css';

</style>

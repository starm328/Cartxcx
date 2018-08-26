<!-- stui 时间组件 -->
<template>
	<span class="time" v-if="newdate">
		{{newdate}}
	</span>
</template>
<script>
export default {
	props: {
		time: {
			type:String,
			default:''
		}
	},
	computed:{
		newdate () {
			if(this.time){
				var date = new Date(this.time).getFullYear() +'年'+ (new Date(this.time).getMonth()+1 )+'月' + new Date(this.time).getDate() + ':'+ new Date(this.time).getHours() +':'+ new Date(this.time).getUTCMinutes() + ':' + new Date(this.time).getSeconds()
				return date
			}
		}
	}
}
</script>
<style lange="less">

</style>

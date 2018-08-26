<template>
	<map id="map" :longitude="address.longitude" :latitude="address.latitude" :markers="markers" scale="14" show-location style="width: 100%; height: 300px;" @markertap="marker"></map>
</template>

<script>
export default {
	name: 'assistants-map',
	props: {
		address:Object
	},
	data () {
		return {
			markers: [{
				iconPath: '../../../../static/images/home.png',
				id: 0,
				latitude: this.address.latitude,
				longitude: this.address.longitude,
				width: 50,
				height: 50
			}],
		}
	},
	methods: {
		marker(e){
			wx.openLocation({
				latitude: this.address.latitude,
				longitude: this.address.longitude,
				scale: 18,
				name: this.address.area.long_label,
				address:this.address.address
			})
		}
	}
}
</script>

<style lang="less" scoped>
</style>

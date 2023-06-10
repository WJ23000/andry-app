<template lang="pug">
	view.banner
		u-swiper(
			:list="bannerList",
			keyName="image",
			height="375",
			@change="onSwiperChange")
		view.indicator
			view {{ swiperInfo.current }}/{{  swiperInfo.total }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
	components: {}
})
export default class Banner extends Vue {
	@Prop()
	bannerList!: any;
	
	swiperInfo = {
		current: 1,
		total: this.bannerList.length
	}
	
	onSwiperChange(value) {
		this.swiperInfo.current = value.current + 1;
	}
}
</script>

<style lang="scss" scoped>
.banner {
	position: relative;
	.indicator {
		position: absolute;
		right: 28rpx;
		bottom: 28rpx;
		padding: 8rpx 24rpx;
		background: rgba($color: #000000, $alpha: 0.4);
		color: #ffffff;
		font-size: 24rpx;
		border-radius: 50rpx;
	}
}
</style>

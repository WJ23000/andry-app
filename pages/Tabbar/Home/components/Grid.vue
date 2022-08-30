<template lang="pug">
	view
		swiper.grid-warp(@change="gridChange")
			swiper-item
				u-grid(:col="4", :border="false")
					u-grid-item.grid-item(v-for="(item, index) in oneList" :index="index" :key="index")
						image(:src="item.image" :size="46")
						text.grid-text {{ item.name }}
			swiper-item
				u-grid(:col="4", :border="false")
					u-grid-item.grid-item(v-for="(item, index) in twoList" :index="index + 9" :key="index")
						image(:src="item.image" :size="46")
						text.grid-text {{ item.name }}
		view.indicator-dots
			view.indicator-dots-item(:class="[current == 0 ? 'indicator-dots-active' : '']")
			view.indicator-dots-item(:class="[current == 1 ? 'indicator-dots-active' : '']")
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
	components: {}
})
export default class Grid extends Vue {
	@Prop({
		default: () => {
			return [];
		}
	})
	gridList!: any;
	oneList = []
	twoList = []

	current = 0;
	
	created() {
		this.oneList = this.gridList.slice(0,8);
		this.twoList = this.gridList.slice(8,16);
	}

	gridChange(e) {
		this.current = e.detail.current;
	}
}
</script>

<style lang="scss" scoped>
.grid-warp {
	height: 290rpx;
}
image {
	width: 80rpx;
	height: 80rpx;
}
.grid-item {
	height: 140rpx;
	/deep/ .u-grid-item-box {
		padding: 0rpx !important;
	}
}
.grid-text {
	font-size: 28rpx;
	margin-top: 4rpx;
	color: #5d656b;
}
.indicator-dots {
	display: flex;
	justify-content: center;
	align-items: center;
}
.indicator-dots-item {
	background-color: $uni-bg-color;
	height: 14rpx;
	width: 14rpx;
	border-radius: 20rpx;
	margin: 0rpx 6rpx;
	transition: all 0.5s;
}
.indicator-dots-active {
	width: 24rpx;
	background-color: $uni-color-primary;
}
</style>

<template lang="pug">
	view.andry-goods-detail
		view.header
			view 返回
		Banner(:bannerList="bannerList")
		view.cell
			view.money
				text.unit ￥
				text.price 2580
				text.decimal .00
			view.title
				text.type 自营
				text.sub-title SK-II神仙水160ml精华液双支装sk2护肤品skii化妆品礼盒520情人节礼物
				
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GOODS_BANNER_DATA } from "@/model";
import Banner from "./components/banner.vue";
@Component({
	components: {
		Banner
	}
})
export default class GoodsDetail extends Vue {
	bannerList = GOODS_BANNER_DATA;
	
	onLoad(option) {
		console.log("url参数", option);
	}
	
	decimal(value, type) {
	  return value.split(".")[type];
	}
}
</script>

<style lang="scss" scoped>
page {
	background-color: #ededed;
}
.andry-goods-detail {
	// background-color: #f2f2f2;
	.cell {
		background: #ffffff;
		padding: 24rpx 28rpx;
		margin: 24rpx;
		border-radius: 16rpx;
	}
	.money {
	  margin-top: 8rpx;
	  color: #fa3534;
	}
	.price {
	  font-size: 48rpx;
	  font-weight: bold;
	}
	.unit,
	.decimal {
	  font-size: 28rpx;
	}
	.title {
		.type {
			background: #fa3534;
			color: #ffffff;
			font-size: 26rpx;
			padding: 4rpx 12rpx;
			margin-right: 8rpx;
			border-radius: 8rpx;
		}
	}
}
</style>

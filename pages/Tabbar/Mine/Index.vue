<template lang="pug">
	view.andry-mine
		view 我的
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GOODS_DATA } from "@/model";
@Component({
	components: {
	}
})
export default class Mine extends Vue {
	
}
</script>

<style lang="scss" scoped>
page {
	background-color: #ededed;
}
.andry-mine {
	.u-search-box {
		background: $andry-bg-image;
		background-size: cover;
	}
	.icon-width {
		position: relative;
		width: 54px;
		height: 44px;
		&:active {
			background-color: #ededed;
		}
	}
	.sign {
		padding: 4rpx 12rpx;
		font-size: 24rpx;
		background: #ffffff;
		border-radius: 50px;
	}
	.user-box {
		padding-top: 120rpx;
		.avatar {
			height: 140rpx;
		}
		.u-flex-1 {
			margin-left: 8rpx;
		}
	}
	.u-tips-color {
		color: #333333
	}
	.order-grid,
	.other-grid {
		background: #ffffff;
		margin: 8rpx 24rpx;
		padding: 28rpx 24rpx 8rpx 24rpx;
		border-radius: 8rpx;
	}
	.grid-text {
		font-size: 24rpx;
		margin-top: 4rpx;
		color: #5d656b;
	}
	.divider {
		padding: 12rpx 0rpx;
	}
	.wrap {
		padding: 0rpx 12rpx;
	}
	.w100 {
		width: 100%;
	}
	.wechat-qrcode {
		margin: 48rpx 0rpx 40rpx 42rpx;
		width: 400rpx;
		height: 400rpx;
	}
}
</style>

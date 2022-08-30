<template lang="pug">
	view.andry-home
		view 首页
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import Grid from "./components/Grid.vue";
import { BANNER_DATA, GRID_DATA, GOODS_DATA } from "@/model";
@Component({
	components: {
		Grid
	}
})
export default class Home extends Vue {
	
}
</script>

<style lang="scss">
page {
	background: #ededed;
}
</style>
<style lang="scss" scoped>
.andry-home {
	.header {
		background: linear-gradient(bottom, #ededed, #ff6666, #ff0000);
		padding: 0rpx 24rpx;
		.search {
			height: 88rpx;
			line-height: 88rpx;
		}
		.grid {
			margin-top: 12rpx;
			padding: 12rpx 0px;
			background: #ffffff;
			border-radius: 8rpx;
		}
	}
	.search-sticky {
		position: fixed;
		top: 0;
		width: 100%;
		height: 88rpx;
		line-height: 88rpx;
		background: #ffffff;
		padding: 0rpx 24rpx;
		z-index: 1000;
	}
	.wrap {
		padding: 0rpx 12rpx;
		background: #ededed;
		.waterfall-box {
			padding: 20rpx 0rpx;
			box-sizing: border-box;

			> view {
				padding: 0 10rpx;
			}
		}
		.h-flex-x {
			display: flex;
			flex-direction: row;
			flex-wrap: nowrap;
			justify-content: flex-start;
			align-items: flex-start;
			align-content: flex-start;
			&.h-flex-2 {
				> view {
					width: 50%;
				}
			}
		}
		.load-txt {
			padding: 0 0 20rpx 0;
			height: 100%;
			text-align: center;
			color: #999;
			font-size: 24rpx;
		}
	}
}
</style>

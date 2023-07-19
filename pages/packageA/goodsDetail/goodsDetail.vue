<template lang="pug">
view.andry-goods-detail
	view.header(:style="{background: bgColor}")
		view.left-option
			u-icon.arrow-left(name="arrow-left", @click="onGoBack", size="22")
			view.tabs
				view.item(v-for="item in tabList") {{ item }}
		view.right-option
			u-icon.arrow-left(name="star" size="22")
			u-icon.arrow-left(name="share-square", size="22")
	Banner(:bannerList="bannerList")
	view.cell
		view.money
			text.unit 预估到手
			text.unit ￥
			text.price 2580
			text.decimal .00
		view.title
			text.type 自营
			text.sub-title SK-II神仙水160ml精华液双支装sk2护肤品skii化妆品礼盒520情人节礼物	
		view.info
			view.item 
				u-icon.arrow-left(name="share-square", size="22")
				text.item-title 分享
			view.item
				u-icon.arrow-left(name="star", size="22")
				text.item-title 分享
			view.item
				u-icon.arrow-left(name="rmb-circle", size="22")
				text.item-title 降价通知
	view.cell
		view.cell-option
			view.checked 
				text.option-title 选择
				view.detail
					text.txt 神仙水精华230ml,1.3kg,1件
					u-icon.arrow-left(name="arrow-right", size="14", :bold="true")
		view.cell-option
			view.address
				text.option-title 送至
				view.detail
					u-icon.arrow-left(name="map", size="14", color="#fa3534", :bold="true")
					text.txt 浙江省杭州市西湖区留下街道石马社区91号楼
					u-icon.arrow-left(name="arrow-right", size="14", :bold="true")
		view.cell-option
			view.service
				text.option-title 服务
				view.service-detail
					view 破损包退 · 极速退款 · 7天无理由退换
					u-icon.arrow-left(name="arrow-right", size="14", color="#fa3534", :bold="true")
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

	bgColor = ""
	tabList = ["商品", "评价", "详情", "推荐"];

	onLoad(option) {
		console.log("url参数", option);
	}
	
	// 返回上一页
	onGoBack() {
		uni.navigateBack({
			delta: 1
		});
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
	.header {
		position: fixed;
		top: 0;
		z-index: 999;
		width: 100%;
		height: 44px;
		line-height: 44px;
		padding: 0rpx 24rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		.left-option, .right-option {
			display: flex;
		}
	}
	.tabs {
		display: flex;
		justify-content: start;
		.item {
			margin-left: 24rpx;
		} 
	}
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
		margin-top: 24rpx;
		font-weight: bold;
		.type {
			background: #fa3534;
			color: #ffffff;
			font-size: 26rpx;
			padding: 4rpx 12rpx;
			margin-right: 8rpx;
			border-radius: 8rpx;
		}
		.sub-title {
			font-size: 32rpx;
		}
	}
	.info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 24rpx;
		.item {
			display: flex;
			align-items: center;
			font-size: 24rpx;
			&-title {
				margin-left: 8rpx;
				color: #999999;
			}
		}
	}
	.cell-option {
		margin-top: 24rpx;
		font-size: 28rpx;
		.option-title {
			display: flex;
			align-items: center;
			margin-right: 24rpx;
			color: #999999;
		}
		.detail {
			display: flex;
			flex: 1;
			justify-content: space-between;
			align-items: baseline;
			.txt {
				flex: 1;
				white-space: break-spaces;
			}
		}
	}
	.checked {
		display: flex;
	}
	.address {
		display: flex;
		justify-content: space-between;
		white-space: nowrap;
	}
	.service {
		display: flex;
	}
	.service-detail {
		background-color: rgba(250, 53, 52, 0.1);
		color: #fa3534;
		padding: 8rpx 24rpx;
		border-radius: 8rpx;
		display: flex;
		flex: 1;
		justify-content: space-between;
		align-items: baseline;
	}
}
</style>

<template lang="pug">
view.andry-goods-detail
	status-bar
	view.header(id="goods",:style="{background: bgColor}", :class="{show: top > 44}")
		view.left-option
			<!-- #ifdef H5 || APP-PLUS -->
			view.left-image(:class="{resetImage: top < 44}")
				image(:src="top > 44 ? returnImage : returnImageWhite", @click="onGoBack")
			<!-- #endif -->
			view.tabs(v-if="top > 44")
				view.item(
					v-for="(item,index) in tabList", 
					:class="{active: current == index}",
					@click="onTab(item,index)") {{ item.name }}
		view.right-option
			view.right-image(:class="{resetImage: top < 44}")
				image(:src="top > 44 ? starImage : starImageWhite")
			view.right-image(:class="{resetImage: top < 44}")
				image(:src="top > 44 ? shareImage : shareImageWhite")
	Banner(:bannerList="bannerList")
	view.money-cell
		view.money
			text.unit 预估到手
			text.unit ￥
			text.price 2580
			text.decimal .00
	view.cell(:style="{marginTop: '-25px'}")
		view.title
			text.type 自营
			text.sub-title SK-II神仙水160ml精华液双支装sk2护肤品skii化妆品礼盒520情人节礼物	
		view.tag 美白 · 提亮肤色 · 白到自发光
		view.rank
			text.type
				text 排行榜
			view.sub-title 
				view 精华热卖榜 · 第5名
				u-icon(name="arrow-right", size="14", color="#fa3534", :bold="true")
		view.info
			view.item 
				u-icon(name="share-square", size="22")
				text.item-title 分享
			view.item
				u-icon(name="star", size="22")
				text.item-title 分享
			view.item
				u-icon(name="rmb-circle", size="22")
				text.item-title 降价通知
	view.cell
		view.cell-option
			view.checked 
				text.option-title 选择
				view.detail
					text.txt 神仙水精华230ml，1.3kg，1件
					u-icon(name="arrow-right", size="14", :bold="true")
		view.cell-option
			view.address
				text.option-title 送至
				view.detail
					u-icon(name="map", size="14", color="#fa3534", :bold="true")
					text.txt 浙江省杭州市西湖区留下街道石马社区91号楼
					u-icon(name="arrow-right", size="14", :bold="true")
		view.cell-option
			view.service
				text.option-title 服务
				view.service-detail
					view 破损包退 · 极速退款 · 7天无理由退换
					u-icon(name="arrow-right", size="14", color="#fa3534", :bold="true")
	view.cell(id="evaluate")
		view.cell-header
			view.cell-header-title 评价(8万+)
			view.cell-header-other
				text 好评率 90%
				u-icon(name="arrow-right", size="14", :bold="true")
		view.evaluate-cell(v-for="item in evaluateList")
			view.left
				view.user
					image(:src="item.userImage")
					view
						text {{ item.userName }}
						u-rate(count="5" v-model="item.rate")
				view.comment {{ item.evaluate }}
			view.right
				image(v-for="record in item.imgList", :src="record") 
	view.cell(id="recommend")
		view.cell-header
			view.cell-header-sub-title 
				view.cell-header-line
				view 为你推荐
			view.cell-header-other
				text 查看全部
				u-icon(name="arrow-right", size="14", :bold="true")
		view.recommend-cell
			Recommend(:recommendList="recommendList")
	view.cell(id="detail")
		view.cell-header
			view.cell-header-sub-title 
				view.cell-header-line
				view 详情		
		Introduce(:introduceList="introduceList")
	view.bottom
		view.bottom-option(@click="onGoBack")
			view.item
				image(src="http://cdn.wjaxx.xyz/tabbar/home-black.png")
				text 首页
		view.bottom-option
			view.item
				image(src="http://cdn.wjaxx.xyz/kefu.png")
				text 客服
		view.bottom-option(@click="onCartPage")
			view.item
				image(src="http://cdn.wjaxx.xyz/tabbar/cart-black.png")
				text 购物车
		view.button 
			view.left 加入购物车
			view.right 立即购买
	back-top(:top="top")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GOODS_BANNER_DATA, GOODS_DATA } from "@/model";
import Banner from "./components/banner.vue";
import Recommend from "./components/recommend.vue";
import Introduce from "./components/introduce.vue";
@Component({
	components: {
		Banner,
		Recommend,
		Introduce
	}
})
export default class GoodsDetail extends Vue {
	bannerList = GOODS_BANNER_DATA;
	recommendList = GOODS_DATA;

	top = 0;
	bgColor = "";
	tabList = [
		{
			id: "goods",
			name: "商品"
		},
		{
			id: "evaluate",
			name: "评价"
		},
		{
			id: "recommend",
			name: "推荐"
		},
		{
			id: "detail",
			name: "详情"
		}
	];
	current = 0;

	returnImage = "http://cdn.wjaxx.xyz/return.png";
	returnImageWhite = "http://cdn.wjaxx.xyz/return-white.png";
	starImage = "http://cdn.wjaxx.xyz/star.png";
	starImageWhite = "http://cdn.wjaxx.xyz/star-white.png";
	shareImage = "http://cdn.wjaxx.xyz/share.png";
	shareImageWhite = "http://cdn.wjaxx.xyz/share-white.png";

	evaluateList = [
		{
			userName: "wj23000",
			userImage: "http://cdn.wjaxx.xyz/mine/user.png",
			evaluate:
				"皮肤吸收特别快，不会出现粘腻的感觉，给人非常舒适的感觉，这一年皮肤越来越好，自然健康越来越自信",
			rate: 4,
			imgList: ["http://cdn.wjaxx.xyz/goods/img.jpg"]
		}
	];

	introduceList = [
		{
			type: "video",
			url: "http://cdn.wjaxx.xyz/goods/detail.mp4"
		},
		{
			type: "image",
			url: "http://cdn.wjaxx.xyz/goods/detail2.jpg"
		}
	];

	onLoad(option) {
		console.log("url参数", option);
	}

	// 监听页面滚动(一键置顶，tabs吸顶)
	onPageScroll(e) {
		this.top = e.scrollTop;
		this.bgColor = this.top > 44 ? "#ffffff" : "";
	}

	// 返回上一页
	onGoBack() {
		uni.navigateBack({
			delta: 1
		});
	}

	// 跳到购物车
	onCartPage() {
		uni.switchTab({
			url: "/pages/base/cart/cart"
		});
	}

	// tab切换和锚点定位
	onTab(item, index) {
		this.current = index;
		const id = "#" + item.id;
		uni
			.createSelectorQuery()
			.select(id)
			.boundingClientRect((rect) => {
				uni.pageScrollTo({
					scrollTop: (rect as any).top
				});
			})
			.exec();
	}

	decimal(value, type) {
		return value.split(".")[type];
	}
}
</script>

<style lang="scss">
// APP窗口背景色默认白色，需用此种方式调整窗口背景色
page {
	background-color: #ededed;
}
</style>
<style lang="scss" scoped>
.andry-goods-detail {
	.header {
		position: fixed;
		top: 0;
		/* #ifdef APP-PLUS */
		top: var(--status-bar-height);
		/* #endif */
		z-index: 999;
		width: 100%;
		height: 44px;
		padding: 0rpx 12rpx 0rpx 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		.left-option,
		.right-option {
			display: flex;
			align-items: center;
			.left-image {
				margin-right: 12rpx;
				width: 44rpx;
				height: 44rpx;
				padding: 8rpx;
			}
			.right-image {
				margin-right: 12rpx;
				padding: 8rpx;
			}
			image {
				width: 44rpx;
				height: 44rpx;
			}
		}
		.resetImage {
			display: flex;
			background: rgba(0, 0, 0, 0.5);
			border-radius: 50%;
		}
	}
	.show {
		animation: 1s fadeIn ease-out;
	}
	.tabs {
		display: flex;
		justify-content: start;
		.item {
			margin-right: 20rpx;
		}
	}
	.active {
		color: #fa3534;
	}
	// background-color: #f2f2f2;
	.cell {
		background: #ffffff;
		padding: 20rpx 28rpx;
		margin: 20rpx;
		border-radius: 16rpx;
	}

	.tag {
		margin-top: 20rpx;
		font-size: 26rpx;
		color: #999999;
	}

	.money-cell {
		background: #000000;
		padding: 20rpx 28rpx 20rpx 38rpx;
		margin: 20rpx;
		border-radius: 16rpx;
	}

	.money {
		padding-bottom: 40rpx;
		color: #ffffff;
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
		margin-top: 20rpx;
		font-weight: bold;
		word-break: break-all;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		.type {
			background: #fa3534;
			color: #ffffff;
			font-size: 26rpx;
			padding: 4rpx 12rpx;
			margin-right: 8rpx;
			border-radius: 8rpx;
		}
		.sub-title {
			font-size: 36rpx;
		}
	}

	.rank {
		margin-top: 20rpx;
		display: flex;
		align-items: center;
		.type {
			background: #fa3534;
			color: #ffffff;
			font-size: 26rpx;
			padding: 4rpx 12rpx;
			margin-right: 8rpx;
			border-radius: 8rpx;
		}
		.sub-title {
			margin-left: 20rpx;
			display: flex;
			justify-content: space-between;
			flex: 1;
			font-size: 26rpx;
			color: #fa3534;
		}
	}

	.rank-image {
		width: 28rpx;
		height: 28rpx;
	}

	.info {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 20rpx;
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
		margin-top: 20rpx;
		font-size: 28rpx;
		.option-title {
			display: flex;
			align-items: center;
			margin-right: 20rpx;
			color: #999999;
		}
		.detail {
			display: flex;
			flex: 1;
			justify-content: space-between;
			align-items: baseline;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			.txt {
				flex: 1;
				overflow: hidden;
				text-overflow: ellipsis;
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
		padding: 8rpx 20rpx;
		border-radius: 8rpx;
		display: flex;
		flex: 1;
		justify-content: space-between;
		align-items: baseline;
	}

	.cell-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
		&-line {
			background: #fa3534;
			width: 6rpx;
			height: 34rpx;
			margin-right: 8rpx;
		}
		&-title {
			font-weight: bold;
		}
		&-sub-title {
			display: flex;
			align-items: flex-end;
			font-size: 28rpx;
		}
		&-other {
			display: flex;
			font-size: 24rpx;
		}
	}
	.evaluate-cell {
		display: flex;
		.left {
			flex: 1;
			image {
				width: 80rpx;
				height: 80rpx;
				border-radius: 50%;
				margin-right: 20rpx;
			}
			.user {
				display: flex;
			}
			.comment {
				margin-top: 14rpx;
				font-size: 26rpx;
				word-break: break-all;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				overflow: hidden;
			}
		}
		.right {
			image {
				width: 180rpx;
				height: 180rpx;
				border-radius: 8rpx;
			}
		}
	}

	.recommend-cell {
		margin: 0rpx -16rpx;
	}

	.bottom {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 44px;
		line-height: 12px;
		background-color: #ffffff;
		z-index: 999;
		display: flex;
		justify-items: center;
		justify-content: space-around;
		.bottom-option {
			display: flex;
			align-items: center;
		}
		.item {
			display: flex;
			flex-direction: column;
			align-items: center;
			margin-top: 4rpx;
			font-size: 24rpx;
			image {
				width: 44rpx;
				height: 44rpx;
			}
		}
		.button {
			display: flex;
			align-items: center;
			.left {
				height: 68rpx;
				line-height: 68rpx;
				padding: 0rpx 24rpx;
				background-color: #fa3534;
				color: #ffffff;
				font-size: 28rpx;
				border-radius: 50rpx;
			}
			.right {
				margin-left: 24rpx;
				height: 68rpx;
				line-height: 68rpx;
				padding: 0rpx 24rpx;
				background-color: #000000;
				color: #ffffff;
				font-size: 28rpx;
				border-radius: 50rpx;
			}
		}
	}

	@keyframes fadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
}
</style>

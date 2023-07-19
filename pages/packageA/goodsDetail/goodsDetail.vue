<template lang="pug">
view.andry-goods-detail
	view.header(:style="{background: bgColor}", :class="{show: top > 44}")
		view.left-option(:class="{resetIcon: top < 44}")
			u-icon.left-icon(name="arrow-left", @click="onGoBack", size="22")
			view.tabs(v-if="top > 44")
				view.item(v-for="item in tabList") {{ item }}
		view.right-option(:class="{resetIcon: top < 44}")
			u-icon.right-icon(name="star" size="22")
			u-icon.right-icon(name="share-square", size="22")
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
	view.cell
		view.evaluate
			view.evaluate-title 评价(8万+)
			view.favorable-rate
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
	view.wrap
		goods-list(
			:leftHeight="leftHeight",
			:rightHeight="rightHeight",
			:leftList="leftList",
			:rightList="rightList",
			:loadTxt="ajax.loadTxt",
			@onHeight="onHeight",
			@onClick="onGoodsClick")
	back-top(:top="top")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GOODS_BANNER_DATA, GOODS_DATA } from "@/model";
import Banner from "./components/banner.vue";
@Component({
	components: {
		Banner
	}
})
export default class GoodsDetail extends Vue {
	bannerList = GOODS_BANNER_DATA;

	top = 0;
	bgColor = "";
	tabList = ["商品", "评价", "详情", "推荐"];

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

	// 商品推荐
	leftHeight = 0;
	rightHeight = 0;
	leftList: any[] = [];
	rightList: any[] = [];
	ajax = {
		// 是否可以加载
		load: true,
		// 加载中提示文字
		loadTxt: "",
		// 每页的请求条件
		rows: 10,
		// 页码
		page: 1
	};

	onLoad(option) {
		console.log("url参数", option);
		this.getList();
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

	// 监听高度变化
	onHeight(height, tag) {
		if (tag == "left") {
			this.leftHeight += height;
		} else {
			this.rightHeight += height;
		}
	}
	// 组件点击事件
	onGoodsClick(index, tag) {
		console.log(index, tag);
		// 对应的数据
		if (tag == "left") {
			console.log(this.leftList[index]);
		} else {
			console.log(this.rightList[index]);
		}
		let direction = {
			left: "左",
			right: "右"
		};
		uni.showToast({
			title: `${direction[tag]}侧列表第${index + 1}个被点击`,
			icon: "none"
		});
		uni.navigateTo({
			url:
				"/pages/packageA/goodsDetail/goodsDetail?id=" + this.leftList[index].id
		});
	}
	// 获取数据
	getList() {
		/*
			无真实数据，当前由 setTimeout 模拟异步请求、
			自行替换 请求方法将数据 传入 addList() 方法中
			自行解决数据格式，自行修改组件内布局和内容绑定
		*/
		if (!this.ajax.load) {
			return;
		}
		this.ajax.load = false;
		this.ajax.loadTxt = "加载中";

		setTimeout(() => {
			// 生成随机数方法
			let random = (min = 0, max) => {
				return Math.floor(Math.random() * max) + min;
			};

			let res: any = [];
			GOODS_DATA.forEach((item) => {
				const price = random(9, 9999) + Math.random();
				item.money = price.toFixed(2);
			});
			this.addList(GOODS_DATA);
		}, 300);
	}
	addList(res) {
		// 获取到的数据，请注意数据结构
		if (!res || res.length < 1) {
			this.ajax.loadTxt = "没有更多了";
			return;
		}

		// 左右列表高度的差
		let differ = this.leftHeight - this.rightHeight;
		// 计算差值，用于确定优先插入那一边
		let differVal = 0;

		// 初始化左右列表的数据
		let i = differ > 0 ? 1 : 0;

		let [left, right]: any = [[], []];

		// 获取插入的方向
		let getDirection = (index) => {
			/* 左侧高度大于右侧超过 600px 时，则前3条数据都插入到右边 */
			if (differ >= 600 && index < 3) {
				differVal = 1;
				return "right";
			}

			/* 右侧高度大于左侧超过 600px 时，则前3条数据都插入到左边 */
			if (differ <= -600 && index < 3) {
				differVal = -1;
				return "left";
			}

			/* 左侧高度大于右侧超过 350px 时，则前2条数据都插入到右边 */
			if (differ >= 350 && index < 2) {
				return "right";
			}
			/* 右侧高度大于左侧超过 350px 时，则前2条数据都插入到左边 */
			if (differ <= -350 && index < 2) {
				differVal = -1;
				return "left";
			}

			/* 当前数据序号为偶数时，则插入到左边 */
			if ((i + differVal) % 2 == 0) {
				return "left";
			} else {
				/* 当前数据序号为奇数时，则插入到右边 */
				return "right";
			}
		};

		// 将数据源分为左右两个列表，容错差值请自行根据项目中的数据情况调节
		res.forEach((item, index) => {
			if (getDirection(index) == "left") {
				//console.log(`差值：${differ},方向：left，序号${index}`)
				left.push(item);
			} else {
				//console.log(`差值：${differ},方向：right，序号${index}`)
				right.push(item);
			}
			i++;
		});

		// 将左右列表的数据插入，第一页时则覆盖
		if (this.ajax.page == 1) {
			this.leftList = left;
			this.rightList = right;
			uni.stopPullDownRefresh();
		} else {
			this.leftList = [...this.leftList, ...left];
			this.rightList = [...this.rightList, ...right];
		}

		this.ajax.load = true;
		this.ajax.loadTxt = "上拉加载更多";
		this.ajax.page++;
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
		z-index: 999;
		width: 100%;
		height: 44px;
		line-height: 44px;
		padding: 0rpx 12rpx 0rpx 20rpx;
		display: flex;
		align-items: center;
		justify-content: space-between;
		box-sizing: border-box;
		.left-option,
		.right-option {
			display: flex;
			align-items: center;
			.left-icon {
				margin-right: 12rpx;
				width: 44rpx;
				height: 44rpx;
			}
			.right-icon {
				margin-right: 12rpx;
			}
			/deep/ .u-icon {
				padding: 8rpx;
				border-radius: 50%;
			}
		}
		.resetIcon {
			/deep/ .u-icon {
				padding: 8rpx;
				background-color: rgba(0, 0, 0, 0.7);
				border-radius: 50%;
			}
			/deep/ .u-icon__icon {
				color: #ffffff !important;
			}
		}
	}
	.show {
		animation: 1s fadeIn ease-out;
	}
	.tabs {
		display: flex;
		justify-content: start;
		.item {
			margin-left: 20rpx;
		}
	}
	// background-color: #f2f2f2;
	.cell {
		background: #ffffff;
		padding: 20rpx 28rpx;
		margin: 20rpx;
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
		margin-top: 20rpx;
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
		margin-top: 20rpx;
		.item {
			display: flex;
			align-items: center;
			font-size: 20rpx;
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

	.evaluate {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 20rpx;
		.evaluate-title {
			font-weight: bold;
		}
		.favorable-rate {
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
				margin-top: 12rpx;
				font-size: 28rpx;
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

	.wrap {
		padding: 20rpx 10rpx;
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
			color: #999999;
			font-size: 20rpx;
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

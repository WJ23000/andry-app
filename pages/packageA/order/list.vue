<template lang="pug">
view.andry-order-list
	u-sticky(bgColor="#ffffff", offset-top="0")
		view.tabs
			u-tabs(
				:list="tabList",
				:scrollable="false",
				lineWidth="30",
				lineColor="#f56c6c",
				:activeStyle="activeStyle",
				:inactiveStyle="inactiveStyle",
				itemStyle="height: 44px;",
				:current="tabCurrent",
				@click="onTabItem")
	view.order-wrap
		order-item(
			:orderItems="orderItems",
			:current="tabCurrent")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GOODS_DATA } from "@/model";
@Component({
	components: {}
})
export default class OrderList extends Vue {
	tabCurrent = 0;
	tabList = [
		{
			name: "全部"
		},
		{
			name: "代付款"
		},
		{
			name: "待发货"
		},
		{
			name: "待收货"
		},
		{
			name: "待评价"
		}
	];
	activeStyle = {
		color: "#303133",
		fontWeight: "bold",
		transform: "scale(1.05)"
	};
	inactiveStyle = {
		color: "#606266",
		transform: "scale(1)"
	};
	orderItems = GOODS_DATA
	
	onLoad(option) {
		console.log("url参数", option);
		this.tabCurrent = option.current;
	}
	
	// 下拉刷新
	onPullDownRefresh() {
		uni.showToast({
			title: "下拉刷新",
			icon: "none",
			duration: 1000
		});
		setTimeout(() => {
			uni.stopPullDownRefresh();
		}, 2000);
	}
	
	// 触底触发
	onReachBottom() {
		uni.showToast({
			title: "触底加载……",
			icon: "none",
			duration: 1000
		});
	}
	
	// tab切换
	onTabItem(item) {
		console.log("点击", item.index);
		this.tabCurrent = item.index;
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
.andry-order-list {}
.tabs {
	/deep/ .u-tabs__wrapper__nav__item__text {
		font-size: 28rpx;
	}
}
</style>

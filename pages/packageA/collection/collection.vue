<template lang="pug">
view.andry-collection-list
	view.card(
		v-for="(item,index) in collectionList", 
		:key="index",
		@click="onGoodsClick")
		image(:src="item.url")
		view.content
			view.title {{ item.title }}
			view.money
				text.unit ￥
				text.price {{ decimal(item.money,0) }}
				text.decimal .{{ decimal(item.money,1) }}
			view.similar 
				text 看相似
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GOODS_DATA } from "@/model";
@Component({
	components: {}
})
export default class CollectionList extends Vue {
	collectionList: any = GOODS_DATA;

	onLoad(option) {
		console.log("url参数", option);
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
	
	// 组件点击事件
	onGoodsClick() {
		uni.navigateTo({
			url: "/pages/packageA/goodsDetail/goodsDetail?id=1"
		});
	}

	decimal(value, type) {
		return value.split(".")[type];
	}
}
</script>

<style lang="scss" scoped>
.andry-collection-list {
	.card {
		display: flex;
		padding: 24rpx;
		border-bottom: 2rpx solid #f6f6f6;

		image {
			width: 200rpx;
			height: 200rpx;
		}

		.content {
			flex: 1;
			margin-left: 24rpx;
		}

		.title {
			font-size: 32rpx;
		}

		.money {
			margin-top: 8rpx;
			color: #fa3534;
		}

		.price {
			font-size: 32rpx;
			font-weight: bold;
		}

		.unit,
		.decimal {
			font-size: 24rpx;
		}

		.similar {
			text-align: right;

			text {
				display: inline-block;
				margin-top: 20rpx;
				font-size: 24rpx;
				border: 2rpx solid #999999;
				padding: 4rpx 10rpx;
				border-radius: 50rpx;
				text-align: right;
			}
		}
	}
}
</style>

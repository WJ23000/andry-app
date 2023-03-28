<template lang="pug">
	view.andry-classify
		global-search.ml1
		view.u-menu-wrap
			scroll-view.u-tab-view.menu-scroll-view(
				scroll-y 
				scroll-with-animation 
				:scroll-top="scrollTop")
				view.u-tab-item(
					v-for="(item,index) in classifyData",
					:key="index",
					:class="[current==index ? 'u-tab-item-active' : '']",
					:data-current="index", 
					@tap.stop="swichMenu(index)")
					text.u-line-1 {{item.name}}
			block(v-for="(item,index) in classifyData", :key="index")
				scroll-view.right-box(scroll-y, v-if="current==index")
					view.page-view
						view.class-item
							view.item-title
								text {{item.name}}
							view.item-container
								view.thumb-box(v-for="(item1, index1) in item.foods", :key="index1")
									image.item-menu-image(:src="item1.icon" mode="")
									view.item-menu-name(@click="onMenuItem") {{item1.name}}
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { CLASSIFY_DATA } from "@/model";
@Component({
	components: {}
})
export default class Classify extends Vue {
	classifyData = CLASSIFY_DATA;
	scrollTop = 0; // tab标题的滚动条位置
	current = 0; // 预设当前项的值
	menuHeight = 0; // 左边菜单的高度
	menuItemHeight = 0; // 左边菜单item的高度

	// 点击左边的栏目切换
	async swichMenu(index) {
		if (index == this.current) return;
		this.current = index;
		// 如果为0，意味着尚未初始化
		if (this.menuHeight == 0 || this.menuItemHeight == 0) {
			await this.getElRect("menu-scroll-view", "menuHeight");
			await this.getElRect("u-tab-item", "menuItemHeight");
		}
		// 将菜单菜单活动item垂直居中
		this.scrollTop =
			index * this.menuItemHeight +
			this.menuItemHeight / 2 -
			this.menuHeight / 2;
	}
	// 获取一个目标元素的高度
	getElRect(elClass, dataVal) {
		new Promise((resolve, reject) => {
			const query = uni.createSelectorQuery().in(this);
			query
				.select("." + elClass)
				.fields({ size: true }, res => {
					// 如果节点尚未生成，res值为null，循环调用执行
					if (!res) {
						setTimeout(() => {
							// this.getElRect(elClass);
						}, 10);
						return;
					}
					this[dataVal] = res.height;
				})
				.exec();
		});
	}

	onMenuItem() {
		console.log("触发了");
	}
}
</script>

<style lang="scss" scoped>
.andry-classify {
	height: calc(100vh);
	/* #ifdef H5 */
	height: calc(100vh - 50px);
	/* #endif */
	display: flex;
	flex-direction: column;

	.u-menu-wrap {
		display: flex;
		flex: 1;
		overflow: hidden;
	}

	.u-search-inner {
		background-color: rgb(234, 234, 234);
		border-radius: 100rpx;
		display: flex;
		align-items: center;
		padding: 10rpx 16rpx;
	}

	.u-search-text {
		font-size: 26rpx;
		color: $u-tips-color;
		margin-left: 10rpx;
	}

	.u-tab-view {
		width: 200rpx;
		height: 100%;
	}

	.u-tab-item {
		height: 110rpx;
		background: #f6f6f6;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 26rpx;
		color: #444444;
		font-weight: 400;
		line-height: 1;
	}

	.u-tab-item-active {
		position: relative;
		color: #000000;
		font-size: 30rpx;
		font-weight: 600;
		background: #ffffff;
	}

	.u-tab-item-active::before {
		content: "";
		position: absolute;
		border-left: 8rpx solid $color-primary;
		height: 32rpx;
		left: 0;
		top: 39rpx;
	}

	.u-tab-view {
		height: 100%;
	}

	.right-box {
		background-color: rgb(250, 250, 250);
	}

	.page-view {
		padding: 16rpx;
	}

	.class-item {
		background-color: #fff;
		padding: 16rpx;
		border-radius: 8rpx;
	}

	.item-title {
		font-size: 26rpx;
		color: $u-main-color;
		font-weight: bold;
	}

	.item-menu-name {
		font-weight: normal;
		font-size: 24rpx;
		color: $u-main-color;
	}

	.item-container {
		display: flex;
		flex-wrap: wrap;
	}

	.thumb-box {
		width: 33.333333%;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-top: 20rpx;
	}

	.item-menu-image {
		width: 120rpx;
		height: 120rpx;
	}
}
</style>

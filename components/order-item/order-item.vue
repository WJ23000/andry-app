<template lang="pug">
view.order-item
	view.order-cell(v-for="(item,index) in orderItems" :key="index")
		view.order-box(:data-id="item.id" :data-index="index")
			view.order-main
				view.left_image
					image.order-image(:src="item.url")
				view.left_box
					view.order-title {{item.title}}
					view.order-count
						text 1000
						text 共2件
		view.order-btn
			view 更多
			view.btn-item
				u-button.btn(text="查看发票", shape="circle", size="mini")
				u-button.btn(text="申请退款", shape="circle", size="mini")
				u-button.btn(v-if="current == 4",text="再次购买", shape="circle", :plain="true", color="#fa3534", size="mini")
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
	components: {}
})
export default class OrderItem extends Vue {
	@Prop()
	orderItems!: any;
	@Prop()
	current!: any;
}
</script>

<style lang="scss" scoped>
.order-item {
	padding: 0rpx 20rpx;
	.order-cell {
		display: flex;
		flex-direction: column;
		background-color: #ffffff;
		margin: 20rpx 0rpx;
		box-sizing: border-box;
		border-radius: 8rpx;
	}
	.order-main {
		display: flex;
	}
	.order-box {
		padding: 0rpx 20rpx;
	}
	.order-image {
		width: 200rpx;
		height: 200rpx;
		float: left;
		margin: 20rpx 10rpx;
	}
	
	.left_box {
		display: flex;
		flex-direction: row;
		margin-left: 8rpx;
		align-items: center;
	}
	
	.order-title {
		font-size: 28rpx;
		line-height: 34rpx;
		margin-right: 20rpx;
		flex: 0 0 79%;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		overflow: hidden;
		-webkit-line-clamp: 2;
	}
	
	.order-count {
		display: flex;
		flex-direction: column;
		align-items: center;
		font-size: 28rpx;
	}
	
	.order-btn {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20rpx 20rpx;
		font-size: 24rpx;
		.btn-item {
			display: flex;
			.btn {
				margin-left: 16rpx;
			}
		}
	}
}
</style>
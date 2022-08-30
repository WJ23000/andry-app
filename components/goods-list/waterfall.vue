<template lang="pug">
	view.waterfall-item(@tap="onTap")
		image(
			:src="params.url",
			mode="widthFix",
			@load="emitHeight",
			@error="emitHeight")
		view.content
			view.title
				text.tag {{ params.label }}
				text.name {{ params.title }}
			view.money 
				text.unit ￥
				text.price {{ decimal(params.money,0) }}
				text.decimal .{{ decimal(params.money,1) }}
			view(style="margin: 0 0 8rpx 0;")
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
	components: {}
})
export default class Waterfall extends Vue {
	@Prop()
	params!: any;
	@Prop()
	tag!: any;
	@Prop({ default: -1 })
	index!: any;

	emitHeight(e) {
		const query: any = uni.createSelectorQuery().in(this);
		query
			.select(".waterfall-item")
			.boundingClientRect(data => {
				let height: any = Math.floor(data.height);
				this.$emit("height", height, this.tag);
			})
			.exec();
	}

	onTap() {
		this.$emit("click", this.index, this.tag);
	}

	decimal(value, type) {
		return value.split(".")[type];
	}
}
</script>

<style lang="scss" scoped>
.waterfall-item {
	padding: 16rpx;
	background-color: #fff;
	border-radius: 4px;
	font-size: 28rpx;
	color: #666;
	margin-bottom: 20rpx;

	image {
		display: block;
		width: 100%;
		// 默认设置一个图片的大约值
		height: 350rpx;
	}

	.content {
		margin-top: 16rpx;
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
		.title {
			height: 76rpx;
			overflow: hidden;
			.tag {
				background-color: #fa3534;
				color: #fff;
				font-size: 24rpx;
				padding: 0rpx 12rpx;
				border-radius: 20rpx;
				margin-right: 8rpx;
			}
		}
		.shop-name {
			font-size: 20rpx;
			color: #999;
		}
	}
}
</style>

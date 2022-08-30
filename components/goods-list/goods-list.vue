<template lang="pug">
	view.goods-list
		view.waterfall-box.h-flex-x.h-flex-2
			view
				Waterfall(
					v-for="(item, index) in leftList",
					:key="index",
					:params="item",
					tag="left",
					@height="onHeight",
					@click="onClick(index, 'left')")
			view
				Waterfall(
					v-for="(item, index) in rightList",
					:key="index",
					:params="item",
					tag="right",
					@height="onHeight",
					@click="onClick(index, 'right')")
		view.load-txt {{ loadTxt }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import Waterfall from "./waterfall.vue";
@Component({
	components: {
		Waterfall
	}
})
export default class GoodsList extends Vue {
	@Prop({ default: 0})
	leftHeight!: number;
	@Prop({ default: 0})
	rightHeight!: number;
	@Prop()
	leftList!: any;
	@Prop()
	rightList!: any;
	@Prop()
	loadTxt!: any;
	
	onHeight() {
		this.$emit("onHeight")
	}
	
	onClick(index, position) {
		this.$emit("onClick", index, position)
	}
}
</script>

<style lang="scss">
	page {
		background: #ededed;
	}
</style>
<style lang="scss" scoped>
.goods-list {
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
</style>

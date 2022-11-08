<template lang="pug">
	view.andry-search
		view.header
			u-icon.arrow-left(name="arrow-left", @click="onGoBack")
			u-search(
				placeholder="护肤品", 
				v-model="keyword",
				@click="onSearch")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
	components: {}
})
export default class Search extends Vue {
	keyword = "";

	// 返回上一页
	onGoBack() {
		uni.navigateBack({
			delta: 1
		});
	}
	// 搜索
	onSearch() {
		console.log("搜索条件", this.keyword);
	}
}
</script>

<style lang="stylus" scoped>
.andry-search
	.header
		display flex
		justify-content space-between
		padding 0rpx 24rpx
		height 88rpx
		line-height 88rpx
		.arrow-left
			margin-right 20rpx
</style>

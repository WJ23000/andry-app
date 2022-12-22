<template lang="pug">
	view.andry-search
		view.header
			u-icon.arrow-left(name="arrow-left", @click="onGoBack")
			u-search(
				placeholder="护肤品", 
				v-model="keyword",
				@custom="onSearch",
				@clear="onClearSearch")
		view.search-result(v-if="isSearchResult")
			SearchResult
		view.history(v-else)
			u-cell(title="搜索历史", :border="false")
				u-icon(slot="right-icon", name="trash", @click="clearHistory")
			view.content
				view.item(
					v-for="(item,index) in historyList",
					:key="index",
					@click="onSearch(item, 'btn')") {{  formatItem(item) }}
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SearchResult from "./components/result.vue";
@Component({
  components: { SearchResult }
})
export default class Search extends Vue {
  keyword = "";
  historyList: any = [];
  isSearchResult = false;

  onLoad() {
    uni.getStorage({
      key: "historyList",
      success: (res) => {
        this.historyList = res.data;
      }
    });
  }

  // 返回上一页
  onGoBack() {
    uni.navigateBack({
      delta: 1
    });
  }

  // 搜索
  onSearch(value, type) {
    this.keyword = value;
    if (!type) {
      this.historyList.push(this.keyword);
      uni.setStorage({
        key: "historyList",
        data: this.historyList,
        success: () => {}
      });
    }
    this.isSearchResult = true;
  }

  // 清除搜索条件
  onClearSearch() {
    this.keyword = "";
    this.isSearchResult = false;
  }

  // 清除搜索历史
  clearHistory() {
    this.historyList = [];
    uni.removeStorage({
      key: "historyList",
      success: () => {}
    });
  }

  // 超过指定长度格式化
  formatItem(item) {
    const length = item.length;
    return length > 23
      ? item.substr(1, 11) + "..." + item.substr(-11, 11)
      : item;
  }
}
</script>

<style lang="stylus" scoped>
.andry-search
	.header
		display flex
		justify-content space-between
		padding 0rpx 24rpx
		height 44px
		line-height 44px
		.arrow-left
			margin-right 20rpx
	.history
		.content
			padding 0rpx 10rpx 0rpx 30rpx
		.item
			display inline-block
			margin 0px 20rpx 20rpx 0px
			padding 6rpx 24rpx
			background #ffffff
			font-size 26rpx
			border 2rpx solid #ededed
			border-radius 50rpx
		.item:active
			background #ededed
</style>

<template lang="pug">
	view.andry-search
		view.header
			u-icon.arrow-left(name="arrow-left", @click="onGoBack")
			u-search(
				placeholder="护肤品", 
				v-model="keyword",
				@custom="onSearch",
				@clear="onClearSearch")
		view.search-result(
			v-if="isSearchResult")
			u-sticky(
				:offsetTop="-44",
				:bgColor="stickyBgColor")
				SearchTab(@searchResultChange="searchResultChange")
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
import SearchTab from "./components/tab.vue";
import SearchResult from "./components/result.vue";
@Component({
  components: { SearchTab, SearchResult }
})
export default class Search extends Vue {
  keyword = "";
  historyList: any = [];
  isSearchResult = false;
	stickyBgColor = "#ffffff";

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

  searchResultChange(value) {}

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

<style lang="scss" scoped>
.andry-search {
  .header {
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 12rpx 24rpx;
    background: #ffffff;
    z-index: 10090;
    .arrow-left {
      margin-right: 20rpx;
		}
	}
  .search-result {
    position: relative;
		z-index: 100100;
	}
  .history {
    .content {
      padding: 0rpx 10rpx 0rpx 30rpx;
		}
    .item {
      display: inline-block;
      margin: 0rpx 20rpx 20rpx 0rpx;
      padding: 6rpx 24rpx;
      background: #ffffff;
      font-size: 26rpx;
      border: 2rpx solid #ededed;
      border-radius: 50rpx;
		}
    .item:active {
      background: #ededed;
		}
	}
}
</style>

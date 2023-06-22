<template lang="pug">
view.search
  view.u-search-box
    u-search(
      :placeholder="placeholder", 
      v-model="keyword",
      :showAction="false",
      :disabled="true",
      @click="onSearch")
  u-icon.scan(name="scan", color="#909193", size="28", @click="onScanCode")
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  components: {}
})
export default class GlobalSearch extends Vue {
  placeholder = "护肤品";
  keyword = "";

  // 搜索
  onSearch() {
    uni.navigateTo({
      url: "/pages/packageA/search/search"
    });
  }
	
	onScanCode() {
		// #ifdef H5
		uni.showToast({
			title: "H5暂不支持该功能",
			icon: "none"
		});
		return false;
		// #endif
		uni.scanCode({
			success: function (res) {
				console.log('条码类型：' + res.scanType);
				console.log('条码内容：' + res.result);
			}
		});
	}
}
</script>

<style lang="scss" scoped>
.search {
  display: flex;
  justify-content: space-between;
  background: #ffffff;
  padding: 0rpx 24rpx;

  .u-search-box {
    padding: 12rpx 0rpx;
    flex: 1;

    .icon-width-left {
      position: relative;
      padding: 0rpx 0rpx 0rpx 24rpx;
    }

    .icon-width-right {
      position: relative;
      padding: 0rpx 24rpx 0rpx 0rpx;
    }

    .header-center {
      flex: 1;
      padding: 0rpx 24rpx;
    }

    .setting {
      margin-left: 24rpx;
    }
  }

  .scan {
    margin-left: $spacing-row-8;
  }
}</style>

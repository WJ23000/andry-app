<template lang="pug">
  view.andry-search-result
    u-sticky(
      :offsetTop="-44",
      :bgColor="stickyBgColor")
      SearchTab(@searchResultChange="searchResultChange")
    view.card(
      v-for="(item,index) in searchList", 
      :key="index")
      image(:src="item.url")
      view.content
        view.title {{ item.title }}
        view.money
          text.unit ￥
          text.price {{ decimal(item.money,0) }}
          text.decimal .{{ decimal(item.money,1) }}
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GOODS_DATA } from "@/model";
import SearchTab from "./tab.vue";
@Component({
  components: {
    SearchTab
  }
})
export default class SearchResult extends Vue {
  searchList: any = GOODS_DATA;
  stickyBgColor = "#ffffff";

  // 触底触发
  onReachBottom() {
    uni.showToast({
      title: "触底加载……",
      icon: "none",
      duration: 1000
    });
  }

  decimal(value, type) {
    return value.split(".")[type];
  }

  searchResultChange(value) {
    this.$emit("searchResultChange", value);
  }
}
</script>

<style lang="scss" scoped>
.andry-search-result {
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
  }
}
</style>

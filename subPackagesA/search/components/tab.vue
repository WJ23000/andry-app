<template lang="pug">
  view.andry-search-tab
    u-sticky(
      :offset-top="0")
      view.tab
        view.item(
          v-for="(item,index) in tabList",
          :key="index",
          :class="tabActive == item ? 'active' : ''") {{ item }}
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class SearchTab extends Vue {
  tabList = ["综合推荐", "销量", "价格", "筛选"];
  tabActive = "综合推荐";
}
</script>

<style lang="scss" scoped>
.andry-search-tab {
  .tab {
    display: flex;
    height: 88rpx;
    line-height: 88rpx;
    .item {
      width: 25%;
      text-align: center;
      font-size: 26rpx;
    }
  }
  .active {
    color: #fa3534;
  }
}
</style>

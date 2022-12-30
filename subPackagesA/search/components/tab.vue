<template lang="pug">
  view.andry-search-tab
    view.tab
      view.item(
        v-for="(item,index) in tabList",
        :key="index",
        :class="tabActive == item ? 'active' : ''",
        @click="onTabItem(item)") 
        view 
          text {{ item }}
          text(
            v-if="item == '综合推荐' || item == '好评'", 
            :class="maskShow ? 'arrow-up' : 'arrow-down'")
          text(
            v-if="item == '价格'", 
            :class="priceSort ? 'arrow-up' : 'arrow-down'")
    u-overlay(:show="maskShow", @click="maskShow = false")
    //- 综合推荐面板
    view.recommend-content(v-if="maskShow && (tabActive == '综合推荐' || tabActive == '好评')", @tap.stop)
      view.recommend.flex(
        v-for="(item,index) in panelDataList", 
        :key="index",
        :class="recommendActive == item.name ? 'recommend-active' : ''",
        @click="onPanelItem(item.name)")
        text.recommend-check(v-if="recommendActive == item.name") √
        text {{ item.name }}
    //- 筛选面板
    view.retrieval-content(v-if="maskShow && tabActive == '筛选'", @tap.stop)
      view 筛选区域
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {}
})
export default class SearchTab extends Vue {
  tabList = ["综合推荐", "销量", "价格", "筛选"];
  tabActive = "综合推荐";

  maskShow = false;
  panelDataList = [
    {
      id: 1,
      name: "综合推荐"
    },
    {
      id: 2,
      name: "好评"
    }
  ];
  recommendActive = "综合推荐";

  priceSort = false;

  onTabItem(value) {
    switch (value) {
      case "综合推荐":
        if (this.tabActive != value) {
          this.maskShow = false;
        } else {
          this.maskShow = !this.maskShow;
        }
        this.tabActive = value;
        break;
      case "好评":
        if (this.tabActive != value) {
          this.maskShow = false;
        } else {
          this.maskShow = !this.maskShow;
        }
        this.tabActive = value;
        break;
      case "销量":
        this.maskShow = false;
        this.tabActive = value;
        break;
      case "价格":
        this.priceSort = !this.priceSort;
        this.maskShow = false;
        this.tabActive = value;
        break;
      case "筛选":
        this.maskShow = !this.maskShow;
        this.tabActive = value;
        break;
      default:
        break;
    }
  }

  // 综合推荐面板
  onPanelItem(value) {
    this.recommendActive = value;
    this.tabList[0] = value;
    this.tabActive = value;
    this.maskShow = false;
  }
}
</script>

<style lang="stylus" scoped>
.andry-search-tab
  .tab
    position relative
    display flex
    height 44px
    line-height 44px
    background #ffffff
    z-index 10080
    .item
      width 25%
      text-align center
      font-size 26rpx
  .active
    font-weight bold
  .recommend-content
    position absolute
    width 100%
    padding 0rpx 40rpx 20rpx 40rpx
    background #ffffff
    z-index 10080
  .recommend
    margin-bottom 20rpx
    font-size 26rpx
  .recommend-active
    color #fa3534
  .recommend-check
    margin-right 20rpx
  .arrow-down
    position relative
    top 22rpx
    left 16rpx
    width 0px
    height 0px
    border 8rpx solid transparent
    border-top-color #000000
  .arrow-up
    position relative
    top -20rpx
    left 16rpx
    width 0px
    height 0px
    border 8rpx solid transparent
    border-bottom-color #000000
  .retrieval-content
    position absolute
    width 100%
    padding 0rpx 40rpx 20rpx 40rpx
    background #ffffff
    z-index 10080
</style>

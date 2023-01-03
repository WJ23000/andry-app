<template lang="pug">
  view.andry-search-tab
    view.tab
      view.item(
        v-for="(item, index) in tabList",
        :key="index",
        :class="tabActive == item ? 'active' : ''",
        @click="onTabItem(item)") 
        view 
          text {{ item }}
          text(
            v-if="item == '综合推荐' || item == '好评'", 
            :class="recommendSort ? 'arrow-up' : 'arrow-down'")
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
      view.retrieval-service
        view.retrieval-title 服务折扣
        view.retrieval-list
          view.item(
            v-for="(item, index) in serviceList",
            :key="index",
            :class="item.checked ? 'retrieval-active' : ''",
            @click="onServiceCheck(index, item.checked)") {{ item.name }}
      view.retrieval-price-range
        view.retrieval-title 价格区间
        view.content
          u--input.input(
            placeholder="最低价",
            border="surround",
            shape="circle",
            fontSize="12px",
            type="number",
            v-model="lowestPrice")
          text.interval —
          u--input.input(
            placeholder="最高价",
            border="surround",
            shape="circle",
            fontSize="12px",
            type="number",
            v-model="highestPrice")
      //- u-gap.retrieval-gap(height="10" bgColor="#ededed")
      view.retrieval-crowd
        view.retrieval-title 使用人群
        view.retrieval-list
          view.item(
            v-for="(item, index) in crowdList",
            :key="index",
            :class="item.checked ? 'retrieval-active' : ''",
            @click="onCrowdCheck(index, item.checked)") {{ item.name }}
      view.retrieval-address
        view.retrieval-title 产地
        view.retrieval-list
          view.item(
            v-for="(item, index) in addressList",
            :key="index",
            :class="item.checked ? 'retrieval-active' : ''",
            @click="onAddressCheck(index, item.checked)") {{ item.name }}
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
  recommendSort = false;
  priceSort = false;

  serviceList = [
    {
      id: 1,
      name: "分期免息",
      checked: false
    },
    {
      id: 2,
      name: "会员专享",
      checked: false
    },
    {
      id: 3,
      name: "货到付款",
      checked: false
    },
    {
      id: 4,
      name: "促销",
      checked: false
    }
  ];
  lowestPrice = "";
  highestPrice = "";

  crowdList = [
    {
      id: 1,
      name: "儿童",
      checked: false
    },
    {
      id: 2,
      name: "成人",
      checked: false
    },
    {
      id: 3,
      name: "通用",
      checked: false
    }
  ];

  addressList = [
    {
      id: 1,
      name: "中国大陆",
      checked: false
    },
    {
      id: 2,
      name: "中国台湾",
      checked: false
    },
    {
      id: 3,
      name: "海外",
      checked: false
    }
  ];

  onTabItem(value) {
    switch (value) {
      case "综合推荐":
        if (this.tabActive != value) {
          this.maskShow = false;
          this.recommendSort = false;
        } else {
          this.maskShow = !this.maskShow;
          this.recommendSort = !this.recommendSort;
        }
        this.tabActive = value;
        break;
      case "好评":
        if (this.tabActive != value) {
          this.maskShow = false;
          this.recommendSort = false;
        } else {
          this.maskShow = !this.maskShow;
          this.recommendSort = !this.recommendSort;
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
    this.recommendSort = false;
  }

  // 服务折扣选中/取消选中
  onServiceCheck(index, checked) {
    this.serviceList[index].checked = !checked;
  }

  // 使用人群选中/取消选中
  onCrowdCheck(index, checked) {
    this.crowdList[index].checked = !checked;
  }

  // 产地选中/取消选中
  onAddressCheck(index, checked) {
    this.addressList[index].checked = !checked;
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
    box-sizing border-box
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
    box-sizing border-box
  .retrieval-list
    display flex
    flex-wrap wrap
    justify-content space-between
    .item
      margin-bottom 20rpx
      width 24%
      padding 12rpx 20rpx
      background #ededed
      border 2rpx solid #ededed
      font-size 24rpx
      border-radius 50rpx
      text-align center
  .retrieval-price-range
    .content
      display flex
      justify-content space-between
    .input
      width 30%
      padding: 4rpx 18rpx !important
    .interval
      margin 4rpx 8rpx 0rpx 8rpx
      color #dadbde
  .retrieval-crowd
    margin-top 20rpx
  .retrieval-gap
    margin 20rpx 0rpx !important
  .retrieval-title
    margin-bottom 20rpx
    font-weight bold
    font-size 26rpx
  .retrieval-active
    background rgba(250, 53, 52, 0.2) !important
    color #fa3534
    border 2rpx solid #fa3534 !important
</style>

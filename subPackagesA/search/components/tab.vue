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
		//- 综合推荐遮罩层
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
		//- 筛选遮罩层
		u-popup(
			:show="popupShow", 
			mode="right",
			zIndex="10090",
			:overlay="true",
			:closeOnClickOverlay="true",
			@close="closePopup", 
			@open="openPopup")
			//- 筛选面板
			view.retrieval-content
				u-gap.retrieval-gap(height="0" bgColor="#ffffff")
				view.retrieval-content-item
					view.retrieval-title 服务/折扣
					view.retrieval-list
						view.item(
							v-for="(item, index) in serviceList",
							:key="index",
							:class="item.checked ? 'retrieval-active' : ''",
							@click="onServiceCheck(index, item.checked)") {{ item.name }}
				u-gap.retrieval-gap(height="10" bgColor="#ededed")
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
				u-gap.retrieval-gap(height="10" bgColor="#ededed")
				view.retrieval-content-item
					view.retrieval-title 品牌
					view.retrieval-list
						view.item(
							v-for="(item, index) in brandList",
							:key="index",
							:class="item.checked ? 'retrieval-active' : ''",
							@click="onBrandCheck(index, item.checked)") {{ item.name }}
				u-gap.retrieval-gap(height="10" bgColor="#ededed")
				view.retrieval-content-item
					view.retrieval-title 发货地
					view.retrieval-list
						view.item(
							v-for="(item, index) in addressList",
							:key="index",
							:class="item.checked ? 'retrieval-active' : ''",
							@click="onAddressCheck(index, item.checked)") {{ item.name }}
				u-gap.retrieval-gap(height="10" bgColor="#ededed")
				view.retrieval-content-item
					view.retrieval-title 适合肤质
					view.retrieval-list
						view.item(
							v-for="(item, index) in skinList",
							:key="index",
							:class="item.checked ? 'retrieval-active' : ''",
							@click="onSkinCheck(index, item.checked)") {{ item.name }}
				u-gap.retrieval-gap(height="10" bgColor="#ededed")
				view.retrieval-content-item
					view.retrieval-title 适用人群
					view.retrieval-list
						view.item(
							v-for="(item, index) in crowdList",
							:key="index",
							:class="item.checked ? 'retrieval-active' : ''",
							@click="onCrowdCheck(index, item.checked)") {{ item.name }}
				u-gap.retrieval-gap(height="10" bgColor="#ededed")
				view.retrieval-content-item
					view.retrieval-title 类别
					view.retrieval-list
						view.item(
							v-for="(item, index) in categoryList",
							:key="index",
							:class="item.checked ? 'retrieval-active' : ''",
							@click="onCategoryCheck(index, item.checked)") {{ item.name }}
			//- 筛选确认
			view.retrieval-btn
				u-button(shape="circle" text="重置" @click="onReset")
				u-button(color="#fa3534" shape="circle" text="确定(10+件商品)" @click="onConfirm")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  components: {},
	options: { styleIsolation: 'shared', addGlobalClass: true } // 解决小程序/deep/不生效问题
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

  popupShow = false;
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
	brandList = [
	  {
	    id: 1,
	    name: "欧莱雅",
	    checked: false
	  },
	  {
	    id: 2,
	    name: "自然堂",
	    checked: false
	  },
	  {
	    id: 3,
	    name: "海蓝之谜",
	    checked: false
	  },
		{
		  id: 4,
		  name: "雅诗兰黛",
		  checked: false
		},
		{
		  id: 5,
		  name: "韩束",
		  checked: false
		},
		{
		  id: 4,
		  name: "SK-II",
		  checked: false
		},
		{
		  id: 5,
		  name: "百雀羚",
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
	skinList = [
	  {
	    id: 1,
	    name: "干性",
	    checked: false
	  },
	  {
	    id: 2,
	    name: "中性",
	    checked: false
	  },
	  {
	    id: 3,
	    name: "油性",
	    checked: false
	  },
		{
		  id: 2,
		  name: "混合性",
		  checked: false
		},
		{
		  id: 3,
		  name: "敏感性",
		  checked: false
		}
	];
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
	categoryList = [
    {
      id: 1,
      name: "爽肤水",
      checked: false
    },
    {
      id: 2,
      name: "精粹水",
      checked: false
    },
    {
      id: 3,
      name: "喷雾",
      checked: false
    },
		{
		  id: 4,
		  name: "精华乳/油",
		  checked: false
		},
		{
		  id: 5,
		  name: "眼霜",
		  checked: false
		},
		{
		  id: 6,
		  name: "乳液",
		  checked: false
		},
		{
		  id: 7,
		  name: "精华水",
		  checked: false
		},
		{
		  id: 8,
		  name: "眼部精华",
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
        this.maskShow = false;
        this.popupShow = true;
        this.tabActive = value;
        break;
      default:
        break;
    }
  }

  openPopup() {
    console.log("open");
    this.$emit("searchResultChange", false);
  }
  closePopup() {
    this.popupShow = false;
    this.$emit("searchResultChange", true);
    console.log("close");
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
	
	// 品牌选中/取消选中
	onBrandCheck(index, checked) {
    this.brandList[index].checked = !checked;
  }
	
	// 发货地选中/取消选中
	onAddressCheck(index, checked) {
	  this.addressList[index].checked = !checked;
	}
	
	// 适合肤质选中/取消选中
	onSkinCheck(index, checked) {
    this.skinList[index].checked = !checked;
  }
	

  // 适用人群选中/取消选中
  onCrowdCheck(index, checked) {
    this.crowdList[index].checked = !checked;
  }

	// 类别选中/取消选中
	onCategoryCheck(index, checked) {
	  this.categoryList[index].checked = !checked;
	}
  
	
	// 重置
	onReset() {
		this.serviceList.forEach(item => {
			item.checked = false;
		})
		this.brandList.forEach(item => {
			item.checked = false;
		})
		this.addressList.forEach(item => {
			item.checked = false;
		})
		this.skinList.forEach(item => {
			item.checked = false;
		})
		this.crowdList.forEach(item => {
			item.checked = false;
		})
		this.categoryList.forEach(item => {
			item.checked = false;
		})
	}
	
	// 确定
	onConfirm() {
		this.popupShow = false;
		this.$emit("searchResultChange", true);
		console.log("close");
	}
}
</script>

<style lang="scss" scoped>
.andry-search-tab {
  .tab {
    position: relative;
    display: flex;
    height: 88rpx;
    line-height: 88rpx;
    background: #ffffff;
    z-index: 10080;
    .item {
      width: 25%;
      text-align: center;
      font-size: 26rpx;
		}
	}
  .active {
    font-weight: bold;
	}
  .recommend-content {
    position: absolute;
    width: 100%;
    padding: 0rpx 40rpx 20rpx 40rpx;
    background: #ffffff;
    z-index: 10080;
    box-sizing: border-box;
	}
  .recommend {
    margin-bottom: 20rpx;
    font-size: 26rpx;
	}
  .recommend-active {
    color: #fa3534;
	}
  .recommend-check {
    margin-right: 20rpx;
	}
  .arrow-down {
    position: relative;
    top: 22rpx;
    left: 16rpx;
    width: 0rpx;
    height: 0rpx;
    border: 8rpx solid transparent;
    border-top-color: #000000;
	}
  .arrow-up {
    position: relative;
    top: -20rpx;
    left: 16rpx;
    width: 0rpx;
    height: 0rpx;
    border: 8rpx solid transparent;
    border-bottom-color: #000000;
	}
  .retrieval-content {
    position: relative;
    background: #ffffff;
    z-index: 10090;
    box-sizing: border-box;
		display: flex;
		flex-direction: column;
		flex: 1;
		overflow-y: scroll;
	}
	.retrieval-content-item, .retrieval-price-range {
		padding: 20rpx 28rpx;
		border-radius: 8rpx;
	}
  .retrieval-list {
    display: flex;
    flex-wrap: wrap;
    .item {
      margin: 20rpx 10rpx 0rpx 0rpx;
      width: 24%;
      padding: 12rpx 20rpx;
      background: #ededed;
      border: 2rpx solid #ededed;
      font-size: 24rpx;
      border-radius: 50rpx;
      text-align: center;
		}
		.item:nth-child(3n) {
			margin-right: 0rpx;
		}
	}
  .retrieval-price-range {
    .content {
      display: flex;
      justify-content: space-between;
		}
    .input {
      width: 30%;
      padding: 4rpx 18rpx !important;
		}
    .interval {
      margin: 4rpx 8rpx 0rpx 8rpx;
      color: #dadbde;
		}
	}
  .retrieval-title {
    margin-bottom: 20rpx;
    font-weight: bold;
    font-size: 26rpx;
	}
  .retrieval-active {
    background: rgba(250, 53, 52, 0.2) !important;
    color: #fa3534;
    border: 2rpx solid #fa3534 !important;
	}
  .u-popup {
    position: relative;
    z-index: 10090;
	}
	.retrieval-btn {
		height: 88rpx;
		display: flex;
		justify-content: center;
		padding: 12rpx 28rpx;
		border-top: 2rpx solid #ededed;
	}
	
}
</style>
<style lang="scss">
.u-popup {
	/deep/ .u-popup__content {
		max-width: 80vw !important;
		overflow-y: scroll;
	}
}
</style>

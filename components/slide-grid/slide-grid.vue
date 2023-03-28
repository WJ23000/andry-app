<template lang="pug">
	view.slide-grid
		swiper.grid-warp( 
			:indicator-dots="true",
			:indicatorActiveColor="indicatorActiveColor")
			swiper-item
				u-grid(:col="4", :border="false")
					u-grid-item.grid-item(
						v-for="(item, index) in oneList", 
						:index="index", 
						:key="index",
						@click="onGridItem(item)")
						image(:src="item.image" :size="46")
						text.grid-text {{ item.name }}
			swiper-item
				u-grid(:col="4", :border="false")
					u-grid-item.grid-item(
						v-for="(item, index) in twoList", 
						:index="index + 9", 
						:key="index",
						@click="onGridItem(item)")
						image(:src="item.image" :size="46")
						text.grid-text {{ item.name }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
  components: {}
})
export default class SlideGrid extends Vue {
  @Prop({
    default: () => {
      return [];
    }
  })
  gridList!: any;
  oneList = [];
  twoList = [];

  indicatorActiveColor = "#fa3534";

  created() {
    this.oneList = this.gridList.slice(0, 8);
    this.twoList = this.gridList.slice(8, 16);
  }

  onGridItem(item) {
    console.log("点击", item);
  }
}
</script>

<style lang="scss" scoped>
.grid-warp {
  height: 320rpx;
}
image {
  width: 80rpx;
  height: 80rpx;
}
.grid-item {
  height: 140rpx;
  /deep/ .u-grid-item-box {
    padding: 0rpx !important;
  }
}
.grid-text {
  font-size: 28rpx;
  margin-top: 4rpx;
  color: #5d656b;
}
.indicator-dots {
  display: flex;
  justify-content: center;
  align-items: center;
}
.indicator-dots-item {
  background-color: $bg-color;
  height: 14rpx;
  width: 14rpx;
  border-radius: 20rpx;
  margin: 0rpx 6rpx;
  transition: all 0.5s;
}
.indicator-dots-active {
  width: 24rpx;
  background-color: $color-primary;
}
</style>

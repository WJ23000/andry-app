<template lang="pug">
	view.andry-goods-detail
		view.header
			
		Banner(:bannerList="bannerList")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GOODS_BANNER_DATA } from "@/model";
import Banner from "./components/banner.vue";
@Component({
	components: {
		Banner
	}
})
export default class GoodsDetail extends Vue {
	bannerList = GOODS_BANNER_DATA;
	
	onLoad(option) {
		console.log("url参数", option);
	}
}
</script>

<style lang="scss" scoped>
page {
	background-color: #ededed;
}
.andry-goods-detail {
	// background-color: #f2f2f2;
}
</style>

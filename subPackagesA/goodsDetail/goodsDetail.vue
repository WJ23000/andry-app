<template lang="pug">
	view.andry-goods-detail
		view 商品详情
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
	components: {}
})
export default class GoodsDetail extends Vue {
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

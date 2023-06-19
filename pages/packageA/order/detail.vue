<template lang="pug">
	view.andry-order-detail
		view 订单详情
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
	components: {}
})
export default class OrderDetail extends Vue {
	onLoad(option) {
		console.log("url参数", option);
	}
}
</script>

<style lang="scss" scoped>

</style>

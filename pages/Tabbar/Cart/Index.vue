<template lang="pug">
	view.andry-classify
		view 购物车
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
	components: {}
})
export default class cart extends Vue {
	headerBg = {
		backgroundColor: "#ffffff"
	};
	
	del = true
}
</script>

<style lang="scss" scoped>
.andry-classify {
	.del-btn {
		background: #ffffff;
		font-size: 28rpx;
		border: 0 !important;
		&::after {
			border: 0 !important;
		}
	}
}
</style>

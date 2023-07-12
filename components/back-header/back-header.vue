<template lang="pug">
view.back-header
	view.img
		u-icon(name="arrow-left", size="22", @click="onBackPage")
	text.title {{ title }}
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
	components: {}
})
export default class BackHeader extends Vue {
	@Prop()
	title!: any;
	
	onBackPage() {
		uni.navigateBack({
			delta: 1
		});
	}
}
</script>

<style lang="scss" scoped></style>
<style lang="scss">
.back-header {
	position: fixed;
	width: 100%;
	/* #ifdef H5 */
	top: 0;
	/* #endif */
	/* #ifdef MP || APP  */
	top: 25px;
	/* #endif */
	z-index: 100;
	background-color: #ffffff;
	display: flex;
	align-items: center;
	height: 44px;
	font-size: 36rpx;
	.img {
		display: flex;
		justify-content: center;
		width: 44px;
		height: 44px;
	}
	.title {
		display: flex;
		/* #ifdef MP */
		justify-content: flex-start;
		/* #endif */
		/* #ifdef H5 || APP-PLUS */
		justify-content: center;
		/* #endif */
		flex: 0 0 78%;
	}
}
</style>

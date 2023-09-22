<template lang="pug">
view.back-top
	u-back-top(
		:scroll-top="top", 
		right="12", 
		z-index="1000",
		@click="onBackTop")
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
	components: {}
})
export default class BackTop extends Vue {
	@Prop()
	top!: any;
	
	onBackTop() {
		this.$emit("backTop")
	}
}
</script>

<style lang="scss" scoped></style>
<style lang="scss">
.back-top {
	/deep/ .u-back-top {
		background-color: #ffffff;
		box-shadow: 0 0 6px #ededed;
	}
}
</style>

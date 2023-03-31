<template lang="pug">
	u-back-top(
		:scroll-top="top", 
		right="12", 
		z-index="1000")
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
	components: {}
})
export default class BackTop extends Vue {
	@Prop()
	top!: any;
}
</script>

<style lang="scss" scoped>
	/deep/ .u-back-top {
		background-color: #ffffff;
		box-shadow: 0 0 6px #ededed;
	}
</style>

<template lang="pug">
	u-back-top(
		:scroll-top="top", 
		right="12", 
		z-index="1000")
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
	components: {},
	options: { styleIsolation: 'shared', addGlobalClass: true } // 解决小程序::v-deep不生效问题
})
export default class BackTop extends Vue {
	@Prop()
	top!: any;
}
</script>

<style lang="scss" scoped>
	
</style>
<style lang="scss">
	/deep/ .u-back-top {
		background-color: #ffffff !important;
		box-shadow: 0 0 6px #ededed !important;
	}
</style>

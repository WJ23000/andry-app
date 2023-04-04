<template lang="pug">
	view.back-top
		u-back-top(
			:scroll-top="top", 
			right="12", 
			z-index="1000")
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
	components: {},
	options: { styleIsolation: 'shared', addGlobalClass: true } // 解决小程序/deep/不生效问题
})
export default class BackTop extends Vue {
	@Prop()
	top!: any;
}
</script>

<style lang="scss" scoped>
	
</style>
<style lang="scss">
.back-top {
	/deep/ .u-back-top {
		background-color: #ffffff;
		box-shadow: 0 0 6px #ededed;
	}
}
</style>

<template lang="pug">
<!-- #ifdef APP-PLUS -->  
view.status_bar(:style="{background: bgColor}")
<!-- #endif --> 
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component({
	components: {}
})
export default class StatusBar extends Vue {
	@Prop({ default: "#ffffff" })
	bgColor!: any;
}
</script>

<style lang="scss" scoped>
.status_bar {
	position: fixed;
	top: 0;
	width: 100%;
	height: var(--status-bar-height); // 状态栏高度
	z-index: 999;
}
</style>

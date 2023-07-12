<template lang="pug">
view.status_bar
		view.top_view  
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
	components: {}
})
export default class StatusBar extends Vue {}
</script>

<style lang="scss" scoped>
.status_bar {
	position: fixed;
	top: 0;
	z-index: 100;
	width: 100%;
	height: var(--status-bar-height); // 状态栏高度
	background: linear-gradient(
		to right,
		#2c8fe1,
		#3ca5e6,
		#47b5e9
	); // 状态栏背景颜色
}
</style>

<template lang="pug">
	view.swiper
		u-swiper(
			:list="bannerList",
			keyName="image",
			indicator,
			indicatorMode="line",
			circular)
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
@Component({
	components: {}
})
export default class Slide extends Vue {
	@Prop()
	bannerList!: any;
}
</script>

<style lang="scss" scoped>
.slideshow {
}
</style>

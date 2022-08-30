<template lang="pug">
	u-back-top(:scroll-top="top")
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

<style lang="scss" scoped></style>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
	mpType: 'app',
	onLaunch() {
		console.log('App Launch')
		plus.navigator.closeSplashscreen();
	},
	onShow() {
		console.log('App Show')
	},
	onHide() {
		console.log('App Hide')
	}
});
</script>

<style lang="scss">
/*公共css */
@import "uview-ui/index.scss";
</style>

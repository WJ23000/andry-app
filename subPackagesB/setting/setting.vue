<template lang="pug">
	view.andry-setting
		u-cell-group
			u-cell(title="地址管理", isLink)
			u-cell(title="账户与安全", isLink)
			u-cell(title="支付设置", isLink)
			u-cell(title="发票抬头管理", value="添加增票资质", isLink)
			u-cell(title="通用", isLink)
		u-gap(height="10", bgColor="#ededed")
		u-cell-group
			u-cell(title="PLUS会员", isLink)
			u-cell(title="功能反馈", isLink)
			u-cell(title="关于APP", value="发现新版本", isLink)
			u-cell(title="隐私政策", value="添加增票资质", isLink)
			u-cell(title="个人信息收集清单", isLink)
			u-cell(title="第三方共享个人信息清单", isLink)
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
	components: {}
})
export default class Setting extends Vue {}
</script>

<style lang="scss" scoped>
page {
	// background-color: #ededed;
}
.andry-setting {
	// background-color: #f2f2f2;
}
</style>

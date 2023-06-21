<template lang="pug">
view.andry-setting
	u-cell-group
		u-cell(
			v-for="(item,index) in otherCellList",
			:key="index",
			:title="item.title",
			:value="item.value",
			:isLink="item.isLink",
			@click="toNextPage(item.url)")
	u-gap(height="10", bgColor="#ededed")
	u-cell-group
		u-cell(
			v-for="(item,index) in otherCellListTwo",
			:key="index",
			:title="item.title",
			:value="item.value",
			:isLink="item.isLink",
			@click="toNextPage(item.url)")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
	components: {}
})
export default class Setting extends Vue {
	otherCellList = [
		{
			title: "账户与安全",
			value: "",
			isLink: true,
			url: ""
		},
		{
			title: "支付设置",
			value: "",
			isLink: true,
			url: ""
		},
		{
			title: "发票抬头管理",
			value: "添加增票资质",
			isLink: true,
			url: ""
		},
		{
			title: "通用",
			value: "",
			isLink: true,
			url: ""
		}
	];

	otherCellListTwo = [
		{
			title: "PLUS会员",
			value: "",
			isLink: true,
			url: ""
		},
		{
			title: "功能反馈",
			value: "",
			isLink: true,
			url: "/pages/packageB/feedBack/feedBack"
		},
		{
			title: "关于APP",
			value: "发现新版本",
			isLink: true,
			url: ""
		},
		{
			title: "隐私政策",
			value: "",
			isLink: true,
			url: ""
		},
		{
			title: "个人信息收集清单",
			value: "",
			isLink: true,
			url: ""
		},
		{
			title: "第三方共享个人信息清单",
			value: "",
			isLink: true,
			url: ""
		}
	];

	// 去往其他模块
	toNextPage(url) {
		uni.navigateTo({
			url
		});
	}
}
</script>

<style lang="scss" scoped>
.andry-setting {
	// background-color: #f2f2f2;
}
</style>

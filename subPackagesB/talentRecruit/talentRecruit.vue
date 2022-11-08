<template lang="pug">
	view.andry-feedback
		view.top
			view.item(@click="showJobPicker")
				view.left 工作岗位
				input(v-model="form.job", disabled, type="text", placeholder-class="line", placeholder="请选择投递岗位")
			view.item
				view.left 联系方式
				input(v-model="form.contactWay", type="number", placeholder-class="line", placeholder="请填写联系方式")
		view.addSite(@click="onSubmitFeedback")
			view.add
				text 提交
		u-picker(
			ref="uPicker", 
			mode="selector", 
			v-model="show",
			:range="jobList",
			range-key="label",
			@confirm="checkJob")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
	components: {}
})
export default class TalentRecruit extends Vue {
	show = false
	jobList = [
		{
			label: 'web前端开发工程师',
			value: 1
		},
		{
			label: 'java开发工程师',
			value: 2
		},
		{
			label: '算法工程师',
			value: 3
		},
		{
			label: 'python工程师',
			value: 4
		}
	]
	
	form = {
		job: "",
		contactWay:""
	};

	onLoad(option) {
		console.log("url参数", option);
	}
	
	// 显示岗位
	showJobPicker() {
		this.show = true;
	}
	// 选择岗位
	checkJob(option) {
		console.log("选中", option);
		const index = option[0];
		this.form.job = this.jobList[index].label;
	}

	// 提交
	onSubmitFeedback() {
		console.log("表单内容", this.form)
		uni.showToast({
			title: "保存",
			icon: "none"
		});
	}
}
</script>

<style lang="scss" scoped>
/deep/ .line {
	color: $u-light-color;
	font-size: 28rpx;
}
.andry-feedback {
	background-color: #f2f2f2;
	.top {
		background-color: #ffffff;
		border-top: solid 2rpx $u-border-color;
		padding: 24rpx;
		.item {
			display: flex;
			font-size: 32rpx;
			line-height: 100rpx;
			align-items: center;
			border-bottom: solid 2rpx $u-border-color;
			.left {
				width: 180rpx;
			}
			input {
				text-align: left;
				flex: 1
			}
			textarea {
				text-align: left;
				flex: 1
			}
		}
		.describe {
			textarea {
				height: 150rpx;
				line-height: 60rpx;
				margin: 20rpx auto;
			}
		}
	}
	.addSite {
		display: flex;
		justify-content: space-around;
		width: 702rpx;
		line-height: 88rpx;
		position: absolute;
		bottom: 30rpx;
		left: 24rpx;
		background-color: #fa3534;
		border-radius: 60rpx;
		font-size: 30rpx;
		.add {
			display: flex;
			align-items: center;
			color: #ffffff;
			.icon {
				margin-right: 10rpx;
			}
		}
	}
}
</style>

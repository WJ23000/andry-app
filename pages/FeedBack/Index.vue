<template lang="pug">
	view.andry-feedback
		view.top
			view.item
				view.left 问题
				input(v-model="form.reason", type="text", placeholder-class="line", placeholder="请填写问题")
			view.item.describe
				view.left 描述
				textarea(v-model="form.describe", type="text", placeholder-class="line", placeholder="请填写描述")
			view.item
				view.left 手机号
				input(v-model="form.phone", type="number", placeholder-class="line", placeholder="请填写手机号")
		view.addSite(@click="onSubmitFeedback")
			view.add
				text 提交
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
	components: {}
})
export default class FeedBack extends Vue {
	
	form = {
		reason: "",
		describe: "",
		phone:""
	};

	onLoad(option) {
		console.log("url参数", option);
	}

	// 提交意见反馈
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
				width: 140rpx;
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

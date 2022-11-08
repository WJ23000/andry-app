<template lang="pug">
	view.andry-address-add
		view.top
			view.item
				view.left 收货人
				input(v-model="form.realName", type="text", placeholder-class="line", placeholder="请填写收货人姓名")
			view.item
				view.left 手机号码
				input(v-model="form.phone", type="number", placeholder-class="line", placeholder="请填写收货人手机号")
			view.item(@click="showRegionPicker")
				view.left 所在地区
				input(v-model="form.address", disabled, type="text", placeholder-class="line", placeholder="省市区县、乡镇等")
			view.item.address
				view.left 详细地址
				textarea(v-model="form.inAddress", type="text", placeholder-class="line", placeholder="街道、楼牌等")
		view.bottom
			view.tag
				view.left 标签
				view.right
					text.tags(
						:class="{ red: form.tagCheck == item}",
						v-for="(item,index) in tagsList",
						:key="index",
						@click="checkTags(item)") {{ item }}
					<!-- view.tags.plus
						u-icon(size="22", name="plus") -->
			view.default
				view.left
					view.set 设置默认地址
				view.right
					switch(v-model="form.isDefault", color="red", @change="setDefault") 
		view.addSite(@click="onSaveAdd")
			view.add
				text 保存
		u-picker(
			ref="uPicker", 
			mode="region",
			v-model="show",
			@confirm="checkAddress")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
	components: {}
})
export default class AddressAdd extends Vue {
	show = false;

	form = {
		realName: "",
		phone: "",
		address: "",
		inAddress: "",
		tagCheck: "",
		isDefault: false
	};

	tagsList = ["家", "公司", "学校"];

	onLoad(option) {
		console.log("url参数", option);
		this.setTitle(option.id)
	}
	
	setTitle(id){
		uni.setNavigationBarTitle({
			title: id ? "修改地址" : "添加地址"
		});
	}


	// 切换标签
	checkTags(value) {
		this.form.tagCheck = value;
	}

	// 设为默认
	setDefault(e) {
		this.form.isDefault = e.target.value;
	}

	// 显示省市区
	showRegionPicker() {
		this.show = true;
	}
	// 选择省市区
	checkAddress(option) {
		console.log("选中", option);
		this.form.address =
			option.province.label + " " + option.city.label + " " + option.area.label;
	}

	// 保存
	onSaveAdd() {
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
.andry-address-add {
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
		.item:last-child {
			border-bottom: none;
		}

		.address {
			textarea {
				height: 150rpx;
				line-height: 60rpx;
				margin: 20rpx auto;
			}
		}
		.site-clipboard {
			padding-right: 40rpx;
			textarea {
				// width: 100%;
				height: 150rpx;
				background-color: #f7f7f7;
				line-height: 60rpx;
				margin: 40rpx auto;
				padding: 20rpx;
			}
			.clipboard {
				display: flex;
				justify-content: center;
				align-items: center;
				font-size: 26rpx;
				color: $u-tips-color;
				height: 80rpx;
				.icon {
					margin-top: 6rpx;
					margin-left: 10rpx;
				}
			}
		}
	}
	.bottom {
		margin-top: 20rpx;
		padding: 24rpx;
		background-color: #ffffff;
		font-size: 28rpx;
		.tag {
			display: flex;
			.left {
				width: 180rpx;
				font-size: 34rpx;
			}
			.right {
				display: flex;
				flex-wrap: wrap;
				.tags {
					width: 140rpx;
					padding: 16rpx 8rpx;
					border: solid 2rpx $u-border-color;
					text-align: center;
					border-radius: 50rpx;
					margin: 0 10rpx 20rpx;
					display: flex;
					font-size: 28rpx;
					align-items: center;
					justify-content: center;
					color: $u-content-color;
					line-height: 1;
					&:first-child {
						margin: 0 10rpx 20rpx 0rpx;
					}
				}
				.red {
					background-color: #fa3534;
					color: #ffffff;
				}
				.plus {
					//padding: 10rpx 0;
				}
			}
		}
		.default {
			margin-top: 50rpx;
			display: flex;
			justify-content: space-between;
			line-height: 64rpx;
			.left {
				font-size: 34rpx;
			}
			.tips {
				font-size: 24rpx;
			}
			.right {
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

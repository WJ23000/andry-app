<template lang="pug">
	view.andry-address-list
		view.item(
			v-for="(item, index) in siteList", 
			:key="item.id",
			@longpress="onSetDefault(item.id)")
			view.top
				view.name {{ item.name }}
				view.phone {{ item.phone }}
				view.tag
					text(
						v-for="(tag, index) in item.tag"
						:key="index"
						:class="{ red: tag.tagText == '默认' }") {{ tag.tagText }}
			view.bottom
				text {{ item.site }}
				u-icon(name="edit-pen", :size="40", color="#999999", @click="onEditAddress(item)")
		view.addSite(@click="onEditAddress('')")
			view.add
				u-icon(
					name="plus",
					color="#ffffff",
					class="icon",
					:size="30")
				text 添加新地址
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
@Component({
	components: {}
})
export default class AddressList extends Vue {
	siteList: any = [];

	onLoad() {
		this.getData();
	}

	getData() {
		this.siteList = [
			{
				id: 1,
				name: "游X",
				phone: "183****5523",
				tag: [
					{
						tagText: "默认"
					},
					{
						tagText: "家"
					}
				],
				site: "广东省深圳市宝安区 自由路66号"
			},
			{
				id: 2,
				name: "李XX",
				phone: "183****5555",
				tag: [
					{
						tagText: "公司"
					}
				],
				site: "广东省深圳市宝安区 翻身路xx号"
			},
			{
				id: 3,
				name: "王YY",
				phone: "153****5555",
				tag: [],
				site: "广东省深圳市宝安区 平安路13号"
			}
		];
	}

	// 设为默认
	onSetDefault(id) {
		console.log("设为默认", id);
		uni.showModal({
			content: "设为默认地址",
			success: function(res) {
				if (res.confirm) {
					console.log("用户点击确定");
				} else if (res.cancel) {
					console.log("用户点击取消");
				}
			}
		});
	}

	// 添加/编辑地址
	onEditAddress(item) {
		const addressId = item.id ? item.id : "";
		uni.navigateTo({
			url: `/pages/Address/Add?id=${addressId}`
		});
	}
}
</script>

<style lang="scss" scoped>
.andry-address-list {
	.item {
		padding: 40rpx 24rpx;
		border-bottom: 2rpx solid $u-border-color;
		.top {
			display: flex;
			font-weight: bold;
			font-size: 34rpx;
			.phone {
				margin-left: 60rpx;
			}
			.tag {
				display: flex;
				font-weight: normal;
				align-items: center;
				text {
					display: block;
					width: 60rpx;
					height: 34rpx;
					line-height: 34rpx;
					color: #ffffff;
					font-size: 20rpx;
					border-radius: 6rpx;
					text-align: center;
					margin-left: 30rpx;
					background-color: #2979ff;
				}
				.red {
					background-color: #fa3534;
				}
			}
		}
		.bottom {
			display: flex;
			margin-top: 20rpx;
			font-size: 28rpx;
			justify-content: space-between;
			color: #999999;
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

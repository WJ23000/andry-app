<template lang="pug">
	view.andry-mine
		view.search-sticky(v-if="top > 44")
			u-navbar.mine-header(
				title="我的",
				:autoBack="false")
				view.cart-right(slot="left")
					u-avatar(:src="userInfo.userImage", size="24")
				view.cart-right(slot="right")
					u-icon(name="setting", size="20", @click="onSettingClick")
		view.header
			view.user-info
				u-avatar(:src="userInfo.userImage", size="50")
				view.account.ml2
					view.username {{ userInfo.username }}
					view.phone {{ userInfo.phone }}
		view.wrap
			view.order-grid
				u-cell.order-grid-other(title="订单", value="全部订单", :isLink="true", :clickable="true")
				u-grid(:col="5", :border="false")
					u-grid-item(v-for="(item, index) in orderGridList", :index="index", :key="index", @click="toOrder(item.id)")
						image.grid-image(:src="item.image")
						text.grid-text {{ item.name }}
			view.other-grid
				u-scroll-list(indicatorColor="#fff0f0", indicatorActiveColor="#f56c6c")
					view.scroll-list__goods-item(
						v-for="(item, index) in otherGridList", 
						:key="index",
						@click="toNextPage(item.name)")
						image.scroll-list__goods-item__image(:src="item.image")
						text.scroll-list__goods-item__text {{ item.name }}
			view.other-grid-two
				u-scroll-list(indicatorColor="#fff0f0", indicatorActiveColor="#f56c6c")
					view.scroll-list__goods-item(
						v-for="(item, index) in otherGridListTwo", 
						:key="index",
						@click="toNextPage(item.name)")
						image.scroll-list__goods-item__image(:src="item.image")
						text.scroll-list__goods-item__text {{ item.name }}
			u-divider(text="猜您喜欢")
			goods-list(
				:leftHeight="leftHeight",
				:rightHeight="rightHeight",
				:leftList="leftList",
				:rightList="rightList",
				:loadTxt="ajax.loadTxt",
				@onHeight="onHeight",
				@onClick="onClick")
			back-top(:top="top")
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { GOODS_DATA } from "@/model";
@Component({
	components: {}
})
export default class Mine extends Vue {
	top = 0;
	userInfo = {
		userImage: require("@/static/user.png"),
		username: "Baymax",
		phone: "180XXXX9388"
	};
	orderGridList = [
		{ id: 0, name: "待付款", image: require("@/static/mine/pay.png") },
		{ id: 1, name: "待发货", image: require("@/static/mine/deliver-goods.png") },
		{ id: 2, name: "待收货", image: require("@/static/mine/the-goods.png") },
		{ id: 3, name: "待评价", image: require("@/static/mine/evaluate.png") },
		{ id: 4, name: "售后/退款", image: require("@/static/mine/after-sale.png") }
	];
	otherGridList = [
		{ name: "我的钱包", image: require("@/static/mine/wallet.png") },
		{ name: "我的收藏", image: require("@/static/mine/collection.png") },
		{ name: "收货地址", image: require("@/static/mine/delivery-address.png") },
		{ name: "生活服务", image: require("@/static/mine/life-service.png") },
		{ name: "理财服务", image: require("@/static/mine/finance.png") },
		{ name: "优惠券", image: require("@/static/mine/coupons.png") },
		{ name: "更多功能", image: require("@/static/mine/other.png") },
	];
	otherGridListTwo = [
		{ name: "联系客服", image: require("@/static/mine/customer-service.png") },
		{ name: "车辆服务", image: require("@/static/mine/vehicle-service.png") },
		{ name: "美食服务", image: require("@/static/mine/food-service.png") },
		{ name: "积分服务", image: require("@/static/mine/integral.png") },
		{ name: "帮助中心", image: require("@/static/mine/help.png") },
		{ name: "关于", image: require("@/static/mine/about.png") },
	];
	// 商品推荐
	leftHeight = 0;
	rightHeight = 0;
	leftList: any[] = [];
	rightList: any[] = [];
	ajax = {
		// 是否可以加载
		load: true,
		// 加载中提示文字
		loadTxt: "",
		// 每页的请求条件
		rows: 10,
		// 页码
		page: 1
	};
	
	onLoad() {
		this.getList();
	}

	// 监听页面滚动(一键置顶，tabs吸顶)
	onPageScroll(e) {
	  this.top = e.scrollTop;
	}

	// 查看全部订单
	toOrder(id) {
		const current = id ? id : 0;
		uni.navigateTo({
			url: `/subPackagesA/order/list?current=${current}`
		});
	}

	// 去往其他模块
	toNextPage(name) {
		switch (name) {
			case "我的收藏":
				uni.navigateTo({
					url: "/subPackagesA/collection/collection"
				});
				break;
			case "收货地址":
				uni.navigateTo({
					url: "/subPackagesA/address/list"
				});
				break;
			case "关注公众号":
				// this.wechatShow = true;
				break;
			default:
				break;
		}
	}
	
	// 账户设置
	onSettingClick() {
		uni.navigateTo({
			url: "/subPackagesB/setting/setting"
		});
	}
	
	// 商品推荐列表
	// 触底触发
	onReachBottom() {
		this.getList();
	}
	// 下拉刷新
	onPullDownRefresh() {
		console.log("下拉刷新");
		// 正常情况下接口返回应该很会很快。故意延迟调用，让用户有在刷新的体验感
		setTimeout(() => {
			this.ajax.page = 1;
			this.leftHeight = 0;
			this.rightHeight = 0;
			this.ajax.load = true;
			this.getList();
		}, 800);
	}
	// 监听高度变化
	onHeight(height, tag) {
		if (tag == "left") {
			this.leftHeight += height;
		} else {
			this.rightHeight += height;
		}
	}
	// 组件点击事件
	onGoodsClick(index, tag) {
		console.log(index, tag);
		// 对应的数据
		if (tag == "left") {
			console.log(this.leftList[index]);
		} else {
			console.log(this.rightList[index]);
		}
		let direction = {
			left: "左",
			right: "右"
		};
		uni.showToast({
			title: `${direction[tag]}侧列表第${index + 1}个被点击`,
			icon: "none"
		});
	}
	// 获取数据
	getList() {
		/*
			无真实数据，当前由 setTimeout 模拟异步请求、
			自行替换 请求方法将数据 传入 addList() 方法中
			自行解决数据格式，自行修改组件内布局和内容绑定
		*/
		if (!this.ajax.load) {
			return;
		}
		this.ajax.load = false;
		this.ajax.loadTxt = "加载中";
	
		setTimeout(() => {
			// 生成随机数方法
			let random = (min = 0, max) => {
				return Math.floor(Math.random() * max) + min;
			};
	
			let res: any = [];
			GOODS_DATA.forEach(item => {
				const price = random(9, 9999) + Math.random();
				item.money = price.toFixed(2);
			});
			this.addList(GOODS_DATA);
		}, 300);
	}
	addList(res) {
		// 获取到的数据，请注意数据结构
		if (!res || res.length < 1) {
			this.ajax.loadTxt = "没有更多了";
			return;
		}
	
		// 左右列表高度的差
		let differ = this.leftHeight - this.rightHeight;
		// 计算差值，用于确定优先插入那一边
		let differVal = 0;
	
		// 初始化左右列表的数据
		let i = differ > 0 ? 1 : 0;
	
		let [left, right]: any = [[], []];
	
		// 获取插入的方向
		let getDirection = index => {
			/* 左侧高度大于右侧超过 600px 时，则前3条数据都插入到右边 */
			if (differ >= 600 && index < 3) {
				differVal = 1;
				return "right";
			}
	
			/* 右侧高度大于左侧超过 600px 时，则前3条数据都插入到左边 */
			if (differ <= -600 && index < 3) {
				differVal = -1;
				return "left";
			}
	
			/* 左侧高度大于右侧超过 350px 时，则前2条数据都插入到右边 */
			if (differ >= 350 && index < 2) {
				return "right";
			}
			/* 右侧高度大于左侧超过 350px 时，则前2条数据都插入到左边 */
			if (differ <= -350 && index < 2) {
				differVal = -1;
				return "left";
			}
	
			/* 当前数据序号为偶数时，则插入到左边 */
			if ((i + differVal) % 2 == 0) {
				return "left";
			} else {
				/* 当前数据序号为奇数时，则插入到右边 */
				return "right";
			}
		};
	
		// 将数据源分为左右两个列表，容错差值请自行根据项目中的数据情况调节
		res.forEach((item, index) => {
			if (getDirection(index) == "left") {
				//console.log(`差值：${differ},方向：left，序号${index}`)
				left.push(item);
			} else {
				//console.log(`差值：${differ},方向：right，序号${index}`)
				right.push(item);
			}
			i++;
		});
	
		// 将左右列表的数据插入，第一页时则覆盖
		if (this.ajax.page == 1) {
			this.leftList = left;
			this.rightList = right;
			uni.stopPullDownRefresh();
		} else {
			this.leftList = [...this.leftList, ...left];
			this.rightList = [...this.rightList, ...right];
		}
	
		this.ajax.load = true;
		this.ajax.loadTxt = "上拉加载更多";
		this.ajax.page++;
	}
}
</script>

<style lang="scss" scoped>
page {
	background-color: #ededed;
}
.andry-mine {
	.header {
		background-image: $andry-bg-image;
		background-size: cover;
		padding: 0rpx 20rpx;
		.user-info {
			display: flex;
			align-items: center;
			height: 280rpx;
		}
		.account {
			display: flex;
			flex-direction: column;
			margin-left: 24rpx;
		}
		.account > .username {
			font-size: 36rpx;
		}
		.account > .phone {
			margin-top: 8rpx;
			font-size: 28rpx;
		}
	}
	.search-sticky {
		position: fixed;
		top: 0;
		width: 100%;
		background: #ffffff;
		padding: 12rpx 24rpx;
		z-index: 1000;
		box-sizing: border-box;
	}
	.wrap {
		margin-top: -84rpx;
		padding: 20rpx 8rpx;
		.order-grid {
			margin: 16rpx 10rpx;
			border-radius: 8rpx;
			background: #ffffff;
			color: #5d656b;
		}
		.grid-image {
			width: 100rpx;
			height: 100rpx;
		}
		.grid-text {
			font-size: 24rpx;
			padding-bottom: 28rpx;
		}
		.u-grid {
			padding: 28rpx 28rpx 0rpx 28rpx;
		}
		.other-grid, .other-grid-two {
			margin: 16rpx 10rpx;
			padding: 24rpx 28rpx;
			border-radius: 8rpx;
			background: #ffffff;
			color: #5d656b;
		}
		.scroll-list {
			@include flex(column);
			&__goods-item {
				margin-right: 20rpx;
				text-align: center;
				&__image {
					width: 100rpx;
					height: 100rpx;
					border-radius: 8rpx;
				}
				&__text {
					display: inline-block;
					text-align: center;
					font-size: 24rpx;
					margin-top: 10rpx;
					width: 120rpx;
				}
			}
		}
		.u-scroll-list {
			padding-bottom: 0rpx;
		}
	}
}
/deep/ .u-status-bar {
  display: none !important;
}
</style>

<template lang="pug">
	view.andry-mine
		view.search-sticky(v-if="top > 44")
			u-navbar.cart-header(
				title="我的",
				:autoBack="false")
				view.cart-right(slot="left")
					u-avatar(:src="userInfo.userImage", size="24")
				view.cart-right(slot="right")
					u-icon(name="setting", size="20")
		view.header
			view.user-info
				u-avatar(:src="userInfo.userImage", size="50")
				view.account.ml2
					view.username {{ userInfo.username }}
					view.phone {{ userInfo.phone }}
		view.wrap
			view.order-grid
				u-cell.order-grid-other(title="订单", value="查看更多", :isLink="true", :clickable="true")
				u-grid(:col="4", :border="false")
					u-grid-item(v-for="(item, index) in orderGridList", :index="index", :key="index", @click="toOrder(item.id)")
						u-icon(:name="item.icon", :size="46")
						text.grid-text {{ item.name }}
			view.other-grid
				u-scroll-list
					view.scroll-list__goods-item(
						v-for="(item, index) in otherGridList", 
						:key="index",
						@click="toNextPage(item.name)")
						image.scroll-list__goods-item__image(:src="item.image")
						text.scroll-list__goods-item__text {{ item.name }}
			view.other-grid-two
				u-scroll-list
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
		{ id: 0, name: "待支付", icon: "integral" },
		{ id: 1, name: "待收货", icon: "kefu-ermai" },
		{ id: 2, name: "待评价", icon: "coupon" },
		{ id: 3, name: "售后/退款", icon: "gift" }
	];
	otherGridList = [
		{ name: "我的钱包", image: require("@/static/mine/wallet.png") },
		{ name: "我的收藏", image: require("@/static/mine/collection.png") },
		{ name: "寄件服务", image: require("@/static/mine/post.png") },
		{ name: "优惠券", image: require("@/static/mine/coupons.png") },
		{ name: "更过功能", image: require("@/static/mine/other.png") },
	];
	otherGridListTwo = [
		{ name: "联系客服", image: require("@/static/mine/after-sale.png") },
		{ name: "车辆服务", image: require("@/static/mine/vehicle-service.png") },
		{ name: "积分中心", image: require("@/static/mine/integral.png") },
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
			url: `/pages/Order/Index?current=${current}`
		});
	}

	// 去往其他模块
	toNextPage(name) {
		switch (name) {
			case "我的收藏":
				uni.navigateTo({
					url: "/pages/Collection/Index"
				});
				break;
			case "收货地址":
				uni.navigateTo({
					url: "/pages/Address/Index"
				});
				break;
			case "人才招募":
				uni.navigateTo({
					url: "/pages/TalentRecruit/Index"
				});
				break;
			case "意见反馈":
				uni.navigateTo({
					url: "/pages/FeedBack/Index"
				});
				break;
			case "关注公众号":
				// this.wechatShow = true;
				break;
			default:
				break;
		}
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
		background: linear-gradient(to top, #ededed, #ff6666, #fa3534);
		padding: 0px 12px;
		.user-info {
			display: flex;
			align-items: center;
			height: 140px;
		}
		.account {
			display: flex;
			flex-direction: column;
			margin-left: 12px;
		}
		.account > .username {
			font-size: 18px;
		}
		.account > .phone {
			margin-top: 4px;
			font-size: 14px;
		}
	}
	.search-sticky {
		position: fixed;
		top: 0;
		width: 100%;
		height: 44px;
		line-height: 44px;
		background: #ffffff;
		padding: 0rpx 12px;
		z-index: 1000;
		box-sizing: border-box;
	}
	.wrap {
		margin-top: -20px;
		padding: 10px 6px;
		.order-grid {
			background: #ffffff;
			margin: 12px 6px;
			border-radius: 8rpx;
		}
		.u-grid {
			padding: 14px;
		}
		.other-grid, .other-grid-two {
			background: #ffffff;
			margin: 10px 6px;
			padding: 12px 10px;
			border-radius: 8rpx;
		}
		.scroll-list {
			@include flex(column);
			&__goods-item {
				margin-right: 20px;
				text-align: center;
				&__image {
					width: 50px;
					height: 50px;
					border-radius: 4px;
				}
				&__text {
					text-align: center;
					font-size: 12px;
					margin-top: 5px;
				}
			}
		}
	}
}
</style>

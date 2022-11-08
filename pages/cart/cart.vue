<template lang="pug">
	view.andry-cart
		u-navbar.cart-header(
			title=""
			:autoBack="false")
			view(slot="left")
				text 购物车
			view.cart-right(slot="right")
				text(@click="onRightEdit") 编辑
		view.page-content
			view(v-if="cartItems.length > 0 ? true : false")
				view.cart-cell(v-for="(item,index) in cartItems" :key="index")
					view.cart-box(:data-id="item.id" :data-index="index")
						view.icon
							u-icon(:name="iconXz" v-if="item.selected" @click="selectedCart(index)" :data-index="index" size="20px")
							u-icon(:name="iconWxz" v-else @click="selectedCart(index)" :data-index="index" size="20px")
						view.cart-main
							view.left
								view.left_image
									img.cart-image(:src="item.icon")
								view.left_box
									text.cart-title {{item.title}}
									text.cart-specif {{item.specif}}
									view.cart-count
										view.cart-money
											text.cart-unit ￥
											text.cart-price {{item.price}}
										view
											text(@click='reduce'  class="input cart-reduce"  :data-index="index") -
											text(class="input cart-text") {{item.value}}
											text(@click='add' class="input cart-add"  :data-index="index") +
						<!-- 底部 -->
						view(v-if="showVal")
							view.del-bottom
								view.cart-bottom-cell(@click='cancel') 取消
								view(class='cart-bottom-cell del-color' @click='del') 删除({{delCount}})
						view(v-else)
							view.cart-bottom
								view.cart-bottom-icon
									u-icon(:name="iconXz" v-if="CheckAll" @click="select" :data-index="index" size="20px")
									u-icon(:name="iconWxz" v-else @click="select" :data-index="index"  size="20px")
								view.checkAll 全选
								view.cart-sum
									text.sum_text 合计：
									text.sum_color ￥{{total}}元
								view.cart-pay
									text.cart_pay(@click="payOrder" :data-id="item.id") 去结算({{goodsCount}})
			<!--如果无数据，则显示数据-->
			u-empty(
				v-else
				mode="car"
				icon="http://cdn.uviewui.com/uview/empty/car.png")
		<!-- 为您推荐 -->
		view.wrap
			u-divider(text="为您推荐")
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
export default class Cart extends Vue {
	top = 0;
	// 购物车
	cartItems = [
		{
			id: 1,
			title: "sk-ii sk2神仙水小灯泡精华大红瓶面霜套装",
			price: 1540.0,
			specif: "自营",
			value: 1,
			sell: 101,
			url: "",
			selected: false,
			icon: require("@/static/goods/sk-ii sk2神仙水小灯泡精华大红瓶面霜套装.jpg")
		},
		{
			id: 2,
			title: "Whoo后天气丹礼盒花献光彩紧颜水乳礼盒7件",
			price: 1590.0,
			specif: "专卖店",
			value: 2,
			sell: 102,
			url: "",
			selected: false,
			icon: require("@/static/goods/Whoo后天气丹礼盒花献光彩紧颜水乳礼盒7件.jpg")
		}
	];
	total = 0;
	CheckAll = false;
	goodsCount = 0;
	delCount = 0;
	showVal = false;
	iconXz = require("@/static/cart/check-xz.png");
	iconWxz = require("@/static/cart/check-wxz.png");
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

	// 购物车
	// 全选
	select(e) {
		var CheckAll = this.CheckAll;

		CheckAll = !CheckAll;
		var cartItems = this.cartItems;

		for (var i = 0; i < cartItems.length; i++) {
			cartItems[i].selected = CheckAll;
		}

		(this.cartItems = cartItems), (this.CheckAll = CheckAll);
		// 计算总金额
		this.getSumTotal();
		// 计算商品数量
		this.getGoodsCount();
		// 计算删除数量
		this.delGoodsCount();
	}
	// 加
	add(e) {
		var cartItems = this.cartItems; // 获取购物车列表
		console.log("触发了不");
		var index = e.currentTarget.dataset.index; // 获取当前点击事件的下标索引
		console.log(index);
		var value = cartItems[index].value; // 获取购物车里面的value值

		value++;
		cartItems[index].value = value;
		this.cartItems = cartItems;
		this.getSumTotal();
	}
	// 减
	reduce(e) {
		var cartItems = this.cartItems; // 获取购物车列表
		var index = e.currentTarget.dataset.index; // 获取当前点击事件的下标索引
		var value = cartItems[index].value; // 获取购物车里面的value值
		if (value == 1) {
			value--;
			cartItems[index].value = 1;
		} else {
			value--;
			cartItems[index].value = value;
		}
		this.cartItems = cartItems;
		this.getSumTotal();
	}
	// 单选
	selectedCart(index) {
		var cartItems = this.cartItems; // 获取购物车列表
		var selected = cartItems[index].selected; // 获取当前点击事件的下标索引是否选中
		// 取反
		cartItems[index].selected = !selected;
		this.cartItems = cartItems;
		// 计算总金额
		this.getSumTotal();
		// 计算商品数量
		this.getGoodsCount();
		// 计算删除数量
		this.delGoodsCount();
	}

	// 删除
	del(e) {
		let delState = true;
		let cartItems = this.cartItems; // 获取购物车列表
		console.log(cartItems.length);
		for (let i = 0; i < cartItems.length; i++) {
			if (cartItems[i].selected == delState) {
				cartItems.splice(i, 1);
				// 更新删除数量数据
				this.delCount = i;
				i = i - 1;
			}
		}
		this.cartItems = cartItems;
		(this.total = 0), (this.goodsCount = 0), (this.CheckAll = false);
	}
	// 删除数量方法
	delGoodsCount() {
		let count = 0;
		let i = 0;
		for (i; i < this.cartItems.length; i++) {
			if (this.cartItems[i].selected) {
				count = count + 1;
			}
		}
		// 更新删除数量数据
		this.delCount = count;
	}
	// 结算
	payOrder() {
		// this.$router.push({ path: "/payOrder", params: { orderId: 1 } });
	}
	// 合计
	getSumTotal() {
		console.log("触发了嘛");
		console.log(this.cartItems);
		var sum = 0;
		for (var i = 0; i < this.cartItems.length; i++) {
			if (this.cartItems[i].selected) {
				sum += this.cartItems[i].value * this.cartItems[i].price;
			}
		}
		// 更新数据
		this.total = sum;
	}
	// 商品总数量
	getGoodsCount() {
		var count = 0;
		var i = 0;
		for (i; i < this.cartItems.length; i++) {
			if (this.cartItems[i].selected) {
				count = count + 1;
			}
		}
		// 更新数据
		this.goodsCount = count;
	}
	//编辑
	onRightEdit() {
		this.showVal = true;
	}
	//取消删除功能
	cancel() {
		this.showVal = false;
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
.andry-cart {
	.cart-header {
		height: 44px;
		line-height: 44px;
	}
	.page-content {
		display: flex;
		flex: 1;
		justify-content: center;
		.cart-main {
			float: left;
			width: 88%;
		}
		.cart-active {
			float: left;
			width: 100%;
			background: #ffffff;
			border-bottom: 1px solid #f2f2f2;
		}
		.cart-image {
			width: 100px;
			height: 100px;
			float: left;
			padding: 7.5px 5px;
		}
		.cart-box {
			width: 100%;
			height: auto;
			background: white;
		}
		.cart-boxtwo {
			display: flex;
			flex-direction: column;
		}
		.left_box {
			margin-left: 4px;
			margin-top: 6px;
			line-height: 30px;
		}
		.cart-title {
			font-size: 14px;
			line-height: 17px;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			overflow: hidden;
			-webkit-line-clamp: 2;
		}
		.cart-count {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}
		.cart-unit {
			font-size: 12px;
			color: #fa3534;
		}
		.cart-money {
			display: flex;
			align-items: center;
		}
		.cart-price {
			display: flex;
			color: #fa3534;
			font-size: 15px;
			height: 18px;
			line-height: 18px;
		}
		.cart-specif {
			padding: 2px 6px;
			background: #999999;
			color: #ffffff;
			font-size: 12px;
			height: 18px;
			line-height: 18px;
			margin-bottom: 5px;
			border-radius: 25px;
		}
		.left {
			display: flex;
		}
		.right {
			float: right;
			width: 5%;
		}
		.right img {
			width: 25px;
			height: 25px;
			float: right;
			margin-right: 15px;
		}
		.input {
			display: block;
			width: 32.5px;
			height: 32.5px;
			line-height: 32.5px;
			text-align: center;
			float: left;
		}
		.cart-add {
			border-left: none;
			border: 1px solid #ededed;
			border-radius: 0px 20px 20px 0px;
			font-size: 18px;
		}
		.cart-reduce {
			border-right: none;
			border: 1px solid #ededed;
			border-radius: 20px 0px 0px 20px;
			font-size: 18px;
		}
		.cart-text {
			width: 45px;
			border-top: 1px solid #ededed;
			border-bottom: 1px solid #ededed;
			font-size: 15px;
		}
		.cart-bottom {
			display: flex;
			position: fixed;
			width: 100%;
			height: 44px;
			bottom: 50px;
			background: #ffffff;
			padding: 0px 10px;
			box-sizing: border-box;
			border-top: 1px solid #f2f2f2;
			z-index: 999;
		}
		.cart-bottom-icon {
			margin-top: 11px;
		}
		.yuan {
			display: block;
			width: 25px;
			height: 25px;
			border-radius: 50%;
			border: 1px solid red;
		}
		.icon {
			float: left;
			width: 6%;
			margin: 38px 10px 32px 10px;
		}
		.SpCart {
			display: block;
			width: 150px;
			height: 150px;
		}
		.Sptext {
			font-size: 15px;
		}
		.cart-icon {
			margin: 13px 10px;
			float: left;
		}
		.cart-sum {
			width: 150px;
			height: 100%;
			line-height: 43.5px;
			float: left;
			text-align: center;
			margin-left: 10px;
			font-size: 14px;
		}
		.cart-pay {
			position: absolute;
			width: 115px;
			height: 100%;
			background: #fa3534;
			right: 0;
		}
		.cart_pay {
			display: block;
			line-height: 43.5px;
			text-align: center;
			font-size: 15px;
			color: white;
		}
		.sum_color {
			color: #fa3534;
			font-size: 12.5px;
		}
		.sum_text {
			font-size: 15px;
		}
		.checkAll {
			margin-left: 10px;
			line-height: 43.5px;
			font-size: 14px;
		}
		.cart-cell {
			float: left;
			width: 100%;
			background: #ffffff;
			border-top: 1px solid #ccc;
			padding: 10px 0px;
			box-sizing: border-box;
		}
		.nodata_text {
			background: #ffffff;
			color: black;
			font-size: 14px;
			text-align: center;
		}
		.nodata_text {
			img {
				margin-top: 50px;
				width: 44%;
				height: 150px;
			}
		}
		.icon {
			float: left;
			width: 5%;
			margin: 47px 10px;
			background: #ffffff;
		}
		.icon-bj {
			margin-top: 4px;
		}
		/* 底部 */
		.del-bottom {
			position: fixed;
			width: 100%;
			height: 44px;
			bottom: 50px;
			background: #ffffff;
			border-top: 1px solid #f2f2f2;
			z-index: 999;
		}
		.cart-bottom-edit {
			float: left;
			width: 100%;
			height: 44px;
			line-height: 44px;
			text-align: center;
			font-size: 14px;
			color: #fa3534;
		}
		.cart-bottom-cell {
			float: left;
			width: 49.725%;
			height: 44px;
			line-height: 44px;
			text-align: center;
			font-size: 14px;
			color: #999999;
			border-right: 1px solid #f2f2f2;
		}
		.del-color {
			color: #fa3534;
		}
	}
	.wrap {
		padding: 0px 4px 50px 4px;
	}
}
.cart-right {
	font-size: 12px;
}
</style>

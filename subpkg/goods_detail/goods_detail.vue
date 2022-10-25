<template>
	<view>
		<!-- 轮播图 -->
		<swiper class="swiper" :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000">
			<swiper-item v-for="(item,index) in detailList.pics" :key="item.goods_id">
				<image @click="preview(index)" :src="item.pics_big_url" mode=""></image>
			</swiper-item>
		</swiper>
		<!--  -->
		<view class="wenben">
			<text>￥{{detailList.goods_price}}</text>
			<view>{{detailList.goods_name}}</view>
		</view>
		<!-- 组件富文本 -->
		<rich-text :nodes="detailList.goods_introduce">

		</rich-text>
		<!-- 组件商品导航 -->
		<view class="goods-carts">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>
	</view>
</template>

<script>
	import {
		mapMutations
	} from 'vuex';
	import goods_detailVue from './goods_detail.vue';
	export default {
		data() {
			return {
				//商品详情数据
				detailList: {},
				//商品id
				goods_id: '',
				options: [{
					icon: 'shop',
					text: '店铺',
					info: 2,
					infoBackgroundColor: '#007aff',
					infoColor: "#f5f5f5"
				}, {
					icon: 'cart',
					text: '购物车',
					info: 2
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: 'linear-gradient(90deg, #FFCD1E, #FF8A18)',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: 'linear-gradient(90deg, #FE6035, #EF1224)',
						color: '#fff'
					}
				]
			};
		},
		onLoad(obj) {
			this.goods_id = obj.goods_id
		},
		methods: {
			...mapMutations(['getCart']),
			async getDetail() {
				//'goods/detail',{goods_id:this.goods_id}
				// `goods/detail?goods_id=` + this.goods_id
				let {
					data: res
				} = await uni.$http.get(`goods/detail?goods_id=` + this.goods_id)
				this.detailList = res.message
			},
			//图片预览
			preview(index) {
				//图片预览API
				uni.previewImage({
					//当前图片的索引  我们用idnex下标
					current: index,
					// 使用数组的map方法 对数组中的每一个元素进行操作并返回新元素
					// 注意： map() 不会对空数组进行检测。
					// 注意： map() 不会改变原始数组。
					urls: this.detailList.pics.map(item => item.pics_big_url)
				})
			},
			// 商品导航 右侧按钮点击事件
			onClick(e) {
				// 跳转购物车
				if (e.content.text == "购物车") {
					uni.switchTab({
						url: "/pages/cart/cart"
					})
				}
			},
			buttonClick(e) {
				if (e.content.text == '加入购物车') {
					let obj = {
						goods_id: this.detailList.goods_id,
						goods_price: this.detailList.goods_price,
						goods_name: this.detailList.goods_name,
						goods_pic: this.detailList.goods_small_logo,
						goods_num: 1,
						goods_flag: false
					}
					// 调用vuex中的mutations中的方法
					this.getCart(obj)
				}
			}
		},
		mounted() {
			this.getDetail()
		}
	}
</script>

<style lang="scss">
	.swiper {
		height: 1000rpx;

		image {
			width: 100%;
			height: 100%;
		}
	}

	.wenben {
		text {
			color: red;
		}
	}

	.goods-carts {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		position: fixed;
		left: 0;
		right: 0;
		/* #ifdef H5 */
		left: var(--window-left);
		right: var(--window-right);
		/* #endif */
		bottom: 0;
	}
</style>

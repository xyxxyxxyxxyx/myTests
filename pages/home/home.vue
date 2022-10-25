<template>
	<view>
		<!-- 轮播图 -->
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" circular="true" :duration="1000">
			<swiper-item v-for="item in swipeList" :key="item.goods_id">
				<navigator :url="item.navigator_url.replace('pages','subpkg').replace('main','goods_detail')">
					<image :src="item.image_src" mode=""></image>
				</navigator>
			</swiper-item>
		</swiper>
		<!-- 导航 -->
		<view class="nav_list">
			<view class="nav_item" v-for="(item,index) in navList" :key="index">
				<image :src="item.image_src" mode="" class="nav_img"></image>
			</view>
		</view>
		<!-- 时尚女装 -->
		<view class="img_list" v-for="(item,index) in flootList" :key="index">
			<!-- 顶部标题图片 -->
			<image class="title_img" :src="item.floor_title.image_src"></image>
			<view class="list_box">
				<!-- 左侧大图 -->
				<view>
					<image mode="widthFix" :style="{width:item.product_list[0].image_width + 'rpx'}" :src="item.product_list[0].image_src"></image>
				</view>
				<!-- 右侧小图 -->
				<view class="right_box">
					<view  @click="goGoodsList(ite)" v-show="idx!=0" v-for="(ite,idx) in item.product_list" :key="idx">
						<image mode="widthFix" :src="ite.image_src" :style="{width:item.product_list[0].image_width + 'rpx'}"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				// 轮播图数据
				swipeList:[],
				// 导航栏数据
				navList:[],
				// 时尚女装
				flootList:[]
			}
		},
		methods:{
			async getSwipeList(){
				let {data:res} = await uni.$http.get('home/swiperdata')
				if(res.meta.status != 200) return uni.$showMsg()
				this.swipeList = res.message
			},
			async getNavList(){
				let {data:res} = await uni.$http.get('home/catitems')
				this.navList = res.message
			},
			async getFlootList(){
				let {data:res} = await uni.$http.get('home/floordata')
				console.log(res)
				this.flootList = res.message
			},
			goGoodsList(item){
				uni.navigateTo({
					url:"/subpkg/goods_list/goods_list" + item.navigator_url.substring(17)
				})
			}
		},
		mounted() {
			this.getSwipeList()
			this.getNavList()
			this.getFlootList()
		}
	}
</script>

<style lang="scss">
image{
	width: 100%;
}
.nav_list{
	display: flex;
	justify-content: space-around;
	.nav_item{
		padding: 15rpx 0;
		.nav_img{
			width: 128rpx;
			height: 140rpx;
		}
	}
}
.title_img{
	height: 60rpx;
}
.list_box{
	display: flex;
}
.right_box{
	display: flex;
	flex-wrap: wrap;
	justify-content: space-around;
}
.img_list{
	margin-left: 15rpx;
}
</style>

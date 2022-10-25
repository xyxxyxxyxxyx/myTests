<template>
	<view>
		<mySearch></mySearch>
		<view class="cate">
			<!-- 左侧导航容器 -->
			<scroll-view scroll-y="true" :style="{height:scrollHeight + 'px',width:'120px'}">
				<view class="left_navigation">
					<view class="navigation_style" :class="{active:active==index}" @click="getNavigation(index)"
						v-for="(item,index) in cateList" :key="item.cat_id">
						{{item.cat_name}}
					</view>
				</view>
			</scroll-view>
			<!-- 右侧列表容器 -->
			<scroll-view scroll-y="true" :style="{height:scrollHeight + 'px',width:'100%'}">
				<view>
					<view class="right_list">
						<!-- 二级导航 -->
						{{rightList[0].cat_name}}
					</view>

					<view class="three_level">
						<view class="it" v-for="(item ,index) in rightList[0].children" :key="index">
							<view @click="gotoList(item)" class="list">
								<image style="width: 70px;height: 70px;" :src="item.cat_icon" mode=""></image>
								{{item.cat_name}}
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import mySearch from "../../components/my_search/my_search.vue"
	export default {
		components:{
			mySearch
		},
		data() {
			return {
				//分类数据
				cateList: [],
				//判断索引高度
				active: 0,
				// 滚动区域scoll-view组件的高度
				scrollHeight: 0,
				//右侧分类数据
				rightList: []
			};
		},
		methods: {
			async getCateList() {
				let {
					data: res
				} = await uni.$http.get('categories')
				console.log(res);
				if (res.meta.status != 200) return uni.$showMsg()
				this.cateList = res.message
				//默认是大家电
				this.rightList = res.message[0].children
			},
			//一二级导航联动方法
			getNavigation(index) {
				//控制高亮
				this.active = index
				// 二级导航  根据一级导航下标 赋新值
				this.rightList = this.cateList[index].children
			},
			gotoList(item) {
				uni.navigateTo({
					url: "/subpkg/goods_list/goods_list?cid=" + item.cat_id
				})
			}
		},
		mounted() {
			this.getCateList()
			//获取 页面屏幕可以使用的高度
			uni.getSystemInfo({
				success: (res) => {
					this.scrollHeight = res.windowHeight
					console.log(this.scrollHeight);
				}
			});
		}
	}
</script>

<style lang="scss">
	.cate {
		display: flex;

		.navigation_style {
			width: 120px;
			line-height: 60px;
			text-align: center;

			&.active {
				background-color: #fff;
				position: relative;

				&::before {
					content: '';
					position: absolute;
					background-color: #c00000;
					width: 3px;
					height: 30px;
					top: 50%;
					transform: translateY(-50%);
					left: 3px;
				}
			}
		}

		.right_list {
			line-height: 60px;
			background-color: #fff;
			text-align: center;
		}

		.three_level {
			display: flex;
			flex-wrap: wrap;
			justify-content: space-around;
			background-color: #fff;

			.it {
				width: 70px;
				display: flex;
				justify-content: space-around;
				flex-wrap: wrap;
				background-color: #fff;
				margin-top: 10px;
			}
		}
	}

	.list {
		text-align: center;
	}
</style>

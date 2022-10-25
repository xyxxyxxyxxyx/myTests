<template>
	<view>
		<uni-swipe-action>
			<uni-swipe-action-item v-for="(item,index) in cart" :key="item.goods_id" :right-options="options"
				@click="bindClick($event,index)">
				<view class="cart_box">
					<view class="cart_list">
						<radio @click="changeF(item.goods_id)" :checked="item.goods_flag"></radio>
						<image :src="item.goods_pic"></image>
					</view>
					<view class="cart_right">
						<view class="cart_size">{{item.goods_name}}</view>
						<div class="box">
							<text class="cart_white">￥{{item.goods_price}}</text>
						</div>
						<view class="cart_num">
							<button :disabled="item.goods_num==0" type="warn" @click="getJian(index)">-</button>
							<input type="text" placeholder="数量" :value="item.goods_num">
							<button :disabled="item.goods_num==10" type="primary" @click="getJia(index)">+</button>
						</view>
					</view>
				</view>
			</uni-swipe-action-item>
		</uni-swipe-action>

		<!-- 底部结算栏 -->
		<div class="buttom">
			<view class="cart_buttom">
				<view class="buttom_left">
					<radio :checked="allChecked" @click="allChecked=!allChecked"></radio>全选
				</view>
				<view class="buttom_center">
					<text>合计：</text> <text class="left_list">￥{{getCheckedAll}}</text>
				</view>
				<view class="buttom_right">
					<button class="btn">结算:({{checkedSum}})</button>
				</view>
			</view>
		</div>
	</view>
</template>

<script>
	import {
		mapGetters
	} from 'vuex';
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				options: [{
					text: '取消',
					style: {
						backgroundColor: '#007aff'
					}
				}, {
					text: '确认',
					style: {
						backgroundColor: '#dd524d'
					}
				}]
			};
		},
		methods: {
			...mapMutations(['changeFlag', 'getSum', 'getNum', 'getDel', 'setChecked']),
			// 单选框选中状态切换
			changeF(id) {
				this.changeFlag(id)
			},
			//加
			getJia(index) {
				this.getSum(index)
			},
			getJian(index) {
				this.getNum(index)
			},
			bindClick(e, index) {
				if (e.content.text == '确认') {
					this.getDel(index)
				}

			}
		},
		computed: {
			...mapState(['cart']),
			...mapGetters(['checkedSum', 'getCheckedAll']),
			//全选or反选
			allChecked:{
				get(){
					return this.cart.every(item=>{
						return item.goods_flag==true
					})
				},
				set(val){
					this.setChecked(val)
				}
			}
		}
	}
</script>

<style lang="scss">
	.cart_box {
		display: flex;

		.cart_list {
			display: flex;
			align-items: center;

			image {
				width: 200rpx;
				height: 200rpx;
			}
		}

		.cart_right {
			.cart_size {
				font-size: 14px;
			}

			.cart_white {
				color: red;
				margin-top: 10px;
			}

			.cart_num {
				float: right;
				margin-right: 5px;
				display: flex;

				input {
					width: 30px;
					height: 30px;
					text-align: center;
				}

				button {
					width: 30px;
					height: 30px;
					text-align: center;
					line-height: 30px;
					border: none;
					color: black;
					background-color: transparent;
				}
			}

		}
	}

	.buttom {

		.cart_buttom {
			display: flex;
			justify-content: space-between;
			align-items: center;
			position: fixed;
			bottom:0;
			left:0;
			width:100%;
			.buttom_left {}

			.buttom_center {
				
				.left_list {
					color: red;
				}
			}

			.buttom_right {


				.btn {
					height: 100%;
					background-color: red;
					border: none;
					color: white;
					border-radius: 0;
				}
			}
		}
	}
</style>

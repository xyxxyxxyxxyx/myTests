<template>
 <view>
  <!--布局 -->
  <ul>
   <li @click="gotoDetail(item)" class="goods_box" v-for="item in goodsList" :key="item.goods_id">
    <view>
     <image :src="item.goods_big_logo || defaultImage" mode=""></image>
    </view>
    <view class="goods_list">
     <p>{{item.goods_name}}</p >
     <text style="color: red;">￥{{item.goods_price | myPrice}}</text>
    </view>
   </li>
  </ul>
 </view>
</template>

<script>
 export default {
  data() {
   return {
    //默认图片  当网络图片没有时  渲染默认图片
    defaultImage: 'https://tse3-mm.cn.bing.net/th/id/OIP-C.Y_xuuWTnkH_vfe7WAkAx7QHaEK?w=317&h=180&c=7&r=0&o=5&pid=1.7',
    //商品列表数据
    goodsList: [],
    //请求时携带的参数
    obj: {
     query: '',
     cid: '',
     pagenum: 1,
     pagesize: 10
    },
    //记录商品的总条数
    total: 0,
    //判断请求是否完毕  截流
    isLoading: false
   };
  },
  //过滤器 
  filters: {
   //改变价格
   myPrice(val) {
    //加两位小数点  toFixed.p[lk8yop78tg]
    return val.toFixed(2)
   }
  },
  methods: {
   async getGoodsList(callback) {
    //表示正在发送请求
    this.isLoading = true
    //async和awite 将异步的代码变为同步代码 执行完上面的才能执行下面的 说明请求的这段代码已经执行完毕了
    let {
     data: res
    } = await uni.$http.get('goods/search', this.obj)
    //表示请求完毕  当请求没有结束的时候isLoading的值依旧为true 这时使用上拉加载事件时，会触发判断 当isLoading为true时 会结束函数体，不执行继续请求的接口
    this.isLoading = false
    //当参数中有这个回调函数时执行否则不执行
    callback && callback()
    console.log(res)
    //  数组 拼接
    this.goodsList = [...this.goodsList, ...res.message.goods]
    this.total = res.message.total
   },
   gotoDetail(item) {
    uni.navigateTo({
     url: "/subpkg/goods_detail/goods_detail?goods_id=" + item.goods_id
    })
   }
  },
  mounted() {
   this.getGoodsList()
  },
  onLoad(obj) {
   this.obj.cid = obj.cid
  },
  //监听上拉加载事件
  onReachBottom() {
   //判断请求是否完毕  未完毕 return 结束
   if (this.isLoading) return
   if (this.obj.pagenum * this.obj.pagesize > this.total) {
    //当数据全部加载完毕后不在触发请求接口
    return uni.showToast({
     title: "数据已加载完毕"
    })
   }
   //当前页码加1
  this.obj.pagenum += 1
     //调用
     this.getGoodsList()
    },
    //监听下拉刷新事件
    onPullDownRefresh() {
     //更改当前页数为1页
     this.obj.pagenum = 1
     //将goodsList数组置为空
     this.goodsList = []
     //从新请求数据
     this.getGoodsList(() => uni.stopPullDownRefresh())
    }
   }
  </script>
  
  <style lang="scss">
   .goods_box {
    display: flex;
    border-bottom: 1px solid #eee;
  
    image {
     width: 100px;
     height: 100px;
    }
   }
  </style>
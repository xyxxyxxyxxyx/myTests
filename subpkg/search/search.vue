<template>
 <view>
  <div class="top">
   <!-- 搜索栏 -->
   <uni-search-bar @input="input"></uni-search-bar>
  </div>
  <!--  -->
  <view class="search">
   <!-- 搜索历史 -->
   <text>搜索历史记录</text>
   <!-- 删除 -->
   <uni-icons type="trash-filled" @click="clearHistory"></uni-icons>
  </view>
  <view class="sear_tag" v-if="searchList.length==0 || !searchList">
   <uni-tag v-for="(item,index) in history" :key="index" :text="item" type="default" inverted />
  </view>
  <ul v-else>
   <li class="list" v-for="item in searchList" :key="item.goods_id">
    <text>{{item.goods_name}}</text>
   </li>
  </ul>
 </view>
</template>

<script>
 import {
  mapState,
  mapMutations
 } from 'vuex';
 export default {
  data() {
   return {
    // 搜索的数据
    searchList: [],
    //防抖的计时器对象
    time: null
   };
  },
  methods: {
   ...mapMutations(['addHistory','clearHistory']),
   // 输入内容防抖
   input(query) {
    //防抖的逻辑代码
    this.time && clearTimeout(this.time)
    //防抖时的逻辑代码
    this.time = setTimeout(() => {
     // 调用请求接口
     //0.5秒以后执行调用 接口的方  并返回给定时器对象赋值给ttme变量
     this.getSearch(query)
    }, 500)
   },
   //请求搜索数据
   async getSearch(query) {
    let {
     data: res
    } = await uni.$http.get('goods/qsearch', {
     query
    })
    this.searchList = res.message
    console.log(res)
    //添加搜索历史
    this.addHistory(query)
   }
  },
  mounted() {
   this.getSearch()
  },
  computed: {
   ...mapState(['history'])
  }
 }
</script>

<style lang="scss">
 .top {
  background-color: red;
 }

 .search {
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;
  border-bottom: 1px solid #eee;
 }

 .sear_tag {
  margin-top: 8px;

  uni-tag {

   margin-left: 8px;
  }
 }

 .list {
  display: flex;
  line-height: 40px;
  justify-content: space-between;
  padding: 0 10px;
  border-bottom: 1px solid gray;

  text {
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
  }
 }
</style>
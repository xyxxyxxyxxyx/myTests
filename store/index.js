// 引入vue
import Vue from 'vue'
//引入vuex
import Vuex from 'vuex'
//use vuex
Vue.use(Vuex)
//导出Vuex的 Store实例
export default new Vuex.Store({
 state: {
  //定义一个购物车数据
  cart:JSON.parse(uni.getStorageSync('cart') || '[]'),
  //搜索历史变量   进行持久化
  history:JSON.parse(uni.getStorageSync('history') || '[]')
 },
 mutations: {
  // 持久化方法
  saveCarts(state){
   //小程序的本地存储方法  注意：数据为json格式
   uni.setStorageSync('cart',JSON.stringify(state.cart))
   //将搜索历史记录存入本地存储中
   uni.setStorageSync('history',JSON.stringify(state.history))
  },
  //添加购物车
  getCart(state,obj){
   // 去重
   var index = state.cart.findIndex(item=>{
     return item.goods_id==obj.goods_id
   })
   // 判断
   if(index==-1){
    // 购物车添加数据
    state.cart.push(obj)
   }else{
    state.cart[index].goods_num++
   }
   //调用本地存储的方法
   this.commit('saveCarts')
  },
  changeFlag(state,val){
   //找到要修改的数据对象
   let obj = state.cart.find(item=>item.goods_id==val)
   // 单选框的状态取反
   obj.goods_flag =! obj.goods_flag
   //调用本地存储的方法
   this.commit('saveCarts')
  },
  //加
  getSum(state,index){
   state.cart[index].goods_num++
   //调用本地存储的方法
   this.commit('saveCarts')
  },
  //减
  getNum(state,index){
   state.cart[index].goods_num--
   //调用本地存储的方法
   this.commit('saveCarts')
  },
  //删除
  getDel(state,index){
   state.cart.splice(index,1)
   //调用本地存储的方法
   this.commit('saveCarts')
  },
  //全选
  setChecked(state,val){
    return  state.cart.forEach(item=>{
       item.goods_flag=val
   })
  },
  //添加搜索历史方法
  addHistory(state,value){
   //使用new Set 构造函数  数组去重
   let  newSet = new Set(state.history)
   // array.from  类数组转换欸真实数组
   state.history = Array.from(newSet)
   //搜索历史头部添加
   state.history.unshift(value)
   this.commit('saveCarts')
  },
  //清空历史记录
  clearHistory(state){
   state.history= []
  }
 },
 getters: {
   // 计算选中状态下的商品数量
   checkedSum(state){
    return state.cart.filter(item=>item.goods_flag).reduce((tmp,ite)=>tmp + ite.goods_num,0)
   },
   //计算被选中商品的总价
   getCheckedAll(state){
    return state.cart.reduce((sum,item)=>{
     if(item.goods_flag){
      sum = item.goods_num * item.goods_price
     }
     return sum
    },0)
   }
  },
  actions: {},
  modules: {}
  // plugins[
  //  persistedstate({
  //   storage:window.sessionStorage
  //  })
  // ]
 })
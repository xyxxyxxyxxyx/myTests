// #ifndef VUE3
import Vue from 'vue'
import App from './App'
// 引入store 实例
import store from './store/index.js'
// 导入第三方模块
import {$http} from '@escook/request-miniprogram'
// 挂载
uni.$http = $http
// 封装一个showMsg提示方法
uni.$showMsg = function(title='数据请求失败',duration=1500){
	uni.showToast({
		title,
		duration
	})
}
// 设置请求基地址
$http.baseUrl="https://api-hmugo-web.itheima.net/api/public/v1/"
// 设置请求拦截器
$http.beforeRequest = function(){
	// 启动loding加载提示
	uni.showLoading({
		title:"正在加载···"
	})
}
// 设置响应拦截器
$http.afterRequest=function(){
	// 关闭loding加载
	uni.hideLoading()
}
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
	store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import App from './App.vue'
export function createApp() {
  const app = createSSRApp(App)
  return {
    app
  }
}
// #endif
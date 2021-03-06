// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router'
import store from './vuex/store.js'

FastClick.attach(document.body)



global.API_URL = "../ParkingPay.ashx"

// global.API_URL = "https://bird.ioliu.cn/v1?url=http://www.kaien.cc/parkingpay.ashx"

// plugins
import {  BusPlugin, DatetimePlugin, LocalePlugin, DevicePlugin, ToastPlugin, AlertPlugin, ConfirmPlugin, LoadingPlugin, WechatPlugin, AjaxPlugin } from 'vux'


Vue.use(DevicePlugin)
Vue.use(ToastPlugin)
Vue.use(AlertPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(WechatPlugin)
Vue.use(AjaxPlugin)
Vue.use(LocalePlugin)
Vue.use(DatetimePlugin)
Vue.use(BusPlugin)



const wx = Vue.wechat
const http = Vue.http

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  	router,
  	store,
  	render: h => h(App)
}).$mount('#app-box')

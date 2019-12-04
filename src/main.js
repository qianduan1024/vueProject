// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import Header from './components/Header/Header.vue'
import Star from './components/Star/Star.vue'
import store from './store'
import CartControl from './components/CartControl/CartControl.vue';
import './validate.js';
import { Button, Cell } from 'mint-ui'
import './mock/mock-serve.js'
Vue.config.productionTip = false
Vue.component(Button.name, Button)

Vue.component('Header', Header)
Vue.component('Star', Star)
Vue.component('CartControl',CartControl)
// 解决移动端延迟问题
// import FastClick from 'fastclick'
// FastClick.attach(document.body);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
})

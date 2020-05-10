import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import Api from './api/index'
import echarts from 'echarts'
import walden from './assets/echartstheme/walden.project'
import HappyScroll from 'vue-happy-scroll'

Vue.prototype.$api = Api
Vue.prototype.$echarts = echarts
echarts.registerTheme('walden', walden) // 注册自定义主题--黑色背景下的主题

Vue.use(HappyScroll)
Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
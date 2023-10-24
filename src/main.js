import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//添加element-ui

// css样式还是需要全部引入
import 'element-ui/lib/theme-chalk/index.css'
import element from './element/index'
Vue.use(element)

//添加vue-router
import router from './router'

//引入echart
// import * as echarts from 'echarts'
// Vue.prototype.$echarts = echarts

// 引入echarts
import echarts from "./echarts/index";
Vue.prototype.$echarts = echarts

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')



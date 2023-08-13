import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

//添加element-ui
import Element from 'element-ui'
//import '/excel/assets/styles/element-variables.scss'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(Element, {
  size: 'mini' // 设置全局字体大小
})

//添加vue-router
import router from './router'

//引入echart
import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')



// 导入自己需要的组件
import { Divider,Statistic,Row,Col,Message,Loading} from 'element-ui'
const element = {
  install: function (Vue) {
    Vue.use(Divider) 
    Vue.use(Statistic) 
    Vue.use(Row) 
    Vue.use(Col) 
    Vue.use(Loading) 
    Vue.prototype.$message = Message
    Vue.prototype.$loading = Loading.service
  }
}
export default element
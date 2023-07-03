//引入必要文件
import Vue from 'vue'
import Vuex from 'vuex'

//使用vuex
Vue.use(Vuex)

//定义vuex
const store = new Vuex.Store({
    state: {
        //定义一个变量
        count: 0
    },
    mutations: {
        //定义一个方法
        increment (state) {
            state.count++
        },
        //定义传入传入方法,第一默认都是state,后面就是传入的参数
        increment2 (state, n) {
            state.count = n
        }
    }
})

//暴露出去
export default store
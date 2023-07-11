//引入响应文件
import Vue from 'vue'
import Router from 'vue-router'

//使用路由
Vue.use(Router)

//创建静态路由
export const staticRoutes = [
  {
    name:'test1',
    path: '/',
    component: () => import('@/views/test/test'),  //引入vue页面
    // component: () => import('@/components/HelloWorld'),  //引入vue页面
    meta: {
      title: '首页'
    }
  },
  {
    name:'test2',
    path: '/mirror',
    component: () => import('@/views/test/mirror'),  //引入vue页面
    // component: () => import('@/components/HelloWorld'),  //引入vue页面
    meta: {
      title: '首页'
    }
  }
]

// 防止连续点击多次路由报错
let routerPush = Router.prototype.push;
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(err => err)
}


const router = new Router({
  mode: 'history', // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: staticRoutes
})


//添加动态路由
router.$addRoutes = (params) => {

  //在此处可以过滤掉自己的不需要的路由,如果没有就不需要动他
  params = params.filter(item => {
    if (item)
      return true;
  });
  //添加路由到vue
  router.addRoutes(params)
}

export default router
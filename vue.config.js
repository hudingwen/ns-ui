const { defineConfig } = require('@vue/cli-service')

 
 
const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
 
module.exports = defineConfig({
  transpileDependencies: true,
  // 关闭Eslint语法检查
  lintOnSave:false,
  //配置@为src目录
  configureWebpack: {
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
  },
  //配置代理和启动端口
  // webpack-dev-server 相关配置
  devServer: {
    port: 8088,
    proxy: {
      '/test': {
        target: 'https://geo.datav.aliyun.com/areas_v3/bound/geojson?code=510100_full',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          // 路径重写
          // 替换target中的请求地址
          // 如果没有加这个重写的就可能访问不到对应的api
          // 例如上面的https://www.baidu.com他每次就会访问https://www.baidu.com/api
          // 其实我们是想访问https://www.baidu.com的
          // 如果有真要访问https://www.baidu.com/api的路由
          // 那我们request的访问路由就是/api/api
          // 相当于第一个/api是访问表示 第二个/api才是要真实访问的路由地址
          // 当出现访问多个不同的api的时候就需要这样操作以便于管理
          "^/test": "" 
        }
      },
      '/api': {
        target: 'http://localhost:8080',
        ws: true,
        changeOrigin: true,
        // pathRewrite: {
        //   // 路径重写
        //   // 替换target中的请求地址
        //   // 如果没有加这个重写的就可能访问不到对应的api
        //   // 例如上面的https://www.baidu.com他每次就会访问https://www.baidu.com/api
        //   // 其实我们是想访问https://www.baidu.com的
        //   // 如果有真要访问https://www.baidu.com/api的路由
        //   // 那我们request的访问路由就是/api/api
        //   // 相当于第一个/api是访问表示 第二个/api才是要真实访问的路由地址
        //   // 当出现访问多个不同的api的时候就需要这样操作以便于管理
        //   "^/api": "" 
        // }
      },
    }
  }
  
})  
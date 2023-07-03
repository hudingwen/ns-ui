//引入关键依赖
import axios from 'axios'
//引入Vue
import Vue from 'vue'; 

//设置请求编码
axios.defaults.headers['Content-Type'] = 'application/json;charset=utf-8'
//请求延时单位/ms
axios.defaults.timeout = 120000
//设置请求前缀
axios.defaults.baseURL = ''

// 创建axios实例
const service = axios.create({})




//请求拦截
service.interceptors.request.use(
    config => {
        
        //例如,请求带上我们我的token
        //config.headers.Authorization = "Bearer 123456789";
        console.info("config",config)

        //遮罩层
        if(config.showLoading){
            config.loading = Vue.prototype.$loading({lock: true,text: '系统正在拼命加载中...',spinner: 'el-icon-loading',background: 'rgba(0, 0, 0, 0.7)'});
        }
        return config;
    },
    err => {
        //异常请求,可自行捕获并处理
        console.info("err",err)
        return Promise.reject(err);
    }
);


//响应拦截
service.interceptors.response.use(
    response => { 
        console.log("response",response)
        if(response.config.showLoading){
            response.config.loading.close()
        }
        //正常的响应http的200代码
        //在这里你可以预处理数据
        //console.info("response",response)
        if(response.config.showMessage && response.data && !response.data.success){
            Vue.prototype.$message({message: response.data.msg||"系统繁忙,请稍后再试",type: 'error'});
        }
        if(response.config.showMessage && response.data && response.data.success && response.data.msg){
            Vue.prototype.$message({message: response.data.msg,type: 'success'});
        }
        return response.data; 
    },
    error => {
        console.info("error",error)
        if(error.config.showLoading){
            error.config.loading.close()
        }
        //异常的响应处理
        let errInfo = { success: false, message: "错误" }
        // 超时请求处理
        var originalRequest = error.config;
        if(error.code == 'ECONNABORTED' && error.message.indexOf('timeout')!=-1 && !originalRequest._retry){
            errInfo.message = "请求超时！"; 
            originalRequest._retry = true 
        }else if (error.response) {
            if (error.response.status == 401) {
                 // 401 未登录
                errInfo.message = "失败！请先登录"; 
            }
            else if (error.response.status == 403) {
                // 403 无权限
               errInfo.message = "失败！该操作无权限"; 
            }
            else if (error.response.status == 429) {
                // 429 ip限流
                errInfo.message = "刷新次数过多，请稍事休息重试！";
            }else if (error.response.status == 404) {
                // 404 不存在
                errInfo.message = "失败！访问接口不存在";
           }else if (error.response.status == 500) {
               // 500 服务器异常
               errInfo.message = "失败！服务器异常"; 
           }else if (error.response.status == 502) {
                // 502 失败！服务器繁忙
            errInfo.message = "失败！服务器繁忙"; 
            }else if (error.response.status == 405) {
               // 405 请求http方法错误
               errInfo.message = "失败！请求http方法错误";  
           }else if (error.response.status == 415) {
               // 415 参数没有指定Body还是Query
               errInfo.message = "失败！参数错误";   
           }else {
               //其他错误参数
                errInfo.message = '失败！请求错误'+"("+error.response.status+")" + error.message;    
           }
        }else{
            errInfo.message = "失败！服务器断开";  
        } 
        Vue.prototype.$message({message: errInfo.message,type: 'error'});
        return errInfo; // 返回接口返回的错误信息
    }
);


export default service

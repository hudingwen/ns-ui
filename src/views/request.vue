<template>
    <div> 
        <el-input type="text" v-model="txt"/>  
        <el-button @click="test">获取数据-异步</el-button>  
        <el-button @click="init">获取数据-同步</el-button>  
        <div v-html="html">

        </div>

        
    </div>
</template>

<script>  
import request from '@/request'
export default {
    name: 'test-vuex',
    data() {
        return {
            txt: "/api", 
            html:""
        }
    },
    methods: {
        test(){  
            request({
                url: this.txt,
                method: 'get',
                params: {},//url参数
                data:{}//body参数,如果是get则不需要
            }).then(res=>{
                this.html = JSON.stringify(res);
            }).catch(err=>{
                this.html = "出现异常"+JSON.stringify(err)
            })
        }, 
        //同步访问
        async init(){
            var res = await request({
                url: this.txt,
                method: 'get',
                params: {},//url参数
                data:{}//body参数,如果是get则不需要
            })
            console.log(res)
            this.html = JSON.stringify(res);
        }
    }, 
}
</script>
<style scoped>

</style>
<template>
    <div> 
        <el-button @click="test">添加一个路由</el-button> 
        <el-button :disabled="isDisable" @click="test2">跳转至添加的路由</el-button> 
    </div>
</template>

<script>
import router from '@/router'
export default {
    name: 'test-router',
    data() {
        return {
            message: "",
            isDisable:true
        }
    },
    methods: {
        test(){
            let myDynamicRoute = [
                {
                    path: '/demo2',
                    component: () => import('@/views/demo'),  //引入vue页面
                    meta: { 
                        title: 'demo2'
                    }
                },
            ]
            router.$addRoutes(myDynamicRoute)
            this.isDisable = false
        }, 
        test2(){
            this.$router.push("/demo2")
        }
    }
}
</script>
<style scoped>

</style>
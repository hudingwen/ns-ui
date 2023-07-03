<template>
    <div> 
        <el-input type="text" v-model="count"/> 

        <el-button @click="test">测试</el-button>  
        <el-button @click="test2">获取</el-button>  

        
    </div>
</template>

<script>  
export default {
    name: 'test-vuex',
    data() {
        return {
            message: "", 
        }
    },
    methods: {
        test(){  
            console.log(this.$store.state.count) 
            this.$store.commit('increment') 
            console.log(this.$store.state.count) 
        }, 
        test2(){
             console.log(this.$store.state.count) 
        }
    },
    computed: {
        count : {
            get() {
                return this.$store.state.count
            },
            set(val){
                //方法1
                //this.$store.state.count = val;
                //方法2
                this.$store.commit('increment2',val) 
            }
        }, 
    }
}
</script>
<style scoped>

</style>
<template>
  <div class="hello" style="text-align:center">
    <img alt="Vue logo" src="@/assets/logo.png">
     {{msg}}
    <el-row>
      <el-button round>圆角按钮</el-button>
      <el-button type="primary" round>主要按钮</el-button>
      <el-button type="success" round>成功按钮</el-button>
      <el-button type="info" round>信息按钮</el-button>
      <el-button type="warning" round>警告按钮</el-button>
      <el-button type="danger" round>危险按钮</el-button>
    </el-row>
    <h1>Welcome to Your Vue.js App</h1> 
  </div>
</template>

<script> 
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  methods:{
    test(){
       
    }
  },
  mounted(){
    this.test()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>

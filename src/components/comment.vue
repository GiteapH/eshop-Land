<template>
    <div>
        <el-divider style="margin-bottom: 15px;"></el-divider>
        <div style="float:left">
            <img :src="src" style="width: 50px;height:50px;">
            <p style="margin-top:3px;color:blueviolet">{{username}}</p>
        </div>
        <div style="float:left;margin-left: 20px;height: 50px;">
           <p>{{content}}</p>
           <p style="color:#999999;position:relative;bottom: 2px;margin-top: 40px;">{{date}}</p>
        </div>
        
    </div>
</template>
  <script>
import {defineComponent } from 'vue'

export default defineComponent({
    props:['src','username','content','date']
})
</script>
      
  <style scoped>
  .el-carousel__item h3 {
      display: flex;
      color: #475669;
      opacity: 0.75;
      margin: 0;
  }
  
  .el-carousel__item:nth-child(2n) {
      background-color: #99a9bf;
  }
  
  .el-carousel__item:nth-child(2n + 1) {
      background-color: #d3dce6;
  }
  
  .el-carousel__container {
      height: 400px;
  }
  </style>
  
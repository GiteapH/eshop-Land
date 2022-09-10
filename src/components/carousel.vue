<template>
    <el-carousel indicator-position="outside" height="470px" :direction="vertical">
        <el-carousel-item v-for="item in srcs" :key="item">
            <img :src="item" alt="" :style="Style">
        </el-carousel-item>
    </el-carousel>
</template>
  <script>
import {defineComponent } from 'vue'

export default defineComponent({
    props:{
        srcs:{
            type:Object,
            default:()=>([])
        },
        vertical:{
            type:String,
            default:'horizontal'
        },
        Style:{
            type:Object,
            default:()=>({})
        }
    }
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
  
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  devServer:{
    proxy: {
      '/api': {                       //需要代理的接口
        target: 'http://10.16.92.242:8008', //目标服务器
        changeOrigin: true,
        ws:true,　　　　　　 //是否跨域
        pathRewrite: {
          '^/api': ''             //重定向
        }
      }
    },
  }

})

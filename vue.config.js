module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "~@/sass/main.scss"`
      }
    }
  },
  // devServer: {
  //   proxy: {
  //     '/api': {   //匹配所有以/api开头的请求路径
  //       // target: 'http://192.168.1.4:8888/api', //代理目标的基础路径
  //       // target: 'http://124.222.109.34:8888/api', //代理目标的基础路径
  //       // target: 'http://10.10.43.44:1000/api', //代理目标的基础路径
  //       target: 'http://localhost:8888/api', //代理目标的基础路径
  //       changeOrigin: true, //支持跨域
  //       pathRewrite: {  //重写路径：去掉路径中开头的/api
  //         '^/api': ''
  //       }
  //     }
  //   },
  // }
}

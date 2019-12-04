
const path = require('path')
function resolve (dir) {
  return path.join(__dirname, '..', dir)
}
module.exports={
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.esm.js',
        '@': resolve('src'),
      }
    }
  },
  devServer: {
    proxy: {
      '/api':{  //匹配所有以'/api'开头的请求路径
        target:'http://localhost:5000', //代理目标的基础路径
        changeOrigin: true,//支持跨域
        pathRewrite: { //重写路径：去掉路径中开头的'/api'
          '^/api': ''
        }
      }
    },
  }

}
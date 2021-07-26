const { resolve } = require('path')
// 处理html
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 引入PWA
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
/* 
  PWA渐进式网络开发应用程序（离线可访问）
    workbox --> workbox-webpack-plugin
*/

// 定义nodejs环境变量，决定使用browserslist的哪个环境用于css兼容性处理
process.env.NODE_ENV = 'production'
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.[contenthash:10].js',
    path: resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      minify:{
        collapseWhitespace:true,
        removeComments:true
      }
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      /* 
        1、帮助servicework快速启动
        2、删除旧的servicework

        生成一个servicework配置文件~
      */
      clientsClaim:true,
      skipWaiting:true
    })
  ],
  mode: 'production',
}

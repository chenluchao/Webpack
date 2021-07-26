const { resolve } = require('path')
// 处理html
const HtmlWebpackPlugin = require('html-webpack-plugin')

/* 

*/

// 定义nodejs环境变量，决定使用browserslist的哪个环境用于css兼容性处理
process.env.NODE_ENV = 'production'
module.exports = {
  entry: {
    // 多入口，有一个入口，最终输出就有一个bundle
    main:'./src/js/index.js',
    test:'./src/js/test.js'
  },
  output: {
    // [name]:取文件名
    filename: 'js/[name].[contenthash:10].js',
    path: resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      minify:{
        collapseWhitespace:true,
        removeComments:true
      }
    })
  ],
  mode: 'production',
}

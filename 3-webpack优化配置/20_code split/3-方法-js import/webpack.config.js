const { resolve } = require('path')
// 处理html
const HtmlWebpackPlugin = require('html-webpack-plugin')

// 定义nodejs环境变量，决定使用browserslist的哪个环境用于css兼容性处理
process.env.NODE_ENV = 'production'
module.exports = {
  entry: './src/js/index.js',
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
  /* 
    optimization
      1、可以将node_modules中的代码单独打包成一个chunk最终输出
      2、自动分析多入口chunk中，有没有公共的文件(公共文件不能太小)，如果有会打包成单独一个chunk
  */
  optimization:{
    splitChunks:{
      chunks:'all'
    }
  },
  mode: 'production',
}

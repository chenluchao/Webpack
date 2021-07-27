const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      // 压缩html代码
      minify:{
        // 移除空格s
        collapseWhitespace:true,
        // 移除注释
        removeComments:true
      }
    }),
  ],
  mode: 'production',
}
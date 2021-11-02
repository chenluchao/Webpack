/* 
  loader:  1、下载   2、使用（配置loader）
  plugins: 1、下载   2、引入     3、使用
*/
const { resolve } = require('path')
const Htmlwebpackplugin = require('html-webpack-plugin')
module.exports ={
  entry:'./src/index.js',
  output:{
    filename:'built.js',
    path:resolve(__dirname,'build')
  },
  module:{
    rules:[]
  },
  plugins:[
    // plugins的配置
    // html-webpack-plugin
    // 功能：默认会创建一个空的html，自动引入打包输出的所有资源（JS/CSS）
    // 需求：需要有结构的html文件
    new Htmlwebpackplugin({
      // 复制'./src/index.html'文件，并自动引入打包输出的所有资源（JS/CSS）
      template:'./src/index.html'
    })
  ],
  mode:'development'
}

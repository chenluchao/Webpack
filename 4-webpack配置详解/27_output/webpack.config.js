const HtmlWebpackPlugin = require('html-webpack-plugin')
const {resolve} = require('path')
module.exports = {
  entry:'./src/index.js',
  output:{
    // 文件名称（指定名称+目录）
    filename:'[name].js',
    // 输出文件目录（将来所有资源输出公共目录）
    path:resolve(__dirname,'built'),
    // 所有资源引入公共路径前缀 --> 'imgs/a.jpg' --> '/imgs/a.jpg'
    publicPath:'/',
    // 非入口文件chunk的名称
    chunkFilename:'js/[name]_chunk.js',
    // 全局整个库向外暴露的变量名
    library:'[name]',
    libraryTarget:'window',//变量名称添加到哪个上 brower
    // libraryTarget:'global',//变量名称添加到哪个上 node
    // libraryTarget:'commonjs',
  },
  plugins:[
    new HtmlWebpackPlugin()
  ],
  mode:'development'
}
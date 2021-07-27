const HtmlWebpackPlugin = require('html-webpack-plugin')
const {resolve} = require('path')
module.exports = {
  entry:'./src/js/index.js',
  output:{
    filename:'[name].js',
    path:resolve(__dirname,'built'),
  },
  module:{
    rules:[
      // loader配置
      {
        test:'/\.css$/',
        // 多个loader用use
        use:['style-loader','css-loader']
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin()
  ],
  mode:'development',
  // 解析模块的规则
  resolve:{
    // 配置解析模块的路径别名,可以简写路径，缺点是路径没有提示
    alias:{
      $css:resolve(__dirname,'src/css')
    },
    // 配置圣罗文件路径的后缀名
    extensions:['.js','.json','.css'],
    // 告诉webpack解析模块是去哪个目录
    modules:[resolve(__dirname,'../../node_modules'),'node_modules']
  }
}
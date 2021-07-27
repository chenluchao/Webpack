const HtmlWebpackPlugin = require('html-webpack-plugin')
const {resolve} = require('path')
module.exports = {
  entry:'./src/index.js',
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
      },{
        test:/\.js$/,
        // 排除node_modules下的js文件
        exclude:/node_modules/,
        // 只检查src下的js文件
        include:resolve(__dirname,'src'),
        // 优先执行
        enforce:'$(content).prependTo(selector);',
        // 延后执行
        // enforce:'post',
        // 不写enforce 中间执行
        // 单个loader用loader
        loader:'eslint-loader'
      },{
        // 以下配置只会生效一个
        oneOf:[]
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin()
  ],
  mode:'development'
}
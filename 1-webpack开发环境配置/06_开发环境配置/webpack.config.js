/* 
  开发环境配置
    运行指令：
      webpack:会将打包结果输出出去
      npx webpack-dev-server 只会在内存中编译打包，不会输出
*/
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test:/\.css/,
        use:[
          // 常见style标签将样式放入
          //'style-loader',
          // 这个loader取代style-loader.作用：提取js中的css成单独文件
          MiniCssExtractPlugin.loader,
          // 将css文件整合到js文件中
          'css-loader'
        ]
      },
      {
        test:/\.(jpg|png|gif)$/,
        loader:'url-loader',
        options:{
          limit:8*1024,
          name:'[hash:10].[ext]',
          esModule:false,
          outputPath:'imgs'
        }
      },
      {
        test:/\.html$/,
        loader:'html-loader'
      },
      {
        exclude:/\.(html|css|less|png|jpg|gif)$/,
        loader:'file-loader',
        options:{
          name:'[hash:10].[ext]',
          outputPath:'media'
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename:'css/built.css'
    })
  ],
  mode: 'development',
  devServer:{
    contentBase:resolve(__dirname,'build'),
    // 启动gzip压缩
    compress:true,
    port:3000,
    open:true
  }
}

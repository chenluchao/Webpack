/* 
  HMR:hot module replacement 热替换/模块热替换
      作用：一个模块发生变化，只会重新打包这一个模块（而不是打包所有模块）
      极大提升构建速度

        样式文件：可以使用HMR功能；因为style-loader内部实现了~
        js文件  ：默认没有HMR功能-->需要添加js代码，添加支持HMR功能的代码
                  注意：HMR功能对js的处理，只能处理非入口js文件
                  if(module.hot){
                    // 一旦module.hot为true，说明开启了HMR功能，-->让HMR功能代码生效
                    module.hot.accept('./prient.js',function(){
                      // 方法监听prient.js文件的变化，一旦变化，其他模块不会重新打包构建
                      // 回字形后面的回调函数
                      print()//执行代码
                    })
                  }
        html文件：默认没有HMR功能，同时会导致html不能热更新了（不需要做HMR功能）
                  解决html不能热更新：修改entry将html文件引入
*/

const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
module.exports = {
  entry: ['./src/index.js','./src/index.html'],
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
    open:true,
    hot:true//开启HMR功能，当修改了webpack配置，新配置要想生效，必须重启webpack服务
  }
}

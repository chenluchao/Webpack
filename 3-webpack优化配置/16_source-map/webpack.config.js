/* 
  HMR:hot module replacement 热替换/模块热替换
      作用：一个模块发生变化，只会重新打包则一个模块（而不是打包所有模块）
      极大提升构建速度

        样式文件：可以使用HMR功能；因为style-loader内部实现了~
        js文件  ：默认没有HMR功能-->需要添加js代码，添加支持HMR功能的代码
                  注意：HMR功能对js的处理，只能处理非入口js文件的其他文件
                  if(module.hot){
                    // 一旦module.hot为true，说明开启了HMR功能，-->让HMR功能代码生效
                    module.hot.accept('./prient.js',function(){
                      // 方法监听prient.js文件的变化，一旦变化，其他模块不会重新打包构建
                      // 回字形后面的回调函数
                      print()//执行代码
                    })
                  }
        html文件：默认没有HMR功能，同时会导致html不能热更新了（不需要座HMR功能）
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
  },
  devtool:'source-map'
}
/* 
  source-map:一种 提供源代码到构建后代码映射的技术（如果构建后代码出错了，通过映射关系可以追溯到源代码错误）
  devtool:取值列表--> [inline-|hidden-|eval-][nosource-][cheap-[module-]]source-map
  * source-map：外部
    错误代码准确信息 和 源代码的准确位置
  * inline-source-map：内联
    只生成一个内联source-map
    错误代码准确信息 和 源代码的准确位置
  * hidden-source-map：外部
    错误代码错误原因但是没有错误位置，不能追溯到源代码位置只能追溯到构建后代码的错误位置
  * eval-source-map：  内联
    每一个文件都生成对应的source-map，都在eval中
    错误代码准确信息 和 源代码的准确位置
  * nosources-source-map：外部
    错误代码准确信息但是没有任何源代码信息
  * cheap-source-map：外部
    错误代码准确信息 和 源代码的准确位置
    只能精确到行
  * cheap-module-source-map：外部
    错误代码准确信息 和 源代码的准确位置
    module会将loader的source mao加入
  注意：内联和外部的区别：1、外部生成了文件，内联没有；2、内联构建速度快

  开发环境：速度快，调试友好
            速度快（eval>inline>cheap>...）
              eval-cheap-source-map
              eval-source-map
            调试友好
              source-map
              cheap-module-source-map
              cheap-source-map
        -->eval-source-map / eval-cheap-module-source-map

  生产环境：源代码要不要隐藏？调试要不要更友好
            内联会让代码体积变大，所以在生产环境中不用内联
            nosources-source-map//全部隐藏
            hidden-source-map//只隐藏源代码，不隐藏构建后代码
        --> SOURCE-MAP / CHEAP-MODULE-SOURCE-MAP
*/
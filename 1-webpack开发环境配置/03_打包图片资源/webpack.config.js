const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        // 使用多个loader使用use
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      // 处理图片资源但是默认处理不了html中的图片
      {
        test: /\.(jpg|png|gif)$/,
        // 使用一个loader用loader
        // 下载两个包url-loader file-loader
        loader: 'url-loader',
        options:{
          // 图片大小小于下面大小就会被base64处理单位字节B
          limit: 8 * 1024,
          // 关闭url-loader的es6模块化解析，而html-loader引入图片是commonjs
          // 解析时会出现[object Module]
          // 解决：关闭url-loader的es6模块化，使用commonjs解析
          esModule:false,
          // [hash:10].[ext]去文件hash前10位.文件名作为文件的名
          name:'[hash:10].[ext]'
        }
      },
      {
        test:/\.html$/,
        // 专门处理html中的img图片。（负责引入img,从而能被url-loader进行处理）
        loader:'html-loader'
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    })
  ],
  mode: 'development',
}

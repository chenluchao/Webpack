const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 设置Nodejs环境变量
process.env.NODE_ENV = 'development'
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
          MiniCssExtractPlugin,
          'css-loader',
          /* 
            css兼容性处理：postcss --> postcss-loader postcss-preset-env
            帮助postcss找到package.json中browserslist里面的配置，通过配置加载指定的css兼容性样式
            "browserslist":{
              //开发环境 --> 设置node环境变量：process.env.NODE_ENV = development
              "development":[
                "last 1 chrom version",
                "last 1 firefox version",
                "last 1 safari version"
              ],
              // 生成环境（默认）
              "production":[
                ">0.2%",
                "not dead",
                "not op_mini all"
              ]
            }
          */
          // 使用loader的默认配置（不需要修改loader配置这么写）
          // 'postcss-loader'
          // 修改loader配置（需要修改loader配置这么写）
          {
            loader:'postcss-loader',
            options:{
              ident:'postcss',
              plugins:()=>[
                // postcss的插件
                require('postcss-preset-env')()
              ]
            }
          }
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
    compress:true,
    port:3000,
    open:true
  }
}

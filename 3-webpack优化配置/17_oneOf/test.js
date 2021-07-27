const {resolve} = require('path')
// 将css打包成单独的文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩css
const OptimizeCssAssetsWwebpackPlugin = require('optimize-css-assets-webpack-plugin')
// 处理html
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 定义nodejs环境变量，决定使用browserslist的哪个环境用于css兼容性处理
process.env.NODE_ENV = 'production'
const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  // css兼容还需在package.json中添加browserslist说明兼容的浏览器版本信息
  {
    loader:'postcess-loader',
    options:{
      ident:'postcss',
      plugin:()=>[
        require('postcss-preset-env')()
      ]
    }
  }
]
module.exports = {
  entry:'./src/js/index.js',
  output:{
    filename:'built.js',
    path:resolve(__dirname,'built')
  },
  module:{
    rules:[
      {
        test:/\.css$/,
        use:[...commonCssLoader]
      },
      {
        test:/\.less$/,
        use:[...commonCssLoader,'less-loader']
      },
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'eslint-loader',
        enforce:'pre',
        options:{
          fix:true
        }
      },
      {
        test:/\.js$/,
        exclude:/node_modules/,
        loader:'babel-loader',
        options:{
          preset:[
            [
              '@babel/preset-env',
              {
                useBuiltIns:'usage',
                corejs:{
                  version:3
                },
                targets:{
                  chrom:'60',
                  firefox:'50',
                  ie:'9',
                  safari:'10',
                  edge:'17'
                }
              }
            ]
          ]
        }
      },
      {
        test:/\.(jpg|png|gif)$/,
        loader:'url-loader',
        options:{
          limit:8*1024,
          name:'[hash:10].[ext]',
          outputPath:'imgs',
          esModule:false
        }
      },
      {
        test:/\.html$/,
        loader:'html-loader'
      },
      {
        exclude:/\.(js|css|less|jpg|png|gif|html)$/,
        loader:'file-loader',
        options:{
          outputPath:'media'
        }
      }
    ]
  },
  plugins:[
    new MiniCssExtractPlugin({
      filename:'css/built.css'
    }),
    new OptimizeCssAssetsWwebpackPlugin(),
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      minify:{
        collapseWhitespace:true,
        removeComments:true
      }
    })
  ],
  mode:'production'
}
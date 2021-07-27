const { resolve } = require('path')
// 将css提取成单独css文件
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 压缩css
const OptimizeCssAssetsWwebpackPlugin = require('optimize-css-assets-webpack-plugin')
// 处理html
const HtmlWebpackPlugin = require('html-webpack-plugin')
/* 
  缓存：
    babel缓存：
      cacheDirectory:true
      --> 让第二次打包构建速度更快
    文件资源缓存：
      hash:每次webpack构建时回升长一个唯一的hash值。
          问题：因为js和css同事使用一个hash值，如果重新打包，会导致所有缓存失效。（可能我却只改动了一个文件）
      chunkhash:根据chunk生成的hash值，如果打包来源于同一个chunk，那么hash的值就一样
          因为css是在js中引入的，所以同属于一个chunk
      contenthash:根据文件的内容生成hash，不同文件hash值一定不一样
      --> 让代码上线运行缓存更好使用
*/
// 定义nodejs环境变量，决定使用browserslist的哪个环境用于css兼容性处理
process.env.NODE_ENV = 'production'
// 复用loader
const commonCssLoader = [
  MiniCssExtractPlugin.loader,
  'css-loader',
  {
    // 还需要在package.json中添加需要兼容的浏览器信息browserslist
    loader: 'postcss-loader',
    options: {
      ident: 'postcss',
      plugins: () => [require('postcss-preset-env')()],
    },
  },
]
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.[contenthash:10].js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude:/node_modules/,
        loader:'babel-loader',
        options:{
          presets:[
            [
              '@babel/preset-env',
              {
                // 按需下载
                useBuiltIns:'usage',
                // 指定corejs版本
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
          ],
          // 开启babel缓存
          // 第二次构建时，会读取之前的缓存
          cacheDirectory:true
        }
      },
      {
        // 一下loader只会匹配一个（一个文件匹配到一个时，就不在去匹配别的test）
        // 注意：不能有两个配置处理同一种类型文件
        oneOf:[
          {
            test: /\.css$/,
            use: [...commonCssLoader],
          },
          {
            test: /\.less$/,
            use: [...commonCssLoader, 'less-loader'],
          },
          /* 
            通常来讲，一个文件只能被一个loader处理
            当一个文件要被多个loader处理，name一定要指定loader执行的先后顺序
              线执行eslint 在执行babel
          */
          {
            // 对js语法检查
            // 在package.json中添加
            // "eslintConfig":{
            //   "extends":"airbnb-base"
            // }
            test: /\.js$/,
            exclude:/node_modules/,
            loader:'eslint-loader',
            // 优先执行
            enforce:'pre',
            options:{
              fix:true
            }
          },
          {
            test:/\.(jpg|png|gif)$/,
            loader:'url-loader',
            options:{
              limit:8* 1024,
              name:'[hash:10].[ext]',
              outputPath:'imgs',
              esModule:false
            }
          },
          {
            test:/\.html/,
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
      }
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/built.[contenthash:10].css',
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
  mode: 'production',
}

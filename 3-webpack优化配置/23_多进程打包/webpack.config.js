const { resolve } = require('path')
// 处理html
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 引入PWA
const WorkboxWebpackPlugin = require('workbox-webpack-plugin')
/* 
  PWA渐进式网络开发应用程序（离线可访问）
    workbox --> workbox-webpack-plugin
*/

// 定义nodejs环境变量，决定使用browserslist的哪个环境用于css兼容性处理
process.env.NODE_ENV = 'production'
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'js/built.[contenthash:10].js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
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
        exclude: /node_modules/,
        loader: 'eslint-loader',
        // 优先执行
        enforce: 'pre',
        options: {
          fix: true,
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          /* 
            开启多进程打包
            进程启动大概为600ms,进行通信也有开销
            只有工作消耗时间比较长，才需要多进程打包
          */
          {
            loader:'thread-loader',
            options:{
              workers:2 //进程2
            }
          },
          {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    // 按需下载
                    useBuiltIns: 'usage',
                    // 指定corejs版本
                    corejs: {
                      version: 3,
                    },
                    targets: {
                      chrom: '60',
                      firefox: '50',
                      ie: '9',
                      safari: '10',
                      edge: '17',
                    },
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif)$/,
        loader: 'url-loader',
        options: {
          limit: 8 * 1024,
          name: '[hash:10].[ext]',
          outputPath: 'imgs',
          esModule: false,
        },
      },
      {
        test: /\.html/,
        loader: 'html-loader',
      },
      {
        exclude: /\.(js|css|less|jpg|png|gif|html)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'media',
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      },
    }),
    new WorkboxWebpackPlugin.GenerateSW({
      /* 
        1、帮助servicework快速启动
        2、删除旧的servicework

        生成一个servicework配置文件~
      */
      clientsClaim: true,
      skipWaiting: true,
    }),
  ],
  mode: 'production',
}

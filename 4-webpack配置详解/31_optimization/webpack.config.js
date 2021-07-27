const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const { resolve } = require('path')
module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: '[name].js',
    path: resolve(__dirname, 'built'),
    chunkFilename:'js[name].[contenthash:10]_chunk.js'
  },
  module: {
    rules: [
      // loader配置
      {
        test: '/.css$/',
        // 多个loader用use
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  plugins: [new HtmlWebpackPlugin()],
  mode: 'development',
  // 解析模块的规则
  resolve: {
    // 配置解析模块的路径别名,可以简写路径，缺点是路径没有提示
    alias: {
      $css: resolve(__dirname, 'src/css'),
    },
    // 配置圣罗文件路径的后缀名
    extensions: ['.js', '.json', '.css'],
    // 告诉webpack解析模块是去哪个目录
    modules: [resolve(__dirname, '../../node_modules'), 'node_modules'],
  },
  optimization: {
    splitChunk: {
      chunks: 'all',
      // 以下为默认值
      // miniSize: 30 * 1024, //分割的chunk最小为30kb
      // maxSize: 0, //最大没有限制
      // miniChunks: 1, //要提取的chunk最少被引用1次
      // maxAsyncRequests:5,//按需加载时并行加载的文件的最大数量
      // maxInitialRequests:3,//入口js文件最大并行请求数量
      // automaticNameDelimiter:'~',//名称链接符
      // name:true,//可有使用命名规则
      // cacheGroups:{//分割chunks的组
      //   // node_modules文件会被打包到venders组的chunk中-->venders-xxx.js
      //   // 满足上面的公共规则，如大小超过30kb，至少被引用1次
      //   vendors:{
      //     test:/[\\/]node_modules[\\/]/,
      //     priority:-10
      //   },
      //   default:{
      //     //要提取的chunk最少被引用2次
      //     minChunks:2,
      //     priority:-20,
      //     // 如果当前要打包的模块，和之前已经被提取的模块是同一个，就会服用，而不是重新打包模块。
      //     reuseExistingChunk:true
      //   }
      // }
    },
    runtimeChunk:{
      // 将当前模块的记录其他模块的hash单独打包称为一个文件runtime
      // 解决：修改a文件导致b文件的contenthash变化
      name:entrypoint => `runtime-${entrypoint.name}`
    },
    minimizer:[
      // 配置生产环境的压缩方案：js和css
      new TerserWebpackPlugin({
        // 开启缓存
        cache:true,
        // 开启多进程打包
        parallel:true,
        // 开启source-map
        sourceMap:true
      })
    ]
  },
}

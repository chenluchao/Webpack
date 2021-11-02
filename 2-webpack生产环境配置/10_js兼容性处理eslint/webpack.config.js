const HtmlWebpackPlugin = require('html-webpack-plugin')
const { resolve } = require('path')
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'js/built.js',
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      /* 
        js兼容性处理：babel-loader @babel/core
          1、基本js兼容性处理 --> @babel/preset-env
             问题：只能转换基本语法，如Promise语法不能转换
          2、全部js兼容性处理 --> @babel/polyfill
                在需要的js文件中直接引入 `import @babel/polyfill` 即可
             问题：我只要解决部分兼容性问题，但是将所有兼容性代码引入，增大了代码的体积
          3、需要做兼容性处理的就做：按需加载 --> core-js

      */
     {
       test:/\.js$/,
       exclude:/node_modules/,
       loader:'babel-loader',
       options:{
        //  预设：指示babel座怎么样的兼容性处理
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
         ]
       }
     }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    }),
  ],
  mode: 'development',
}
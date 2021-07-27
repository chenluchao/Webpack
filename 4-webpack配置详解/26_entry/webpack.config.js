const HtmlWebpackPlugin = require('html-webpack-plugin')
const {resolve} = require('path')
/* 
  entry:入口起点
    1、String --> './src/index.js'
        打包形成一个chunk，输出一个bundle文件
    2、Arrary --> ['./src/index.js','./src/add.js']
        多入口
        所有入口文件最终只会形成一个chunk,输出出去只有一个bundle文件
        -->只有在HMR功能中让html热更新生效
    3、Object
        多入口
        有几个入口文件就形成几个chunk,输出就有几个bundle文件
        此时chunk的名称是key
        特殊用法--> 
        entry:{
          // 所有文件最终只会形成一个chunk，输出出去只有一个bundle文件
          index:['./src/index.js','./src/count.js'],
          // 形成一个chunk,输出一个bundle文件。
          add:'./src/add.js'
        }

*/
module.exports = {
  entry:{
    index:['./src/index.js','./src/count.js'],
    add:'./src/add.js'
  },
  output:{
    filename:'[name].js',
    path:resolve(__dirname,'built')
  },
  plugins:[
    new HtmlWebpackPlugin()
  ],
  mode:'development'
}
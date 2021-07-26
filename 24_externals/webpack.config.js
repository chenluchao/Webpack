/* 
  externals:拒绝一些包被打包，减小打宝体积
*/

const { resolve } = require('path')
const Htmlwebpackplugin = require('html-webpack-plugin')
module.exports ={
  entry:'./src/index.js',
  output:{
    filename:'/js/built.js',
    path:resolve(__dirname,'build')
  },
  module:{
    rules:[]
  },
  plugins:[
    new Htmlwebpackplugin({
      template:'./src/index.html'
    })
  ],
  mode:'production',
  externals:{
    // 拒绝jQuery被打包进来,在这里拒绝后如果需要用该资源需要手动在html中引入该资源
    jquery:'jQuery'
  }
}
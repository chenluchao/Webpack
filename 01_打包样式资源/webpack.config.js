/* 
  webpack.config.js webpack的配置文件
    作用：指示webpack干哪些活（当你运行webpack指令时，会加载里面的配置）
    所有构件攻坚都是基于node平台运行的-模块化默认采用commonjs.
*/

// resolve用来拼接绝对路径的方法
const { resolve } = require('path')

module.exports = {
  // webpack配置
  // 模式
  mode: 'development', //开发模式
  // mode:'production',//生成环境
  // 入口文件
  entry: './src/index.js',
  // 输出
  output: {
    filename: 'built.js',
    // 输出路径
    // __dirname node.js的变量，代表当前文件的目录绝对路径
    path: resolve(__dirname, 'build'),
  },
  module: {
    rules: [
      // 详细loader配置,不同文件必须配置不同loader处理
      {
        //处理css
        test: /\.css$/,
        use: [
          'style-loader', //创建style标签将js中的样式资源插入进去，添加到head中生效（第二步）
          'css-loader', //将css文件以字符串的形式变成commonjs模块加载到js中，里面内容是样式字符串（第一步）
        ],
      },
      {
        // 处理less
        test: /\.less$/,
        use: [
          'style-loader', //将commonjs模块引入head
          'css-loader', //将css转成commonjs模块
          'less-loader'//将less转成css
        ],
      }
    ],
  },
  // plugins配置
  plugins: [
    // 详细
  ],
}

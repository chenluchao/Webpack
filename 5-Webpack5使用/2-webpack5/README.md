# Webpack5

## 此版本重点关注以下内容
* 通过持久缓存提高构建性能
* 使用更好的算法和默认值来改善长期缓存
* 通过更好的树摇和代码生成来改善捆绑包大小
* 清除处于怪异状态的内部结构，同时在V4中实现功能而不引入任何重大更改
* 通过引入重大更改变更来为将来的功能做准备，以使我们能够尽可能长时间地使用v5
## 自动删除Node.js Polyfills
* 早起，webpack的目标是允许在浏览器中运行大多数的node.js模块，但是模块歌剧发生了变化，许多模块用途现在主要是为前端目的而编写的，webpack<=4附带了许多node.js核心模块的polyfill,一旦模块使用任何核心模块（如crypto模块），这些模块就会自动应用。
* 尽管这使使用为node.js编写的模块变得容易，单它会将这些巨大的polyfill添加到包总，许多情况下，这些polyfill是不惜要的。
* webpack5会自动停止填充这些核心模块，并专注于与前端兼容的模块
* 迁移：
  * 尽可能尝试使用与前端兼容的模块
  * 可以为node.js核心模块手动添加一个polyfill，错误消息将提示如何实现该目标
## Chunk和模块ID
添加了用于长期缓存的新算法，在生产模式下默认启用这些功能
`chunkIds:"deterministic",moduleIds:"deterministic"`
## Chunk ID
你可以不用使用`import(/* webpackChunkName:"name" */ "module")`在开发环来为chunk命名，生产环境还是有必要的webpack内部有chunk命名规则，不在是以id(0,1,2)命名了
## Tree Shaking
1. webpack现在能够处理对前台模块的tree shaking
2. webpack现在能够多个模块之前的关系
3. webpack现在能处理Commonjs的tree shaking
## Output
webpack4默认只输出ES5代码
webpack5开始新增一个属性output.ecmaVersion,可以生成ES5和ES6/ES2015代码
如：`output.ecmaVersion:2015`
## SplitChunk
```javascript
// webpack4
miniSize:30000
// webpack5
miniSize:{
  javascript:30000,
  style:50000
}
```
## Caching
```javascript
// 配置缓存
cache:{
  // 磁盘存储
  type:"filesystem",
  buildDependencies:{
    // 当配置修改时，缓存失效
    config:[__filename]
  }
}
```
* 缓存将存储到`node_modules/.cache/webpack`
## 监视输出文件
* 之前webpack 总是在第一次构建时输出全部文件，但是监视重新构建时只会更新修改的文件此次更新在第一次和构建时会找到输出文件看是否有变化，从而决定要不要输出全部文件
## 默认值
* `entry:"./src/index.js"`
* `output.path:path.resolve(__dirname,"dist")`
* `output.filename:"[name].js"`
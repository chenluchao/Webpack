/* 
  通过js代码，让某个文件被单独打包成一个chunk
  import动态导入语法，能将某个文件单独打包
*/
import(/* webpackChunkName:'test' */ './test')
  .then((mull, count) => {
    // 文件加载成功
    // eslint-disable-next-line
    console.log(mull(2, 5))
  })
  .catch(() => {
    console.log('文件加载失败~')
  })

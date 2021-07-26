console.log('index.js被加载~')
// import { mull } from './test'

document.getElementById('btn').onclick = function () {
  // 懒加载~:当文件需要使用时才加载
  // 预加载：webpackPrefetch:true：会在使用之前，提前加载js文件
  // 正常加载可以认为是并行加载（同一时间加载多个文件）预加载会等其他资源加载完毕，浏览器空闲了，再偷偷加载资源
  import(/* webpackChunkName:'test',webpackPrefetch:true */'./test.js').then(({mull})=>{
    console.log(mull(2, 5))
  })
};

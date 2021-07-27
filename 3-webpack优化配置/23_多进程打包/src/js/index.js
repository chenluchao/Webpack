console.log('index.js被加载~')
import { mull } from './test'
console.log(mull(3, 4))

/* 
  1、eslint不认识window.navigator全局变量
  解决：需要修改package.json中eslint配置
      "env":{
        "brower":true//支持浏览器端全局变量
      }
  2、SW代码必须运行在服务器上

*/


// 注册serviceWorker
// 处理兼容问题
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => {
        console.log('serviceworker注册成功~')
      })
      .catch(() => {
        console.log('serviceworker注册失败~')
      })
  })
}

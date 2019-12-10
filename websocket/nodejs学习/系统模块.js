const os = require('os')        // 获取操作系统信息
const path = require('path')    // 操作文件路径
const url = require('url')      // 解析URL模块

console.log(os.totalmem())      //获取系统总内存

console.log(path.extname('C:\nodejs学习\系统模块.js'))     //获取文件后缀

let new_url = url.parse('http://www.baidu.com?id=16&name=zhangsan', true)
console.log(new_url.query.name)      // 获取表单GET提交的参数

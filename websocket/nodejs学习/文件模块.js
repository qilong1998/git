const fs = require('fs')        // 引入官方fs模块

let content = '你好啊，我叫谁谁谁，哒哒哒一堆内容'
// 调用writeFile创建文件
/* fs.writeFile('file/a.txt', content, (err) => {
    if (err) {
        console.log(err)
        return
    }
    console.log('写入成功')
}) */

// 调用readFile 读取文件
fs.readFile('file/a.txt', 'utf-8', (err, data) => {
    if (err) {
        console.log('读取失败了')
        return
    }
    console.log(data)
})
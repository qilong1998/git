const http = require('http')        //引入http模块
const fs = require('fs')            // 引入文件模块

let server = http.createServer()    // 创建web服务器对象

server.on('request', (req, res) => {        // 监听请求 -> 响应内容
    /* console.log(req.url)        // 获取用户请求路径
    console.log('接受到了用户请求！')
    rep.end('请求结束') */
    res.setHeader('content-type', 'text/html;charset=utf-8')        // 中文乱码问题
    if (req.url == '/login') {
        fs.readFile('file/login.html', 'utf-8', (err, data) => {
            if (err) {
                res.end('读取失败了')
                return
            }
            res.end(data)
        })
    }else if (req.url == '/reg') {
        fs.readFile('file/reg.html', 'utf-8', (err, data) => {
            if (err) {
                res.end('读取失败了')
                return
            }
            res.end(data)
        })
    }else{
        res.end('404')
    }
})

//启动服务
server.listen(3000, () => {
    console.log('服务器启动成功！')
})



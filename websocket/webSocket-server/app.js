// 1.导入nodejs-websocket包
const ws = require('nodejs-websocket')
PORT = 3000

// 2.创建一个server
// 2.1如何处理用户的请求

// 每次只要有用户连接，函数就会被执行，会给当前连接的用户创建一个connect对象
const server = ws.createServer(connect => {
    console.log('有用户连接进来了')
    connect.on('text', data => {
        console.log('接收到了用户的数据', data)
        connect.send(data)
    })

    connect.on('close', () => {
        console.log('连接断开了')
    })
    connect.on('error', () => {
        console.log('连接失败了')
    })
})

server.listen(PORT, () => {
    console.log('websocket服务启动成功了，监听了端口' + PORT)
})
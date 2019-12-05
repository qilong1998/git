const ws = require('nodejs-websocket')
const PORT = 3000

// 记录当前连接总用户数量
let count = 0

const server = ws.createServer(connect => {
    count++
    connect.userName = `用户${count}`
    //告诉所有人有人加入到聊天室
    broadcast(`${connect.userName}进入了聊天室`)

    // 接收到浏览器的数据
    connect.on('text', data => {
        // 当我们接收到某个用户的信息的时候，告诉所有用户，发送的内容是什么
        broadcast(data)
    })
    // 关闭连接是触发
    connect.on('close', data => {
        console.log('关闭连接')
        count--
        broadcast(`${connect.userName}离开了聊天室`)
    })
    // 连接异常时触发
    connect.on('error', data => {
        console.log('连接异常')
    })
})

// 定义一个函数  广播
function broadcast(msg) {
    // 表示所有的用户
    server.connections.forEach(item => {
        item.send(msg)
    })
}

server.listen(PORT, () => {
    console.log('服务端已开启，监听端口' + PORT)
})
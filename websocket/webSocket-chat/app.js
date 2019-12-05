const ws = require('nodejs-websocket')
const PORT = 3000
const TYPE_ENTER = 0
const TYPE_LEAVE = 1
const TYPE_MSG = 2

/* 
    分析
      消息不应该是一条简单的字符串
      消息应该是一个对象
      type：消息的类型，0：表示用户进入聊天室的消息 1：用户离开聊天室的消息 2：正常的聊天消息
      msg：消息的基本内容
      time：消息的时间
*/

// 记录当前连接总用户数量
let count = 0

const server = ws.createServer(connect => {
    count++
    connect.userName = `用户${count}`
    //告诉所有人有人加入到聊天室
    broadcast({
        type: TYPE_ENTER,
        msg: `${connect.userName}进入了聊天室`,
        time: new Date().toLocaleTimeString()
    })

    // 接收到浏览器的数据
    connect.on('text', data => {
        // 当我们接收到某个用户的信息的时候，告诉所有用户，发送的内容是什么
        broadcast({
            type: TYPE_MSG,
            msg: data,
            time: new Date().toLocaleTimeString()
        })
    })
    // 关闭连接是触发
    connect.on('close', data => {
        console.log('关闭连接')
        count--
        broadcast({
            type: TYPE_LEAVE,
            msg: `${connect.userName}离开了聊天室`,
            time: new Date().toLocaleTimeString()
        })
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
        item.send(JSON.stringify(msg))
    })
}

server.listen(PORT, () => {
    console.log('服务端已开启，监听端口' + PORT)
})
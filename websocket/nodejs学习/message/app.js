// 1. 引入http模块
let http = require('http')
let fs = require('fs')
let url = require('url')

//创建留言数据对象
let msgs = [
    {name: '张三', content: '你好我是你的朋友', time: '2019-12-5 10:20:30'},
    {name: '张三', content: '你好我是你的朋友', time: '2019-12-5 10:20:30'},
    {name: '张三', content: '你好我是你的朋友', time: '2019-12-5 10:20:30'}
]
// 2. 创建web服务器
let server = http.createServer()
// 3. 监听用户请求
server.on('request', (req, res) => {
    //获取当前请求的URL地址
    currentUrl = req.url
    
    res.setHeader('content-type', 'text/html;charset=utf-8')

    if (currentUrl == '/') {    // 首页
        fs.readFile('view/index.html', 'utf-8', (err, data) => {
            if (err) {
                console.log(err)
                return
            }
            // 将上面的变量数据 组装成html
            let html = ''
            msgs.forEach((item) => {
                html += `<li class="list-group-item">${item.name}:${item.content}<span class="pull-right">${item.time}</span></li>`
            })
            list = data.replace('^_^', html)
            
            res.end(list)       //list 是所有首页的html代码 需求里面的列表动态化
        })
    } else if (currentUrl == '/add') {  //添加页面
        fs.readFile('view/add.html', 'utf-8', (err, data) => {
            if (err) {
                console.log(err)
                return
            }
            res.end(data)
        })
    } else if (currentUrl.indexOf('/doadd') === 0) {  //数据处理页面
        // res.end('提交数据处理')
        // 理论上是给数据库添加一条数据
        let urlObj = url.parse(req.url, true)
        let date = new Date()
        date = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
        let msg = {
            name: urlObj.query.name,
            content: urlObj.query.content,
            time: date
        }
        msgs.push(msg)
        res.statusCode = 302    // 重定向
        res.setHeader('location', '/')
        res.end()
    }else{  // 404页面
        fs.readFile('view/404.html', 'utf-8', (err, data) => {
            if (err) {
                console.log(err)
                return
            }
            res.end(data)
        })
    }
    //响应用户需求
    // res.end(currentUrl)
})

// 4. 启动服务器
server.listen(3000, () => {
    console.log('服务器启动成功！')
})
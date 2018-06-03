const Koa = require('koa')
const app = new Koa()
const cors = require('koa2-cors')
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const log4js = require('log4js')
const session = require('koa-session')
const bodyparser = require('koa-bodyparser')
// const logger = require('koa-logger')

// 引入路由接口文件
const index = require('./routes/index')
const signin = require('./routes/signin')
const signup = require('./routes/signup')
const user = require('./routes/user')

// 错误处理
onerror(app)

// log4js 日志管理
log4js.configure('./config/log4js.json');
var logger = log4js.getLogger('info'); // 获取logger对象，可以赋予名称
logger.level = 'debug'; // 设置日志级别
logger.debug("HI,Girls"); // 输出日志信息


// Session配置信息
app.keys = ['a little apple']  
const CONFIG = {
  key: 'sess',
  maxAge: 1200000,  // session 期限为20分钟
  overwrite: true,
  httpOnly: true,
  signed: true,
  rolling: false,
  renew: false
}
app.use(session(CONFIG, app))  // 挂载session中间件

// post 请求体解析
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))

// 挂载 json 解析中间件
app.use(json())

// 配置静态文件目录
app.use(require('koa-static')(__dirname + '/public'))

// 指定视图文件目录及渲染模板
app.use(views(__dirname + '/views', {
  extension: 'ejs'
}))

// 跨域请求设置
app.use(cors({
  origin: function (ctx) {
      if (ctx.url === '/test') {
          return "*"; // 允许来自所有域名请求
      }
      return 'http://localhost:8080'; // 这样就能只允许 http://localhost:8080 这个域名的请求了
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

// koa-logger日志记录配置
// app.use(logger())
// app.use(async (ctx, next) => {
//   const start = new Date()
//   await next()
//   const ms = new Date() - start
//   console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
// })

// 挂载路由接口
app.use(index.routes(), index.allowedMethods())
app.use(signin.routes(), signin.allowedMethods())
app.use(signup.routes(), signup.allowedMethods())
app.use(user.routes(), user.allowedMethods())

// 全局错误监听-koa自带
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app

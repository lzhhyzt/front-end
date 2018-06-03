var mysql = require('mysql')
var config = require('../config/index.js')

// 创建线程池
var pool = mysql.createPool({
  host: config.database.HOST,
  port: config.database.PORT,
  user: config.database.USERNAME,
  password: config.database.PASSWORD,
  database: config.database.DATABASE
})

// 创建执行方法：增删查改都可以执行
let query = function (sql, values ) {
  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        resolve(err)
      } else {
        connection.query(sql, values, (err, rows) => {

          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })
}

// 注册用户操作
let insertData = function (value) {
  let _sql = "insert into users(name,pass) values(?,?);"
  return query(_sql, value)
}

// 通过名字查找用户操作
let findDataByName = function (name) {
  let _sql = `
    SELECT * from users
      where name=?
      `
  return query(_sql, name)
}

// 查询所有用户
let queryAllUsers = function () {
  let _sql = `select * from users`
  return query(_sql)
}

module.exports = {
  insertData,
  findDataByName,
  queryAllUsers
}
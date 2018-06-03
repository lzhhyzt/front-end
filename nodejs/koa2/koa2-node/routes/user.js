var router = require('koa-router')();
var userModel = require('../config/mysql.js')


router.get('/users/allUser', async (ctx, next) => {

  await userModel.queryAllUsers().then(result => {
    ctx.body = result

  }).catch(err => {
    ctx.body = 'false'
  })
})

module.exports = router
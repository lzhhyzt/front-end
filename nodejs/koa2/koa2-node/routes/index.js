var router = require('koa-router')();


router.get('/', async (ctx, next) => {
    console.log('cookies', ctx.cookies.get('OP'))
    console.log('session', ctx.session)
    await ctx.render('index', {
        session: ctx.session
    })

})

router.get('/index', async (ctx, next) => {
    ctx.redirect('/')
})

router.get('/data', async (ctx, next) => {
    var obj = {
        name: 'mike',
        age: 21,
        sex: '男'
    }
    ctx.body = JSON.stringify(obj)
})

module.exports = router
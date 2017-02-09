const path = require('path')
var Koa = require('koa');
var router = require('koa-router')();
var views = require('koa-views');
var serve = require('koa-static');

var app = new Koa();
const log4js = require('./log')(app);
const logger = log4js.getLogger('app');

var videobll = require('./model/videoBll')

app.use(views(__dirname + '/views', {
    extension: 'ejs'
}));
app.use(serve('./public'))
router.get("/index", function (ctx, next) {
    next();
    return ctx.render('index')
})
router.get("(/home|/)", function (ctx, next) {
    next();
    return ctx.render('home')
})
router.get("/list", function (ctx, next) {
    next();
    return ctx.render('list')
})
router.get("/detail", function (ctx, next) {
    next();
    return ctx.render('detail')
})

app.use(router.routes()).use(router.allowedMethods());
app.listen(80);
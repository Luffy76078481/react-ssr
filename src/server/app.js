import serverRender from "./render"
import serverStore from '../store/serverStore'
import routes from '../routes/routes'
import { matchRoutes } from 'react-router-config'

global.fetch = require("node-fetch");


// 导入koa，和koa 1.x不同,在koa2中，我们导入的是一个class，因此用大写的Koa表示:
const Koa = require('koa');

const app = new Koa();


/* 代理配置 start */
const proxy = require('koa2-proxy-middleware'); //引入代理模块
const options = {
    targets: {
        // (.*) means anything
        '/api/(.*)': {
            target: 'http://cgtest02.com/',
            changeOrigin: true,
        },
        '/musicRankingsDetails': {
            target: 'http://api.apiopen.top/',
            changeOrigin: true,
        },
        
    }
}
app.use(
    proxy(options)
);
const bodyparser = require('koa-bodyparser')
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
/* 代理配置 end */



// log request URL:
app.use(async (ctx, next) => {
    console.log(`Process ${ctx.request.method} ${ctx.request.url}...`);
    if (ctx.request.url.indexOf("/api/v0") === -1){
        await next();
    }
});




var router = require('koa-router')();
 
router.get('*', async (ctx, next) => {
    if (ctx.request.url.indexOf("/static/") !== -1){
        return next();
    }
    const context = { css: [] }
    const store = serverStore();
    const matchedRoutes = matchRoutes(routes, ctx.request.path)
    const promises = []
    for (const item of matchedRoutes) {
        if (item.route.loadData) {
            const promise = new Promise((resolve, reject) => {
                item.route.loadData(store).then(resolve).catch(resolve)
            })
            promises.push(promise)
        }
    }
    await Promise.all(promises).then(() => {
        ctx.response.body = serverRender(ctx.request, store, context);
    })
});


app.use(router.routes());


app.use(require('koa-static')(process.cwd() + '/clientBuild'));


// 在端口3000监听:
app.listen(3006);
console.log('app started at port 3006...');
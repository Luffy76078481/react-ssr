import serverRender from "./render"
import serverStore from '../store/serverStore'
import routes from '../routes/routes'
import { matchRoutes } from 'react-router-config'
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable/webpack';
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
    if (ctx.request.url.indexOf("/api/v0") === -1) {
        await next();
    }
});




var router = require('koa-router')();

router.get('*', async (ctx, next) => {
    ctx.set('Cache-Control', 'cache');
    if (ctx.request.url.indexOf("/static/") !== -1) {
        return next();
    }
    const context = { css: [] }
    const store = serverStore();

    const matchedRoutes = matchRoutes(routes, ctx.request.path).map(({ route }) => {
        if (!route.component.preload) { // 同步组件
            return route.component;
        } else { // 异步组件
            console.log("异步组件")
            return route.component.preload().then(res => res.default)
        }
    })
    const loadedComponents = await Promise.all(matchedRoutes);
    const promises = loadedComponents.map(component => {
        console.log(component)
        console.log(component.loadData)
        return component.loadData ? component.loadData(store) : Promise.resolve(null)
    })
    await Promise.all(promises).catch(err => console.log('err:---', err))
    ctx.response.body = serverRender(ctx.request, store, context);
});


app.use(router.routes());


app.use(require('koa-static')(process.cwd() + '/clientBuild'));

Loadable.preloadAll().then(() => {
    app.listen(3006, () => {
        console.log('Running on http://localhost:3006/');
    });
});
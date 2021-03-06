import serverRender from "./render"
import serverStore from '../store/serverStore'
import routes from '../routes/routes'
import { matchRoutes } from 'react-router-config'
import Loadable from 'react-loadable';
global.fetch = require("node-fetch");




const compress = require('koa-compress');

const Koa = require('koa');

const app = new Koa();

app.use(
    compress({
        filter: function (content_type) { // 只有在请求的content-type中有gzip类型，我们才会考虑压缩，因为zlib是压缩成gzip类型的
            return /text/i.test(content_type);
        },
        threshold: 1024, // 阀值，当数据超过1kb的时候，可以压缩
        flush: require('zlib').Z_SYNC_FLUSH // zlib是node的压缩模块
    }))


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
    console.log(`〓〓〓Process ${ctx.request.method} ${ctx.request.url}...`);
    if (ctx.request.url.indexOf("/api/v0") === -1) {
        await next();
    }
});




var router = require('koa-router')();

router.get('*', async (ctx, next) => {
    ctx.set('Cache-Control', 'public, max-age=60');//服务端代理端和浏览器都都可缓存，max-age浏览器时间，秒
    ctx.compress = true
    if (ctx.request.url.indexOf("/static/") !== -1) {
        return next();
    }
    const context = { css: [] }
    const store = serverStore();

    const matchedRoutes = matchRoutes(routes, ctx.request.path).map(({ route }) => {
        if (!route.component.preload) { // 同步组件
            return route.component;
        } else { // 异步组件
            return route.component.preload().then(res => res.default)
        }
    })
    const loadedComponents = await Promise.all(matchedRoutes);
    const promises = loadedComponents.map(component => {
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
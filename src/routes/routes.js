import React from 'react'
import Loadable from 'react-loadable';
import Home from '../pages/home/Home'
// import Weather from '../pages/weather/Weather'


const Loading = (props) => {
    if (props.error) {
        return <div style={{ "background": "red" }}>Error!<button onclick={props.retry}>{Retry}</button></div>
    } else if (props.timedOut) {
        return <div>Taking a long time... <button onClick={props.retry}>Retry</button></div>;
    } else if (props.pastDelay) {
        return <div style={{ "background": "red" }}>Loading...</div>
    } else {
        return null;
    }
}

// @TODO 懒加载开发
const WeatherLazy = Loadable({
    loader: () => import('../pages/weather/Weather'),
    loading: Loading,
    delay: 300,//低于多少毫秒不显示中间层/
    timeout: 10000,
});

export default [
    {
        path: '/',
        component: Home,
        loadData: Home.loadData,
        exact: true,
    },
    {
        path: '/weather',
        component: WeatherLazy,
        loadData: () => import('../pages/weather/Weather'),
    },
    // {
    //     path: '/weather',
    //     component: Weather,
    //     loadData: Weather.loadData,
    // },
    //   {
    //     path: '/article-detail/:id',
    //     component: ArticalDetail,
    //     loadData: ArticalDetail.loadData
    //   },

    // {
    //     path: '*',
    //     component: 404,
    // }
]

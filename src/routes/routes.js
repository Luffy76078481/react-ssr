import React, { Suspense } from 'react'

import Home from '../pages/home/Home'
import Weather from '../pages/weather/Weather'

// @TODO 懒加载开发
// const Weather = React.lazy(() => import('../pages/weather/Weather'))
// const WeatherLazy = () => <Suspense fallback={<div>加载中，请稍后...</div>}>
//     <Weather />
// </Suspense>

export default [
    {
        path: '/',
        component: Home,
        loadData: Home.loadData,
        exact: true,
    },
    // {
    //     path: '/weather',
    //     component: WeatherLazy,
    //     // loadData: Weather.loadData,
    // },
    {
        path: '/weather',
        component: Weather,
        loadData: Weather.loadData,
    },
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

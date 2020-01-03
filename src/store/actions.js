import config from "config"
import axios from 'axios'

const BaseApiAction = parame => (dispatch, getState) => {
    let meth = parame.requestMethod === "post" ? "data" : "params";
    // 讲道理下面的写法应该就够了，因为正常开发一般API就一个地址，如果多个地址一般也是有服务端转发
    // let url = typeof window !== 'undefined' ? config.apiPath + parame.path : config.fullPath + parame.path;
    //模板效果暂时使用，正式开发应该用上面的规则
    let url = parame.path.indexOf("http") !== -1 ? parame.path : typeof window !== 'undefined' ? parame.path : config.fullPath;
    return axios({
        method: parame.requestMethod,
        url,
        [meth]: parame.body,
    }).then(res => {
        if (parame.type)
            dispatch({ type: parame.type, data: res.data })
        return res.data
    }).catch(e => {
        console.log(url, '----err-message:', e.message);
    })
}


// export const testPostAction = body => {
//     return BaseApiAction({
//         requestMethod: "post",
//         path: "Account/Login",
//         body
//     });
// }

export const getWeatherAction = body => {
    return BaseApiAction({
        requestMethod: "get",
        path: "http://wthrcdn.etouch.cn/weather_mini",
        type: "Weather",
        body
    });
}

export const getMusicList = body => {
    return BaseApiAction({
        requestMethod: "get",
        path: "/musicRankingsDetails",
        type: "MusicList",
        body
    });
}



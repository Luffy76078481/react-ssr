import axios from 'axios';

axios.defaults.headers = {
    "Content-Type": "application/json;charset=UTF-8"
}


axios.defaults.transformRequest = [function (data) {
    return JSON.stringify(data)
}]




// 请求拦截
// import clientStore from './store/clientStore'
// axios.interceptors.request.use((config)=>{
//   const xAuthToken = localStorage.getItem('X-Auth-Token')
//   if (xAuthToken) {
//     config.headers['Authorization'] =`Bearer ${xAuthToken}`
//   }
//   clientStore.dispatch({
//     type: "LOADING_BEGIN"
//   })
//   return config
// });
//响应拦截
// axios.interceptors.response.use((config)=>{
//   clientStore.dispatch({
//     type: "LOADING_END"
//   })
//   return config
// }, () => {
//   message.error('请求失败');
//   clientStore.dispatch({
//     type: "LOADING_END"
//   })
// });

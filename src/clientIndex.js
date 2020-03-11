import React from 'react'
import ReactDom from 'react-dom'
import Fream from './pages/fream'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import clientStore from './store/clientStore'
// import '../interceptors'
// import { Observable, interval } from 'rxjs' //导入类
// var ob = Observable.create(function (obs) {
//     obs.next(1)
//     obs.next(1)
//     let intervalID = setInterval(() => {
//         console.log("zaishuchu")
//         obs.next(1222)
//     }, 1000)
//     return () => {
//         console.log("自定义的")
//         clearInterval(intervalID);
//     };
// });

// var subscription = ob.subscribe({
//     next: function (value) {
//         console.log(value)
//     },
//     complete: function () {
//         console.log('complete!');
//     },
//     error: function (error) {
//         console.log('Throw Error: ' + error)
//     }
// });

// setTimeout(() => {
//     console.log("注销")
//     subscription.unsubscribe();
// }, 4000);
const root = document.getElementById('root')
if (module.hot) {
    ReactDom.render(
        <AppContainer>
            <Provider store={clientStore}>
            <BrowserRouter>
                <Fream />
            </BrowserRouter>
            </Provider>
        </AppContainer>, root)
    module.hot.accept();

} else {
    ReactDom.hydrate(
        <AppContainer>
            <Provider store={clientStore}>
            <BrowserRouter>
                <Fream />
            </BrowserRouter>
            </Provider>
        </AppContainer>, root)
}




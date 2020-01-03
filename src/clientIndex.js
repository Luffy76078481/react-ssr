import React from 'react'
import ReactDom from 'react-dom'
import Fream from './pages/fream'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import clientStore from './store/clientStore'
// import '../interceptors'

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




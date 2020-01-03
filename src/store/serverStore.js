import { createStore, applyMiddleware, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const serverStore = () => createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk)
  )
)

export default serverStore

import React from 'react'
import fs from 'fs'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Fream from '../pages/fream'

const serverRender = (req, store, context) => {
  const template = fs.readFileSync(process.cwd() + '/clientBuild/index.html', 'utf8')
  // const vendorCss = fs.readFileSync(process.cwd() + '/public/static/css/vendors.css', 'utf8')
  const content = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <Fream />
      </StaticRouter>
    </Provider>
  )
  const cssStr = context.css.length ? context.css.join('\n') : ''
  const state = JSON.stringify(store.getState())
  const initialState = `
      window.context = {
        INITIAL_STATE: ${state}
      }
  `
  console.log("我日你仙人")
  console.log(cssStr)
  return template.replace('<!--app-->', content)
    // .replace('server-render-css', cssStr + vendorCss)
    .replace('/*server-render-css*/', cssStr)
    .replace('/*initial-state*/', initialState)
}

export default serverRender

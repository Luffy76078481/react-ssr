import React, { Component } from 'react'

export default (DecoratedComponent, styles) => {
  return class NewComponent extends Component {
    UNSAFE_componentWillMount() {
      //@TODO 不在路由之内的组件，无法获得staticContext
      if (this.props.staticContext) {
        const css = styles._getCss().replace('/./img/', '/static/img/')
        this.props.staticContext.css.push(css)
      }
    }
    render() {
      return <DecoratedComponent {...this.props}/>
    }
  }
}

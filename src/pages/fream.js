import React from 'react'
import { renderRoutes } from 'react-router-config'
import { withRouter } from 'react-router-dom'
import routes from '../routes/routes'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import "../init/axiosInit"


class Container extends React.Component {
    render() {
        return <div id="fream" style={{ "height": "100%" }}>
            <Header />
            <div style={{ "height": "calc(100% - 2rem)", "overflow": "auto" }}>
                {renderRoutes(routes)}
            </div>
            <Footer />
        </div>
    }
}

export default withRouter(Container)
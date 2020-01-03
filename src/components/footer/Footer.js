import React from "react";
import { connect } from "react-redux";
import { withRouter, NavLink } from 'react-router-dom';
import "./Footer.scss";

class Footer extends React.Component {

    render() {
        return (
            <nav className="Footer">
                <NavLink exact to="/">Home</NavLink>
                <NavLink to="/weather">Weather</NavLink>
                <NavLink to="/test">Test</NavLink>
            </nav>
        );
    }

}


const mapStateToProps = (state, ownProps) => ({
    test: state.test
});

export default withRouter(connect(mapStateToProps)(Footer));

import React from "react";
import { connect } from "react-redux";
import { withRouter} from 'react-router-dom';
import "./Header.scss";

class Header extends React.Component {

    render() {
        return (
            <nav className="Header">
                我是头部
            </nav>
        );
    }

}


const mapStateToProps = (state, ownProps) => ({
    test: state.test
});

export default withRouter(connect(mapStateToProps)(Header));

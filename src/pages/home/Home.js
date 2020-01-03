import React from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import style from './Home.scss'
import withStyle from 'withStyle'
import { getWeatherAction } from "../../store/actions"

class Home extends React.Component {
    constructor(props) {
        super();
        this.state = {
            weather: props.weather
        }
    }


    componentDidMount() {
        if (!this.state.weather.city) {
            this.props.getWeatherAction({ city: "成都" })
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (!state.weather.city) {
            return {
                weather: props.weather
            }
        }
        return null;
    }

    render() {
        return (
            <div className="Home">
                <p className="title">{this.state.weather.city}</p>
                <ul className="weather-body">
                    {
                        this.state.weather.forecast && this.state.weather.forecast.map((data, index) => {
                            return (
                                <li key={index}>
                                    <p>{data.date}</p>
                                    <span>{data.high}</span>
                                    <span>{data.low}</span>
                                    <span>{data.fengxiang}</span>
                                    <span>{data.type}</span>
                                </li>
                            )
                        })
                    }
                </ul>
                <img src={require("./images/T1.jpg")} alt="test" />

            </div>
        );
    }

}


const mapStateToProps = (state, ownProps) => ({
    weather: state.weather
});

const mapDispatch = {
    getWeatherAction
}

const HomePage = withRouter(connect(mapStateToProps, mapDispatch)(withStyle(Home, style)));

HomePage.loadData = (store, id) => {
    return store.dispatch(getWeatherAction({ city: "成都" }));
}

export default HomePage

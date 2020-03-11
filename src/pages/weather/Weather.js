import React from "react";
import { connect } from "react-redux";
import { withRouter } from 'react-router-dom';
import style from "./Weather.scss";
import withStyle from 'withStyle'
import { getMusicList, getWeatherAction } from "../../store/actions"
class Weather extends React.Component {

    componentDidMount() {
        if (!this.props.weather.yesterday) {
            this.props.getWeatherAction({ city: "成都" })
        }
        if (this.props.musicList.length === 0) {
            this.props.getMusicList({ type: 1 });
        }

    }

    render() {
        return (
            <div className="Weather" >
                <div className="test-img"></div>
                <p>成都天气</p>
                {
                    this.runWeather()
                }
                <ul>
                    {
                        this.props.musicList.map((data, index) => {
                            return (
                                <li key={index}>
                                    <img src={data.pic_small} alt="头像" />
                                    <span>{data.artist_name}</span>
                                    <p className="test">{data.si_proxycompany}</p>
                                </li>
                            )
                        })
                    }
                </ul>
            </div>
        );
    }

    runWeather() {
        let weObj = this.props.weather.yesterday;
        let weDom = [];
        for (const key in weObj) {
            weDom.push(<p key={key}>{weObj[key]}</p>)
        }
        return weDom;
    }

}


const mapStateToProps = (state, ownProps) => ({
    weather: state.weather,
    musicList: state.musicList
});

const mapDispatch = {
    getMusicList,
    getWeatherAction
}

const WeatherPage = withRouter(connect(mapStateToProps, mapDispatch)(withStyle(Weather, style)));

WeatherPage.loadData = async (store, id) => {
    const WE = store.dispatch(getWeatherAction({ city: "北京" }))
    const ML = store.dispatch(getMusicList({ type: 1 }))
    return await Promise.all([WE, ML]);
}

export default WeatherPage

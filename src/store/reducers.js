
import { combineReducers } from 'redux'
import { deepCopy } from 'commonFunc'

const weather = (state = {}, action) => {
    if (action.type === "Weather" && action.data.status === 1000) {
        let newState = deepCopy(state);
        newState = action.data.data;
        return newState;
    }
    return state;
}

const musicList = (state = [], action) => {
    if (action.type === "MusicList" && action.data.code === 200) {
        
        let newState = deepCopy(state);
        newState = action.data.result;
        return newState;
    }
    return state;
}



const rootReducer = combineReducers({
    weather,
    musicList,
})

export default rootReducer
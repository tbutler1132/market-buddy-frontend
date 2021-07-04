import {combineReducers} from 'redux'
import { FETCH_USER, FETCH_USER_STOCKS } from '../constants/action_types'

const defaultState = {
    currentUser: false,
    userStockWatch: false
}

function userReducer(currentState = defaultState.currentUser, action){
    switch (action.type) {
        case FETCH_USER:
            return action.payload
        default:
            return currentState;
    }
}

function stockReducer(currentState = defaultState.userStockWatch, action){
    switch (action.type) {
        case FETCH_USER_STOCKS:
            const stateClone = {}
            for (let i = 0; i < action.payload.length; i++) {
                if (!(action.payload[i].symbol in stateClone)){
                    stateClone[action.payload[i].symbol] =  action.payload[i]
                }
            }
            return stateClone
    
        default:
            return currentState
    }
}


const rootReducer = combineReducers({
    user: userReducer,
    stocks: stockReducer
})

export default rootReducer
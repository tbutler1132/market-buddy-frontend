import {combineReducers} from 'redux'
import { FETCH_USER, FETCH_USER_STOCKS, ADD_USER_STOCK, UPDATE_USER_CASH, DELETE_USER_STOCK, UPDATE_USER_SHARES, ADD_STOCK_TO_LIST } from '../constants/action_types'

const defaultState = {
    currentUser: false,
    userStockWatch: false
}

function userReducer(currentState = defaultState.currentUser, action){
    switch (action.type) {
        case FETCH_USER:
            return action.payload
        case ADD_USER_STOCK:
            const clone = {...currentState}
            clone['portfolio'] = action.payload['portfolio']
            return clone
        case DELETE_USER_STOCK:
            const clone3 = {...currentState}
            clone3['portfolio'] = action.payload['portfolio']
            return clone3
        case UPDATE_USER_SHARES:
            const clone4 = {...currentState}
            clone4['portfolio'] = action.payload['portfolio']
            return clone4
        case UPDATE_USER_CASH:
            const clone2 = {...currentState}
            clone2['cash'] = action.payload
            return clone2
        case ADD_STOCK_TO_LIST:
            console.log(action.payload)
            const clone5 = {...currentState}
            clone5['lists'] = action.payload
            return clone5
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
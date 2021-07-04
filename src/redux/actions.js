import { FETCH_USER, FETCH_USER_STOCKS } from "../constants/action_types";

import { fetchUser } from '../api/index.js'

export const getUser = () => async (dispatch) => {
    try {
        const user = await fetchUser

        dispatch({ type: FETCH_USER, payload: user.data })
    } catch (error) {
        console.log(error)
    }
}

export const getStockInfo = (stockArr) => async (dispatch) => {
    dispatch({type: FETCH_USER_STOCKS, payload: stockArr})
}



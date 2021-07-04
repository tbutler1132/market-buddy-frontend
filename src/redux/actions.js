import { FETCH_USER, FETCH_USER_STOCKS } from "../constants/action_types";

import { fetchUser, updateStockHoldings, postStock } from '../api/index.js'

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

export const buyNewStock = (stockObj) => async (dispatch) => {
    console.log(stockObj)
    try {
        const stock = await postStock(stockObj)

        console.log(stock)
    } catch (error) {
        
    }
}

export const adjustStockHoldings = (id, updatedStock) => async (dispatch) => {
    try {
        const stock = await updateStockHoldings(id, updatedStock)

        console.log(stock)
    } catch (error) {
        
    }
}



import { FETCH_USER, FETCH_USER_STOCKS, ADD_USER_STOCK, UPDATE_USER_CASH, DELETE_USER_STOCK, UPDATE_USER_SHARES } from "../constants/action_types";
import axios from 'axios'

import { postStock } from '../api/index.js'

export const getUser = (userObj) => async (dispatch) => {
    try {

        dispatch({ type: FETCH_USER, payload: userObj.data })
    } catch (error) {
        console.log(error)
    }
}

export const getStockInfo = (stockArr) => async (dispatch) => {
    dispatch({type: FETCH_USER_STOCKS, payload: stockArr})
}

export const buyNewStock = (stockObj) => async (dispatch) => {
    try {
        const stock = await postStock(stockObj)
        dispatch({type: ADD_USER_STOCK, payload: stock.data})
    } catch (error) {
        
    }
}

export const sellAllShares = (userId, stockId) => async (dispatch) => {
    console.log(userId, stockId)
    try {
        const user = await axios.delete(`http://localhost:7000/users/${userId}/stocks/${stockId}`)
        dispatch({type: DELETE_USER_STOCK, payload: user.data})
    } catch (error) {
        
    }
}

export const adjustStockHoldings = (userId, stockId, updatedStock) => async (dispatch) => {
    console.log("Hit", updatedStock)
    try {
        const user = await axios.patch(`http://localhost:7000/users/${userId}/stocks/${stockId}`, {stock: updatedStock})
        console.log("User", user)
        dispatch({type: UPDATE_USER_SHARES, payload: user.data})
    } catch (error) {
        
    }
}

export const adjustUserCash = (newBuyingPower, userId) => async (dispatch) => {
    console.log("IM HIT", newBuyingPower)
    try {
        const user = await axios.patch(`http://localhost:7000/users/${userId}/cash`, {cash: newBuyingPower})
        console.log(user.data.cash)
        dispatch({type: UPDATE_USER_CASH, payload: user.data.cash})
    } catch (error) {
        console.log(error)
    }
}



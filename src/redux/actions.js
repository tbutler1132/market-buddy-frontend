import { FETCH_USER, FETCH_USER_STOCKS, ADD_USER_STOCK, UPDATE_USER_CASH, DELETE_USER_STOCK, UPDATE_USER_SHARES, ADD_STOCK_TO_LIST, ADD_NEW_LIST, 
DELETE_LIST, GET_NEWS
} from "../constants/action_types";
import axios from 'axios'
import { BASE_API } from "../App";

export const getUser = (userObj) => async (dispatch) => {
    try {

        dispatch({ type: FETCH_USER, payload: userObj })
    } catch (error) {
        console.log(error)
    }
}

export const getStockInfo = (stockArr) => async (dispatch) => {
    dispatch({type: FETCH_USER_STOCKS, payload: stockArr})
}

export const getNews = (newsArr) => async (dispatch) => {
    dispatch({type: GET_NEWS, payload: newsArr})
}

export const buyNewStock = (userId, stockObj) => async (dispatch) => {
    try {
        const stock = await axios.post(`${BASE_API}/users/${userId}/stocks`, {stockObj})
        dispatch({type: ADD_USER_STOCK, payload: stock.data})
    } catch (error) {
        
    }
}

export const sellAllShares = (userId, stockId) => async (dispatch) => {
    try {
        const user = await axios.delete(`${BASE_API}/users/${userId}/stocks/${stockId}`)
        dispatch({type: DELETE_USER_STOCK, payload: user.data})
    } catch (error) {
        
    }
}

export const adjustStockHoldings = (userId, stockId, updatedStock) => async (dispatch) => {
    try {
        const user = await axios.patch(`${BASE_API}/users/${userId}/stocks/${stockId}`, {stock: updatedStock})
        dispatch({type: UPDATE_USER_SHARES, payload: user.data})
    } catch (error) {
        
    }
}

export const adjustUserCash = (newBuyingPower, userId) => async (dispatch) => {
    try {
        const user = await axios.patch(`${BASE_API}/users/${userId}/cash`, {cash: newBuyingPower})
        dispatch({type: UPDATE_USER_CASH, payload: user.data.cash})
    } catch (error) {
        console.log(error)
    }
}

export const addStockToList = (user) => async (dispatch) => {
    try {
        // const user = await axios.patch(`${BASE_API}/users/${userId}/lists/${listId}`, stock)

        dispatch({type: ADD_STOCK_TO_LIST, payload: user.data.lists})
    } catch (error) {
        
    }
}

export const RemoveStockFromAList = (userId, listId, stock) => async (dispatch) => {
    try {
        const user = await axios.delete(`${BASE_API}/users/${userId}/lists/${listId}/${stock}`)
        dispatch({type: ADD_STOCK_TO_LIST, payload: user.data.lists})
    } catch (error) {
        
    }
}

export const addList = (userId, listObj) => async (dispatch) => {
    try {
        const user = await axios.post(`${BASE_API}/users/${userId}/lists`, listObj)

        dispatch({type: ADD_NEW_LIST, payload: user.data.lists})
    } catch (error) {
        
    }
}

export const deleteList = (userId, listId) => async (dispatch) => {
    try {
        const user = await axios.delete(`${BASE_API}/users/${userId}/lists/${listId}`)

        console.log(user)
        dispatch({type: DELETE_LIST, payload: user.data.lists})
    } catch (error) {
        
    }
}



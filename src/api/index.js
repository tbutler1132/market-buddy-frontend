import axios from 'axios'

const BASE_API = 'http://localhost:7000'

export const fetchUser = axios(`${BASE_API}/users/60dfbc675aa6dc13e52fcf4b`)

export const postStock = (stockObj) => axios.post(`${BASE_API}/users/60dfbc675aa6dc13e52fcf4b/stocks`, {stockObj})

export const updateStockHoldings = (userId, stockId, updatedStock) => axios.patch(`${BASE_API}/${userId}/stocks/${stockId}`, updatedStock)
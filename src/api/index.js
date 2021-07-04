import axios from 'axios'

const BASE_API = 'http://localhost:7000'

export const fetchUser = axios(`${BASE_API}/users/60dfbc675aa6dc13e52fcf4b`)

export const fetchPortfolio = axios(``)
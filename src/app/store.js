import { configureStore } from '@reduxjs/toolkit'
import { IEXCloudApi } from './services/IEXCloud'
import { marketBuddyApi } from './services/MarketBuddy'
import authReducer from './authSlice'

export const store = configureStore({
    reducer: {
        [IEXCloudApi.reducerPath]: IEXCloudApi.reducer,
        [marketBuddyApi.reducerPath]: marketBuddyApi.reducer,
        auth: authReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(IEXCloudApi.middleware),
})
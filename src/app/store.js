import { configureStore } from '@reduxjs/toolkit'
import { IEXCloudApi } from './services/IEXCloud'
import { marketBuddyApi } from './services/MarketBuddy'
import authReducer from './authSlice'
import stylesReducer from './stylesSlice'

export const store = configureStore({
    reducer: {
        [IEXCloudApi.reducerPath]: IEXCloudApi.reducer,
        [marketBuddyApi.reducerPath]: marketBuddyApi.reducer,
        auth: authReducer,
        styles: stylesReducer
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(IEXCloudApi.middleware).concat(marketBuddyApi.middleware),
})
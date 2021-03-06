import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_API = process.env.NODE_ENV === "development" ? 'http://localhost:7000/' : 'https://market-buddy-server.herokuapp.com/'

export const IEXCloudApi = createApi({
    reducerPath: 'IEXCloudApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${BASE_API}stocks` }),
    endpoints: (builder) => ({
        getDailyGainers: builder.query({
          query: (type) => `collection/tag/list?name=${type}`,
        }),
        getMostActiveStocks: builder.query({
          query: () => `collection/list`,
        }),
        getNews: builder.query({
          query: (type) => `news/${type}`,
        }),
        search: builder.query({
          query: (term) => `search/${term}`,
        }),
        getCompanyInfo: builder.query({
          query: (id) => `company/${id}`,
        }), 
        getLatestPrice: builder.query({
          query: (id) => `latestPrice/${id}`,
        }),
        getHistoricalData: builder.query({
          query: ({ id, range }) => `historical/${id}?range=${range}`,
        }),
        getFinancialData: builder.query({
          query: (id) => `financials/${id}`,
        }),
        getTags: builder.query({
          query: () => `tags`,
        }),
        getCollection: builder.query({
          query: ({ type, name }) => `collection/tag/${type}?name=${name}`,
        }),
        getAnalystRatings: builder.query({
          query: (id) => `ratings/${id}`,
        }),
        getStockPrices: builder.query({
          query: (symbols) => `stockprices?symbols=${symbols}`,
        }),
    })
})

export const {
    useGetDailyGainersQuery,
    useGetNewsQuery,
    useSearchQuery,
    useGetMostActiveStocksQuery,
    useGetCompanyInfoQuery,
    useGetLatestPriceQuery,
    useLazyGetHistoricalDataQuery,
    useGetFinancialDataQuery,
    useGetTagsQuery,
    useGetCollectionQuery,
    useGetAnalystRatingsQuery,
    useGetStockPricesQuery
} = IEXCloudApi
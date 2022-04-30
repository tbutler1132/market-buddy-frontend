import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const BASE_API = process.env.NODE_ENV === "development" ? 'http://localhost:7000/' : 'https://market-buddy-server.herokuapp.com/'

export const marketBuddyApi = createApi({
    reducerPath: 'marketBuddyApi',
    baseQuery: fetchBaseQuery({ baseUrl: BASE_API }),
    tagTypes: ['Cash', 'PortfolioValue', 'PortfolioData'],
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: `users/signin`,
                method: 'POST',
                body: credentials,
            }),   
        }),
        getLists: builder.query({
            query: (id) => `users/${id}?fields=lists`,
            providesTags: ['List']
        }),
        createList: builder.mutation({
            query: ( { id, list } ) => ({
                url: `users/${id}/lists`,
                method: 'POST',
                body: list,
            }),   
            invalidatesTags: ['List', 'User']
        }),
        demo: builder.mutation({
            query: () => ({
                url: `users/demo`,
                method: 'POST',
            }),   
        }),
        getUser: builder.query({
            query: (id) => `users/${id}?fields=cash%20username`,
            providesTags: ['Cash']
        }),
        getCurrentPortfolioValue: builder.query({
            query: (id) => `users/${id}/currentPortfolioValue`,
            providesTags: ['PortfolioValue']
        }),
        getHistoricalPortfolioValue: builder.query({
            query: (id) => `users/${id}/historicalPortfolioValue`,
        }),
        getPortfolioData: builder.query({
            query: (id) => `users/${id}/portfolioData`,
            providesTags: ['PortfolioData']
        }),
        updatePosition: builder.mutation({
            query: ( { id, positionId, updatedPosition } ) => ({
                url: `users/${id}/transaction/${positionId}`,
                method: 'PATCH',
                body: updatedPosition,
            }),   
            invalidatesTags: ['Cash', 'PortfolioValue', 'PortfolioData']
        }),
        createPosition: builder.mutation({
            query: ( { id, newPosition } ) => ({
                url: `users/${id}/transaction`,
                method: 'POST',
                body: newPosition,
            }),   
            invalidatesTags: ['Cash', 'PortfolioValue', 'PortfolioData']
        }),
        getPosition: builder.query({
            query: ({ id, symbol }) => `users/${id}/portfolio/${symbol}`,
        }),
    })
})

export const {
    useLoginMutation,
    useDemoMutation,
    useGetCurrentPortfolioValueQuery,
    useGetHistoricalPortfolioValueQuery,
    useGetPortfolioDataQuery,
    useCreateListMutation,
    useGetListsQuery,
    useGetUserQuery,
    useUpdatePositionMutation,
    useGetPositionQuery,
    useCreatePositionMutation
} = marketBuddyApi
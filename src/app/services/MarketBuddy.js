import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const marketBuddyApi = createApi({
    reducerPath: 'marketBuddyApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:7000/' }),
    endpoints: (builder) => ({
        login: builder.mutation({
            query: (credentials) => ({
                url: `users/signin`,
                method: 'POST',
                body: credentials,
            }),   
        }),
    })
})

export const {
    useLoginMutation
} = marketBuddyApi
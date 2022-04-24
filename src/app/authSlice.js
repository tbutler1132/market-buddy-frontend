import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'user',
    initialState: { user: null, token: null },
    reducers: {
        setCredentials(state, action){
          state.user = action.payload.result 
          state.token = action.payload.token
        },
    }
  })

export const { setCredentials } = authSlice.actions

export default authSlice.reducer
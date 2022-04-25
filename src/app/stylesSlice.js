import { createSlice } from '@reduxjs/toolkit'

export const stylesSlice = createSlice({
    name: 'styles',
    initialState: { mode: "light" },
    reducers: {
        toggleDarkMode(state, action){
          state.mode = action.payload
        },
    }
  })

export const { toggleDarkMode } = stylesSlice.actions

export default stylesSlice.reducer
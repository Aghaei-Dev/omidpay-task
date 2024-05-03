import { createSlice } from '@reduxjs/toolkit'

export interface MainState {
  query: string
  placeholder: string
}

const initialState: MainState = {
  query: '',
  placeholder: 'جستوجو در شهر تهران',
}

export const mainSlice = createSlice({
  name: 'main',
  initialState,
  reducers: {
    changeHandler: (state, { payload }) => {
      state.query = payload
    },
    changePlaceholderHandler: (state, { payload }) => {
      state.placeholder = payload
    },
  },
})

export const { changeHandler, changePlaceholderHandler } = mainSlice.actions

export default mainSlice.reducer

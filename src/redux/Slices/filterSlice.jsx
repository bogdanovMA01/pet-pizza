import { createSlice } from '@reduxjs/toolkit'

//TODO: Убрать в отдельный файл с константами
const initialState = {
  searchValue: '',
  category: 0,
  sortby: 0,
  page: 1,
}

export const filterSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setCategory(state, action) {
      state.category = action.payload
    },
    setSort(state, action) {
      state.sortby = action.payload
    },

    setSearchValue(state, action) {
      state.searchValue = action.payload
    },

    setPage(state, action) {
      state.page = action.payload
    },

    setFultersByUrl(state, action) {
      const { category, sortby, page } = action.payload

      const validCategory = Number.isNaN(+category)
        ? initialState.category
        : +category
      const validPage = Number.isNaN(+page) ? initialState.page : +page
      const validSortby = Number.isNaN(+sortby) ? initialState.sortby : +sortby

      state.category = validCategory
      state.page = validPage
      state.sortby = validSortby
    },
  },
})

// Action creators are generated for each case reducer function
export const {
  setCategory,
  setSort,
  setSearchValue,
  setFultersByUrl,
  setPage,
} = filterSlice.actions

//TODO: Избавиться от default-экспортов
export default filterSlice.reducer

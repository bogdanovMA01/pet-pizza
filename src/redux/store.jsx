import { configureStore } from '@reduxjs/toolkit'
//TODO: Сделать экспорт модулей через index-файл
//TODO: Избавиться от default-экспортов
//TODO: Необходимо соблюдать правила наименований - Slices не пишется с большой буквы
import filterSlice from './Slices/filterSlice'
//TODO: Необходимо соблюдать правила наименований - Slices не пишется с большой буквы
import cartSlice from './Slices/cartSlice'

export const store = configureStore({
  reducer: {
    filterSlice,
    cartSlice,
  },
})

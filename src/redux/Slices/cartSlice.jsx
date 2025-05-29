import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  totalPrice: 0,
  totalItems: 0,
  items: [],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizza(state, action) {
      const findPizza = state.items.findIndex(
        (obj) =>
          (obj.PizzaId === action.payload.PizzaId) &
          (obj.type === action.payload.type) &
          (obj.size === action.payload.size)
      )

      if (findPizza !== -1) {
        state.items[findPizza].count += 1
      } else {
        state.items.push(action.payload)
      }

      //TODO: Можно сократить return, если функция сразу возвращает значение

      state.totalPrice = state.items.reduce((price, obj) => {
        return price + obj.price * obj.count
      }, 0)
      //TODO: Можно сократить return, если функция сразу возвращает значение

      state.totalItems = state.items.reduce((qnt, obj) => {
        return qnt + obj.count
      }, 0)
    },
    removePizza(state, action) {
      state.items = state.items.filter(
        (obj) =>
          !(
            obj.PizzaId === action.payload.PizzaId &&
            obj.type === action.payload.type &&
            obj.size === action.payload.size
          )
      )
      state.totalPrice = state.items.reduce((price, obj) => {
        return price + obj.price * obj.count
      }, 0)

      state.totalItems = state.items.reduce((qnt, obj) => {
        return qnt + obj.count
      }, 0)
    },
    clearItems(state) {
      state.items = []

      //TODO: Зачем проходиться по путому массиву? Можно просто 0 задать
      //TODO: Можно сократить return, если функция сразу возвращает значение
      state.totalPrice = state.items.reduce((price, obj) => {
        return price + obj.price * obj.count
      }, 0)

      //TODO: Зачем проходиться по путому массиву? Можно просто 0 задать
      //TODO: Можно сократить return, если функция сразу возвращает значение
      state.totalItems = state.items.reduce((qnt, obj) => {
        return qnt + obj.count
      }, 0)
    },
    changePizzaCount(state, action) {
      const findPizza = state.items.findIndex(
        (obj) =>
          (obj.PizzaId === action.payload.PizzaId) &
          (obj.type === action.payload.type) &
          (obj.size === action.payload.size)
      )

      state.items[findPizza].count =
        state.items[findPizza].count + action.payload.change

      //TODO: Можно сократить return, если функция сразу возвращает значение
      state.totalPrice = state.items.reduce((price, obj) => {
        return price + obj.price * obj.count
      }, 0)

      //TODO: Можно сократить return, если функция сразу возвращает значение
      state.totalItems = state.items.reduce((qnt, obj) => {
        return qnt + obj.count
      }, 0)

      if (!state.items[findPizza].count) {
        state.items = state.items.filter(
          (obj) =>
            !(
              obj.PizzaId === action.payload.PizzaId &&
              obj.type === action.payload.type &&
              obj.size === action.payload.size
            )
        )
      }
    },
  },
})

export const { addPizza, removePizza, clearItems, changePizzaCount } =
  cartSlice.actions

//TODO: Избавиться от default-экспортов

export default cartSlice.reducer
